import auth from "solid-auth-client";
import FC from "solid-file-client";
import { v4 as uuidv4 } from "uuid";
import {
  getNewCommentsFile,
  giveOwnFolderPermissions,
  getFormattedRoute,
  getNewComment,
  getNewNotification,
  getNewSharedRoutesFileContent,
  getNotification,
  getGroupObjectFromPodRoute,
  getFormattedGroup,
} from "./parser";
const SolidAclUtils = require("solid-acl-utils");
// You could also use SolidAclUtils.Permissions.READ instead of following
// This is just more convenient
const { AclApi, Permissions, Agents } = SolidAclUtils;
const { READ, WRITE, APPEND } = Permissions;

/**
 * Functions in this file present an interface to add, get and manipulate routes
 * stored in a pod. They are intented to keep a consistent signature over time
 * so they act as a coherent module for other parts of the application to use.
 */

const appName = "viade";

const fc = new FC(auth);

export async function createFolderIfAbsent(path) {
  try {
    if (!(await fc.itemExists(path))) {
      await fc.createFolder(path);
    }
  } catch (err) {
    // Folder was not created
  }
}

/**
 * Returns a string containing the URI of the routes folder for the given user.
 * @param {string} userWebId - The full web ID of the user's pod.
 */
export function getGroupsFolder(userWebId) {
  return userWebId.split("/profile")[0] + "/" + appName + "/groups/";
}

/**
 * Returns a string containing the URI of the routes folder for the given user.
 * @param {string} userWebId - The full web ID of the user's pod.
 */
export function getRoutesFolder(userWebId) {
  return userWebId.split("/profile")[0] + "/" + appName + "/routes/";
}

/**
 * Returns a string containing the URI of the root folder of the application for the given user.
 * @param {string} userWebId - The full web ID of the user's pod.
 */
export function getRootFolder(userWebId) {
  return userWebId.split("/profile")[0] + "/" + appName + "/";
}

/**
 * Returns a string containing the URI of the comments folder for the given user.
 * @param {string} userWebId - The full web ID of the user's pod.
 */
export function getCommentsFolder(userWebId) {
  return userWebId.split("/profile")[0] + "/" + appName + "/comments/";
}

/**
 * Returns a string containing the URI of the inbox folder for the given user.
 * @param {string} userWebId - The full web ID of the user's pod.
 */
export function getInboxFolder(userWebId) {
  const inboxUrl = userWebId.split("profile")[0] + appName + "/inbox/";
  return inboxUrl;
}

/**
 * Returns a string containing the URI of the comments file of a given route for the given user.
 * @param {string} userWebId - The full web ID of the user's pod.
 * @param {string} fileName - The file name of the route, whose comments file's will be the same.
 */
export function getRouteCommentsFile(userWebId, fileName) {
  return getCommentsFolder(userWebId) + fileName;
}

/**
 * Returns a string containing the URI of the resources folder for the given user.
 * @param {string} userWebId - The full web ID of the user's pod.
 */
export function getResourcesFolder(userWebId) {
  return userWebId.split("/profile")[0] + "/" + appName + "/resources/";
}

/**
 * Returns a string containing the URI of the shared folder for the given user.
 * @param {string} userWebId - The full web ID of the user's pod.
 */
export function getSharedFolder(userWebId) {
  return userWebId.split("/profile")[0] + "/" + appName + "/shared/";
}

/**
 * Returns the contents of the given url in JSON form.
 * @param {string} url - The url to read
 */
async function readToJson(url) {
  try {
    return JSON.parse(await fc.readFile(url));
  } catch {
    return null;
  }
}

/**
 * Returns comments read from the uri of a comments file of a route.
 * @param {string} commentsUri - The uri of the file containing the comments.
 */
export async function readComments(commentsUri) {
  let contents = JSON.parse(await fc.readFile(commentsUri));
  return contents.comments;
}

/**
 * Returns the uris of medias from a JSON of medias.
 * @param {object} - The JSON containing the uris of the medias.
 */
export async function readMedia(medias) {
  let contentsUri = medias.map((media) => media["@id"]);
  let contents = [];
  for (let uri of contentsUri) {
    contents.push(uri);
  }
  return contents;
}

/**
 * Returns a route in JSON form from the given route in JSON-LD.
 * @param {object} route - The route from a POD.
 * @param {string} routeFilename - The name of the file of the route.
 */
async function getRouteObjectFromPodRoute(route, routeFilename) {
  try {
    return {
      id: routeFilename.split(".")[0],
      name: route.name,
      description: route.description,
      author: route.author,
      comments: await readComments(route.comments),
      positions: route.points.map((point) => {
        return [point.latitude, point.longitude];
      }),
      media: await readMedia(route.media),
      sharedWith: [],
    };
  } catch (err) {
    // Error
  }
}

/**
 * Returns the URI of the route from a notification object.
 * @param {object} - The notification in JSON form.
 */
function getRouteUriFromShareNotification(notification) {
  return notification.notification.object.uri;
}

/**
 * Gives global permissions to own folder
 * @param {string} folderURI - The uri of the folder
 */
export async function createOwnAcl(folderURI) {
  let aclUrl = folderURI + ".acl";
  if (!(await fc.itemExists(aclUrl))) {
    let content = giveOwnFolderPermissions(folderURI);
    await fc.createFile(aclUrl, content, "text/turtle");
  }
}

/**
 * Checks a permissions object to see if it actually contains permissions.
 * @param {object} permissions - The permissions object to check.
 */
function hasPermissions(permissions) {
  if (permissions.length === 0) {
    return false;
  }
  return true;
}

/**
 * Gives global permissions to write in a folder
 * @param {string} folderURI - The uri of the folder
 * @param {object} permissions - The permissions to set
 */
export async function createPublicPermissions(folderURI, permissions) {
  const aclApi = new AclApi(auth.fetch, { autoSave: true });
  let acl = {};
  try {
    acl = await aclApi.loadFromFileUrl(folderURI);

    let hasAlreadyThePermissions = acl.getPermissionsFor(Agents.PUBLIC);
    let alreadyPermissions = Array.from(
      hasAlreadyThePermissions.permissions
    ).map((permission) => {
      return permission;
    });

    if (!hasPermissions(alreadyPermissions)) {
      acl.addRule(permissions, Agents.PUBLIC);
    }
  } catch (err) {
    // Error
  }
}

/**
 * Creates the base folder structure for the application.
 *
 * > viade
 * --> routes
 * --> comments (WRITE ALL)
 * --> resources
 * --> inbox (WRITE ALL)
 * --> shared
 *
 * @param {string} userWebId - The full web ID of the user's pod.
 */
export async function createBaseStructure(userWebId) {
  let folders = [
    getRootFolder(userWebId),
    getRoutesFolder(userWebId),
    getCommentsFolder(userWebId),
    getInboxFolder(userWebId),
    getResourcesFolder(userWebId),
    getSharedFolder(userWebId),
    getGroupsFolder(userWebId),
  ];
  let i = 0;
  for (i; i < folders.length; i++) {
    await createFolderIfAbsent(folders[i]);
    await createOwnAcl(folders[parseInt(i)]);
  }
  await createPublicPermissions(getInboxFolder(userWebId), [READ, APPEND]);
  await createPublicPermissions(getCommentsFolder(userWebId), [READ, APPEND]);
}

/**
 * Returns a route from a given user's pod given the name of the route, or null if not found.
 * @param {string} filename - The filename of the route.
 * @param {string} userWebId - The full web ID of the user's pod.
 */
export async function getRouteFromPod(fileName, userWebId) {
  let url = getRoutesFolder(userWebId);
  let folder = await fc.readFolder(url);
  if (folder.files.some((f) => f.name === fileName)) {
    try {
      let podRoute = await readToJson(url + fileName);
      return getRouteObjectFromPodRoute(podRoute, fileName);
    } catch {
      return null;
    }
  }
  return null;
}

/**
 * Returns an array containing the routes in a given user's pod.
 * @param {string} userWebId - The full web ID of the user's pod.
 */
export async function getRoutesFromPod(userWebId) {
  let routesFolderUrl = getRoutesFolder(userWebId);
  let routes = [];

  // Own routes
  await createFolderIfAbsent(routesFolderUrl);
  let routesFolder = await fc.readFolder(routesFolderUrl);
  let routesFiles = routesFolder.files.filter((f) => /\.jsonld$/.test(f.name));
  let i = 0;
  for (i; i < routesFiles.length; i++) {
    let route = await getRouteFromPod(routesFiles[i].name, userWebId);
    if (route !== null) {
      routes.push(route);
    }
  }

  // Now read shared routes

  let sharedFolderUri = getSharedFolder(userWebId);
  await createFolderIfAbsent(sharedFolderUri);
  let sharedFiles = (await fc.readFolder(sharedFolderUri)).files;
  for (let i = 0; i < sharedFiles.length; i++) {
    if (!sharedFiles[parseInt(i)].url.includes(".acl")) {
      let file = await readToJson(sharedFiles[parseInt(i)].url);
      if (file !== null) {
        let routesUris = file.routes;
        try {
          // All routes uris of a file (of a friend)
          routesUris = routesUris.map((route) => route["@id"]);
          let routeObjects = routesUris.map(async (route) => {
            let parsed = JSON.parse(await fc.readFile(route));
            let fileName = route.split("/");
            fileName = fileName[fileName.length - 1];
            let object = await getRouteObjectFromPodRoute(parsed, fileName);
            return object;
          });
          await Promise.all(routeObjects).then((objects) =>
            objects.map((object) => routes.push(object))
          );
        } catch (err) {
          // Error
        }
      }
    }
  }
  return routes;
}

/**
 * Adds a notification to the given user's inbox marking the intention of sharing a route.
 * @param {string} userWebId - The full web ID of the owner's pod.
 * @param {string} routeUri - The uri of the route to share.
 * @param {string} targetUserWebId - The full web ID of the target user's pod.
 * @param {string} sharerName - The name of the user who shares the route.
 * @param {string} receiverName - The name of the user who receives the route.
 */
export async function shareRouteToPod(
  userWebId,
  routeUri,
  targetUserWebId,
  sharerName,
  receiverName
) {
  // give permission to targetUserWebId
  const aclApi = new AclApi(auth.fetch, { autoSave: true });
  let acl;
  try {
    console.log("antes de leer acl ruta", {userWebId, routeUri, targetUserWebId});
    acl = await aclApi.loadFromFileUrl(routeUri);
    console.log("acl ruta leído", {acl});
    await acl.addRule(READ, targetUserWebId);
    console.log("regla añadida al acl ruta", {acl});
  } catch (err) {
    console.log(err);
  }
  // Giving permissions to receiver to write comments
  let commentsFile = routeUri.split("/");
  commentsFile = commentsFile[commentsFile.length - 1];
  try {
    console.log("anter de acl comment", {userWebId, commentsFile, routeCommentsFile: getRouteCommentsFile(userWebId, commentsFile)});
    acl = await aclApi.loadFromFileUrl(
      getRouteCommentsFile(userWebId, commentsFile)
    );
    console.log("después de leer acl comment", {acl});
    await acl.addRule([READ, APPEND, WRITE], targetUserWebId);
    console.log("regla añadida comment", {acl});
  } catch (err) {
    console.log(err);
  }

  //Give permissions to resources
  let routeContent = await readToJson(routeUri);
  try {
    for (let media of routeContent.media) {
      let mediaUri = media["@id"];
      console.log("anter de acl media", {mediaUri});
      acl = await aclApi.loadFromFileUrl(mediaUri);
      console.log("después de acl media", {acl});
      await acl.addRule([READ], targetUserWebId);
      console.log("despues añadr permisos ", {acl});
    }
  } catch (err) {
    console.log(err)
  }
  let url = getInboxFolder(targetUserWebId);
  // Sending the notification
  let notificationUrl = url + uuidv4() + ".jsonld";
  await fc.postFile(
    notificationUrl,
    JSON.stringify(getNewNotification(routeUri, sharerName, receiverName)),
    "application/ld+json"
  );
}

/**
 * Adds a given URI to the list of routes shared with the given user.
 * @param {string} userWebId - The full web ID of the user's pod.
 * @param {string} uri - The uri of the route to add to the shared routes list.
 */
async function addRouteUriToShared(userWebId, uri) {
  let folder = getSharedFolder(userWebId);
  let sharedRoutesJSON;
  let userUri = uri.split("//")[1].split("/")[0].split(":")[0] + ".jsonld";
  let filePath = folder + userUri;

  if (!(await fc.itemExists(filePath))) {
    // This is the first time that a user shared a route with the current user
    sharedRoutesJSON = getNewSharedRoutesFileContent();
  } else {
    let sharedRoutes = await fc.readFile(filePath);
    sharedRoutesJSON = JSON.parse(sharedRoutes);
  }
  let duplicatited = sharedRoutesJSON.routes.filter(
    (route) => route["@id"] === uri
  );
  if (duplicatited.length === 0) {
    sharedRoutesJSON.routes.push({ "@id": uri });
    await fc.createFile(
      filePath,
      JSON.stringify(sharedRoutesJSON),
      "application/ld+json"
    );
  }
}

/**
 * Reads the target user's inbox, adding to shared routes the ones found in the notifications present there
 * and then deletes those notifications.
 * @param {string} userWebId - The full web ID of the user's pod.
 */
export async function checkInboxForSharedRoutes(userWebId) {
  let url = getInboxFolder(userWebId);
  let folder = await fc.readFolder(url);
  let i = 0;
  for (i; i < folder.files.length; i++) {
    if (!folder.files[parseInt(i)].url.includes(".acl")) {
      let notification = await fc.readFile(folder.files[parseInt(i)].url);
      try {
        let routeUri = getRouteUriFromShareNotification(
          JSON.parse(notification)
        );
        await addRouteUriToShared(userWebId, routeUri);
        await fc.deleteFile(folder.files[i].url);
      } catch (err) {
        // Error
      }
    }
  }
}

/**
 * Adds a comment to a route.
 * @param {string} userWebId - The commentator's URI
 * @param {string} commentedRouteUri - The commented route's URI
 * @param {string} commentText - The text of the comment
 */
export async function uploadComment(
  authorWebId,
  commentRouteFile,
  commentText
) {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let authorUsername = authorWebId.split("//")[1].split("/")[0].split(":")[0];
  let newComment = getNewComment(authorUsername, commentText, year, month, day);

  // Add comment to route's comments file
  let commentsFile = await fc.readFile(commentRouteFile);
  let commentsJson = JSON.parse(commentsFile);
  let comments = commentsJson.comments;
  comments.push(newComment);
  commentsJson.comments = comments;
  await fc.putFile(
    commentRouteFile,
    JSON.stringify(commentsJson),
    "application/ld+json"
  );
}

/**
 * Adds the given route to the given user's pod.
 * @param {object} routeObject - The route to upload.
 * @param {string} userWebId - The full web ID of the user's pod.
 */
export async function uploadRouteToPod(routeObject, userWebId) {
  let routeNameForFile = routeObject.name.replace(/ /g, "_");
  let newRouteName = routeNameForFile + uuidv4() + ".jsonld";

  // Writting media
  let resourcesFolder = getResourcesFolder(userWebId);
  let resourcesCreated = [];
  let resources = routeObject.images.concat(routeObject.videos);
  // Adding media
  for (let i = 0; i < resources.length; i++) {
    let uri = resourcesFolder + resources[i].name;
    await fc.createFile(
      uri,
      resources[parseInt(i)],
      resources[parseInt(i)].type
    );
    resourcesCreated.push({ uri: uri, name: resources[parseInt(i)].name });
  }
  let newRoute = getFormattedRoute(routeObject, userWebId, newRouteName);

  // Writting media references
  for (let i = 0; i < resourcesCreated.length; i++) {
    newRoute.media.push(resourcesCreated[parseInt(i)]);
  }
  let url = getRoutesFolder(userWebId);
  let routeUrl = url + newRouteName;
  let media = newRoute.media;
  media = resourcesCreated.map((res) => ({ "@id": res.uri, name: res.name }));
  newRoute.media = media;
  await fc.createFile(
    routeUrl,
    JSON.stringify(newRoute),
    "application/ld+json"
  );

  // Create comments file
  await createFolderIfAbsent(getCommentsFolder(userWebId));
  let routeCommentsFile = getRouteCommentsFile(userWebId, newRouteName);
  await fc.createFile(
    routeCommentsFile,
    JSON.stringify(getNewCommentsFile(routeUrl)),
    "application/ld+json"
  );

  if (routeObject.comments !== "") {
    await uploadComment(userWebId, routeCommentsFile, routeObject.comments);
  }
}

/**
 * Gets the URLs of comments from a given route.
 * @param {string} userWebId - The full web ID of the user's pod.
 * @param {string} fileName - The name of the file to get comments from.
 */
export async function getCommentsFromRoute(userWebId, fileName) {
  let commentsFileUrl = getRouteCommentsFile(userWebId, fileName);
  let commentsFile = await fc.readFile(commentsFileUrl);
  let commentsFileJSON = JSON.parse(commentsFile);
  return commentsFileJSON.comments;
}

/**
 * Removes all routes from a given user's pod.
 * @param {string} userWebId - The full web ID of the user's pod.
 */
export async function clearRoutesFromPod(userWebId) {
  let url = getRoutesFolder(userWebId);
  if (!(await fc.itemExists(url))) {
    return;
  }
  let folder = await fc.readFolder(url);
  let i = 0;
  for (i; i < folder.files.length; i++) {
    await fc.delete(folder.files[i].url);
  }
}

/**
 * Removes a route from given user's pod, given the name of the route.
 * @param {string} routeId - The id of the route to delete.
 * @param {string} userWebId - The full web ID of the user's pod.
 */
export async function clearRouteFromPod(routeId, userWebId) {
  let url = getRoutesFolder(userWebId);
  let folder = await fc.readFolder(url);
  let fileName = routeId + ".jsonld";
  if (folder.files.some((f) => f.name === fileName)) {
    let content = await readToJson(url + fileName);
    let media = await readMedia(content.media);
    await fc.delete(getRouteCommentsFile(userWebId, fileName));
    media.forEach(async (res) => await fc.delete(res));
    await fc.delete(url + fileName);
  }
}

/**
 * Returns an array with the notifications a user has.
 * @param {string} userWebId - The full web ID of the user's pod.
 */
export async function getNotifications(userWebId) {
  let inboxFolderUri = getInboxFolder(userWebId);
  if (!(await fc.itemExists(inboxFolderUri))) {
    return [];
  }
  let notifications = [];

  let inboxFolder = await fc.readFolder(inboxFolderUri);
  let notificationFiles = inboxFolder.files;

  let i = 0;
  for (i; i < notificationFiles.length; i++) {
    try {
      let notification = await getNotification(
        fc,
        notificationFiles[parseInt(i)]
      );
      notifications.push(notification);
    } catch (err) {
      // Error
    }
  }

  return notifications;
}

/**
 * Removes a route from the shared ones on another person's POD and revokes their over to it.
 * @param {string} authorWebId - The full web ID of the sharer's pod.
 * @param {string} routeId - The id of the route to unshare.
 * @param {string} userWebId - The full web ID of the user the route had been shared with.
 */
export async function unshareRoute(authorWebId, routeId, userWebId) {
  // Read share folder
  let shareFolderUri = getSharedFolder(userWebId);
  let sharedUserFiles = await fc.readFolder(shareFolderUri);
  sharedUserFiles = sharedUserFiles.files;
  sharedUserFiles = sharedUserFiles.filter((userFile) =>
    authorWebId.includes(userFile.name.split(".jsonld")[0])
  );
  let sharedUserFileContent = JSON.parse(
    await fc.readFile(sharedUserFiles[0].url)
  );
  let routesToKeep = sharedUserFileContent.routes.filter(
    (route) => !route["@id"].includes(routeId)
  );
  sharedUserFileContent.routes = routesToKeep;

  await fc.createFile(
    sharedUserFiles[0].url,
    JSON.stringify(sharedUserFileContent),
    "application/ld+json"
  );
}

/**
 *
 * @param {string} userWebId
 */
export async function getGroups(userWebId) {
  let groupsFolder = await fc.readFolder(getGroupsFolder(userWebId));
  let groupsFiles = groupsFolder.files.filter((f) => /\.jsonld$/.test(f.name));
  let i = 0;
  let groups = [];
  for (i; i < groupsFiles.length; i++) {
    let group = await getGroupFromPod(groupsFiles[i].name, userWebId);
    if (group !== null) {
      groups.push(group);
    }
  }
  return groups;
}

export async function getGroupFromPod(fileName, userWebId) {
  let url = getGroupsFolder(userWebId);
  let folder = await fc.readFolder(url);
  if (folder.files.some((f) => f.name === fileName)) {
    try {
      let podGroup = await readToJson(url + fileName);
      return getGroupObjectFromPodRoute(podGroup);
    } catch {
      return null;
    }
  }
  return null;
}

/**
 *
 * @param {string} userWebId
 * @param {string} groupName
 * @param {Array<string>} friends
 */
export async function createGroup(userWebId, groupName, friends) {
  let content = getFormattedGroup(groupName, friends);
  let groupFolder = getGroupsFolder(userWebId);
  groupName = groupName.replace(/ /g, "_");
  let groupUrl = groupFolder + groupName + uuidv4() + ".jsonld";
  await fc.createFile(groupUrl, JSON.stringify(content), "application/ld+json");
}


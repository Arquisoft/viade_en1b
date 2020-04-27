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
} from "./parser";
const SolidAclUtils = require("solid-acl-utils");
// You could also use SolidAclUtils.Permissions.READ instead of following
// This is just more convenient
const {
  AclApi,
  AclDoc,
  AclParser,
  AclRule,
  Permissions,
  Agents,
} = SolidAclUtils;
const { READ, WRITE, APPEND, CONTROL } = Permissions;
//import SolidAclUtils from "solid-acl-utils";

/**
 * Functions in this file present an interface to add, get and manipulate routes
 * stored in a pod. They are intented to keep a consistent signature over time
 * so they act as a coherent module for other parts of the application to use.
 */

const appName = "viade";
const sharedRoutesFilename = "sharedRoutes.jsonld";

const fc = new FC(auth);

export async function createFolderIfAbsent(path) {
  try {
    if (!(await fc.itemExists(path))) {
      await fc.createFolder(path);
    }
  } catch {
    console.log("this is an error");
  }
}

/**
 * Returns a string containing the URI of the routes folder for the given user.
 */
export function getRoutesFolder(userWebId) {
  return userWebId.split("/profile")[0] + "/" + appName + "/routes/";
}
export function getRootFolder(userWebId) {
  return userWebId.split("/profile")[0] + "/" + appName + "/";
}
/**
 * Returns a string containing the URI of the comments folder for the given user.
 */
export function getCommentsFolder(userWebId) {
  return userWebId.split("/profile")[0] + "/" + appName + "/comments/";
}

/**
 * Returns a string containing the URI of the folder of comments created by the given user.
 */
export function getMyCommentsFolder(userWebId) {
  return getCommentsFolder(userWebId) + "myComments/";
}

export function getRouteCommentsFolder(userWebId) {
  return getCommentsFolder(userWebId) + "routeComments/";
}

/**
 * Returns a string containing the URI of the inbox folder for the given user.
 */
// create ACL for the folder
export function getInboxFolder(userWebId) {
  const inboxUrl = userWebId.split("profile")[0] + appName + "/inbox/";
  return inboxUrl;
}

/**
 * Returns a string containing the URI of the comments file of a given route for the given user.
 */
export function getRouteCommentsFile(userWebId, fileName) {
  return getCommentsFolder(userWebId) + fileName;
}

/**
 * Returns a string containing the URI of the resources folder for the given user.
 */
export function getResourcesFolder(userWebId) {
  return userWebId.split("/profile")[0] + "/" + appName + "/resources/";
}

/**
 * Returns a string containing the URI of the shared folder for the given user.
 */
export function getSharedFolder(userWebId) {
  return userWebId.split("/profile")[0] + "/" + appName + "/shared/";
}

/**
 * Returns a string containing the URI of the folder which contains with whom routes have been shared for the
 * given user.
 */
export function getRoutesSharedWithFolder(userWebId) {
  return getSharedFolder(userWebId) + "routesSharedWith/";
}

/**
 * Returns a string containing the URI of the file which contains with whom a route has been shared for the
 * given user.
 */
function getRoutesSharedWithFile(userWebId, routeFilename) {
  return getRoutesSharedWithFolder(userWebId) + routeFilename;
}
/**
 * Returns a string containing the filename of the given route.
 */
/* function getRouteCommentsFileFromRouteUri(routeUri) {
  let split = routeUri.split("routes/");
  let folder = split[0] + "/comments/routeComments/";
  let fileName = split[1];
  return folder + fileName;
} */

/**
 * Returns a string containing the URI of the file which contains with whom a route has been shared for the
 * given user, given the route URI.
 */
function getRoutesSharedWithFileFromRouteUri(routeUri) {
  let split = routeUri.split("routes/");
  let folder = split[0] + "shared/routesSharedWith/";
  let fileName = split[1];
  return folder + fileName;
}

/**
 * Returns the contents of the given url in JSON form.
 */
async function readToJson(url) {
  return JSON.parse(await fc.readFile(url));
}

/**
 * Returns an array containing the users the given route is shared with.
 */
export async function getUsersRouteSharedWith(userWebId, routeFilename) {
  let sharedFileUrl = getRoutesSharedWithFile(userWebId, routeFilename);
  let sharedFileContentJSON = await readToJson(sharedFileUrl);
  return sharedFileContentJSON.alreadyShared;
}

/**
 * Returns a route in JSON form from the given route in JSON-LD.
 */
async function getRouteObjectFromPodRoute(userWebId, route, routeFilename) {
  return {
    id: routeFilename.split(".")[0],
    name: route.name,
    description: route.description,
    author: route.author,
    positions: route.points.map((point) => {
      return [point.latitude, point.longitude];
    }),
    sharedWith: [] /*await getUsersRouteSharedWith(userWebId, routeFilename)*/,
  };
}

/**
 * Returns the URI of the route from a notification object.
 */
function getRouteUriFromShareNotification(notification) {
  return notification.notification.object.uri;
}

/**
 * Returns an array with the URIs of routes shared with the user.
 */
export async function getSharedRoutesUris(userWebId) {
  let folderUri = getSharedFolder(userWebId);
  let fileUri = folderUri + sharedRoutesFilename;
  if (!(await fc.itemExists(fileUri))) {
    return [];
  }
  let fileContent = await fc.readFile(fileUri);
  let fileContentJSON = JSON.parse(fileContent);
  return fileContentJSON.routes;
}

// Crear carpeta viade
//--> routes
//--> comments
//----> my comments
//----> route comments
//--> resources
//--> inbox (WRITE ALL)
//--> shared
export async function createBaseStructure(userWebId) {
  let folders = [
    getRootFolder(userWebId),
    getRoutesFolder(userWebId),
    getCommentsFolder(userWebId),
    getInboxFolder(userWebId),
    getResourcesFolder(userWebId),
    getSharedFolder(userWebId),
  ];
  console.log(folders);
  let i = 0;
  for (i; i < folders.length; i++) {
    await createFolderIfAbsent(folders[i]);
    await createOwnAcl(folders[i]);
  }
  await createPublicPermissions(getInboxFolder(userWebId), [READ, APPEND]);
  await createPublicPermissions(getCommentsFolder(userWebId), [READ, APPEND]);
}
/**
 * Gives global permissions to write in a folder
 * @param {uri of the folder} folderURI
 * @param {uri of the user} userWebId
 */
export async function createPublicPermissions(folderURI, permissions) {
  const aclApi = new AclApi(auth.fetch, { autoSave: true });
  let acl = {};
  try {
    acl = await aclApi.loadFromFileUrl(folderURI);

    let hasAlreadyThePermissions = acl.getPermissionsFor(Agents.PUBLIC);
    let alreadyPermissions = Array.from(
      hasAlreadyThePermissions.permissions
    ).map((permission) => {});

    if (!hasPermissions(alreadyPermissions))
      acl.addRule(permissions, Agents.PUBLIC);
  } catch {}
}

function hasPermissions(permissions) {
  if (permissions.length == 0) return false;
  return true;
}

/**
 * Gives global permissions to own folder
 * @param {uri of the folder} folderURI
 * @param {uri of the user} userWebId
 */
export async function createOwnAcl(folderURI) {
  let aclUrl = folderURI + ".acl";
  if (!(await fc.itemExists(aclUrl))) {
    let content = giveOwnFolderPermissions(folderURI);
    await fc.createFile(aclUrl, content, "text/turtle");
  }
}

/**
 * Returns a route from a given user's pod given the name of the route, or null if not found.
 */
export async function getRouteFromPod(fileName, userWebId) {
  let url = getRoutesFolder(userWebId);
  let folder = await fc.readFolder(url);
  if (folder.files.some((f) => f.name === fileName)) {
    let podRoute = await readToJson(url + fileName);
    return getRouteObjectFromPodRoute(userWebId, podRoute, fileName);
  }
  return null;
}

/**
 * Returns an array containing the routes in a given user's pod.
 */
export async function getRoutesFromPod(userWebId) {
  let routesFolderUrl = getRoutesFolder(userWebId);
  if (!(await fc.itemExists(routesFolderUrl))) {
    return [];
  }
  let routes = [];

  // Own routes
  let routesFolder = await fc.readFolder(routesFolderUrl);
  let routesFiles = routesFolder.files.filter((f) => !/\.acl$/.test(f.name));
  let i = 0;
  for (i; i < routesFiles.length; i++) {
    let route = await getRouteFromPod(routesFiles[i].name, userWebId);
    routes.push(route);
  }

  // Now read shared routes

  let sharedFolderUri = getSharedFolder(userWebId);
  await createFolderIfAbsent(sharedFolderUri);
  let sharedFiles = (await fc.readFolder(sharedFolderUri)).files;
  console.log({ sharedFolderUri, sharedFiles });
  for (let i = 0; i < sharedFiles.length; i++) {
    let file = JSON.parse(await fc.readFile(sharedFiles[i].url));
    let routesUris = file.routes;
    // All routes uris of a file (of a friend)
    routesUris = routesUris.map((route) => route["@id"]);
    let routeObjects = routesUris.map(async (route) => {
      let parsed = JSON.parse(await fc.readFile(route));
      let fileName = route.split("/");
      fileName = fileName[fileName.length - 1];
      let object = await getRouteObjectFromPodRoute(
        userWebId,
        parsed,
        fileName
      );
      return object;
    });
    Promise.all(routeObjects).then((objects) =>
      objects.map((object) => routes.push(object))
    );
  }
  return routes;
}

/**
 * Adds a notification to the given user's inbox marking the intention of sharing a route.
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
  let acl = await aclApi.loadFromFileUrl(routeUri);
  await acl.addRule(READ, targetUserWebId);

  let url = getInboxFolder(targetUserWebId);

  // Sending the notification
  let notificationUrl = url + uuidv4() + ".jsonld";
  await fc.postFile(
    notificationUrl,
    JSON.stringify(getNewNotification(routeUri, sharerName, receiverName)),
    "application/ld+json"
  );

  // Giving permissions to receiver to write comments
  let commentsFile = routeUri.split("/");
  commentsFile = commentsFile[commentsFile.length - 1];
  acl = await aclApi.loadFromFileUrl(
    getRouteCommentsFile(userWebId, commentsFile)
  );
  await acl.addRule([READ, APPEND], targetUserWebId);

  // Add target user to route's list of shared with.
  /*
  let sharedWithUri = getRoutesSharedWithFileFromRouteUri(routeUri);
  let sharedWithContentJSON = await readToJson(sharedWithUri);
  sharedWithContentJSON.alreadyShared.push(targetUserWebId);
  await fc.createFile(
    sharedWithUri,
    JSON.stringify(sharedWithContentJSON),
    "application/ld+json"
  );
  */
}

/**
 * Adds a given URI to the list of routes shared with the given user.
 */
async function addRouteUriToShared(userWebId, uri) {
  let folder = getSharedFolder(userWebId);
  let sharedRoutesJSON;
  let userUri = uri.split("//")[1].split("/")[0] + ".jsonld";
  let filePath = folder + userUri;

  console.log(
    { folder, sharedRoutesJSON, userUri, filePath },
    "addRouteUriShared"
  );
  if (!(await fc.itemExists(filePath))) {
    // This is the first time that a user shared a route with the current user
    sharedRoutesJSON = getNewSharedRoutesFileContent();
  } else {
    let sharedRoutes = await fc.readFile(filePath);
    sharedRoutesJSON = JSON.parse(sharedRoutes);
  }
  console.log(filePath);
  let duplicatited = sharedRoutesJSON.routes.filter(
    (route) => route["@id"] == uri
  );
  if (duplicatited.length == 0) {
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
 */
export async function checkInboxForSharedRoutes(userWebId) {
  let url = getInboxFolder(userWebId);
  let folder = await fc.readFolder(url);
  let i = 0;
  for (i; i < folder.files.length; i++) {
    let notification = await fc.readFile(folder.files[i].url);
    let routeUri = getRouteUriFromShareNotification(JSON.parse(notification));
    await addRouteUriToShared(userWebId, routeUri);
    await fc.deleteFile(folder.files[i].url);
  }
}

/**
 * Adds the given route to the given user's pod.
 */
export async function uploadRouteToPod(routeObject, userWebId) {
  //storeRouteToPOD(routeObject, userWebId);
  let routeNameForFile = routeObject.name.replace(/ /g, "_");
  let newRouteName = routeNameForFile + uuidv4() + ".jsonld";
  let newRoute = getFormattedRoute(routeObject, userWebId, newRouteName);
  let url = getRoutesFolder(userWebId);
  let routeUrl = url + newRouteName;

  await fc.createFile(
    routeUrl,
    JSON.stringify(newRoute),
    "application/ld+json"
  );

  // Create comments file
  let routeCommentsFile = getRouteCommentsFile(userWebId, newRouteName);
  await fc.createFile(
    routeCommentsFile,
    JSON.stringify(getNewCommentsFile(routeUrl)),
    "application/ld+json"
  );

  // Set permissions for comments file

  // Our sharedwith field
  let routesSharedWithFolder = getRoutesSharedWithFolder(userWebId);
  await createFolderIfAbsent(routesSharedWithFolder);
  let routeSharedWithFile = { alreadyShared: [] };
  let newSharedWithFileUrl = routesSharedWithFolder + newRouteName;
  await fc.createFile(
    newSharedWithFileUrl,
    JSON.stringify(routeSharedWithFile),
    "application/ld+json"
  );

  // Needed for deleting
  //await createAclReadWrite(routeUrl, userWebId, userWebId);
}

/**
 * Adds a comment to a route.
 *
 * @param {string} userWebId
 *      The commentator's URI
 *
 * @param {string} commentedRouteUri
 *      The commented route's URI
 *
 * @param {string} commentText
 *      The text of the comment
 */
export async function uploadComment(userWebId, commentedRouteUri, commentText) {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let myCommentsUrl = getMyCommentsFolder(userWebId);
  await createFolderIfAbsent(myCommentsUrl);
  let newCommentUrl = myCommentsUrl + uuidv4() + ".jsonld";

  // Create local comment file
  let newComment = getNewComment(commentText, year, month, day);
  await fc.createFile(
    newCommentUrl,
    JSON.stringify(newComment),
    "application/ld+json"
  );

  // Add comment's url to route's comments file
  let route = await fc.readFile(commentedRouteUri);
  let routeJSON = JSON.parse(route);
  let commentsFileContent = await fc.readFile(routeJSON.comments);
  let commentsFileContentJSON = JSON.parse(commentsFileContent);
  commentsFileContentJSON.comments.push(newCommentUrl);
  await fc.createFile(
    routeJSON.comments,
    JSON.stringify(commentsFileContentJSON),
    "application/ld+json"
  );
}

/**
 * Gets the URLs of comments from a given route.
 */
export async function getCommentsFromRoute(userWebId, fileName) {
  let commentsFileRoute = getRouteCommentsFile(userWebId, fileName);
  let commentsFile = await fc.readFile(commentsFileRoute);
  let commentsFileJSON = JSON.parse(commentsFile);
  return commentsFileJSON.comments;
}

/**
 * Removes all routes from a given user's pod.
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
 */
export async function clearRouteFromPod(routeId, userWebId) {
  let url = getRoutesFolder(userWebId);
  let folder = await fc.readFolder(url);
  let fileName = routeId + ".jsonld";
  if (folder.files.some((f) => f.name === fileName)) {
    await fc.delete(url + fileName);
  }
}

export async function getNotifications(userWebId) {
  let inboxFolderUri = getInboxFolder(userWebId);
  if (!(await fc.itemExists(inboxFolderUri))) {
    return [];
  }
  let notifications = [];

  // Own routes
  let inboxFolder = await fc.readFolder(inboxFolderUri);
  //let notifications = inboxFolder.files.filter((f) => !/\.acl$/.test(f.name));
  let notificationFiles = inboxFolder.files;

  let i = 0;
  for (i; i < notificationFiles.length; i++) {
    let notification = await getNotification(fc, notificationFiles[i]);
    notifications.push(notification);
  }

  // Routes shared with user
  /*   let sharedRoutes = await getSharedRoutesUris(userWebId);
  i = 0;
  for (i; i < sharedRoutes.length; i++) {
    routes.push(sharedRoutes[i]);
  } */

  return notifications;
}

export async function unshareRoute(authorWebId, routeId, userWebId) {
  // Read share folder
  let shareFolderUri = getSharedFolder(userWebId);
  let sharedUserFiles = await fc.readFolder(shareFolderUri);
  sharedUserFiles = sharedUserFiles.files;
  sharedUserFiles = sharedUserFiles.filter((userFile) =>
    userFile.name.includes(authorWebId)
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

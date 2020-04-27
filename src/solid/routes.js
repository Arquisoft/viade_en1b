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
  if (!(await fc.itemExists(path))) {
    await fc.createFolder(path);
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
  return getCommentsFolder(userWebId) + "routeComments/" + fileName;
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
    sharedWith: await getUsersRouteSharedWith(userWebId, routeFilename),
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
    getMyCommentsFolder(userWebId),
    getRouteCommentsFolder(userWebId),
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
  await createAclPublicWrite(getInboxFolder(userWebId), userWebId);
}
/**
 * Gives global permissions to write in a folder
 * @param {uri of the folder} folderURI
 * @param {uri of the user} userWebId
 */
export async function createAclPublicWrite(folderURI, userWebId) {
  const aclApi = new AclApi(auth.fetch, { autoSave: true });
  const acl = await aclApi.loadFromFileUrl(folderURI);
  await acl.addRule(APPEND, Agents.PUBLIC);
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

  // Routes shared with user
  /*   let sharedRoutes = await getSharedRoutesUris(userWebId);
  i = 0;
  for (i; i < sharedRoutes.length; i++) {
    routes.push(sharedRoutes[i]);
  } */

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
  const acl = await aclApi.loadFromFileUrl(routeUri);
  await acl.addRule(READ, targetUserWebId);

  let url = getInboxFolder(targetUserWebId);

  await createFolderIfAbsent(url);

  let notificationUrl = url + uuidv4() + ".jsonld";
  await fc.copyFile(
    notificationUrl,
    JSON.stringify(getNewNotification(routeUri, sharerName, receiverName)),
    "text/turtle"
  );

  // Read the route
  //  await createAclRead(routeUri, userWebId, targetUserWebId);

  // Comment it
  //let routeCommentsFileUri = getRouteCommentsFileFromRouteUri(routeUri);
  //await createAclReadWrite(routeCommentsFileUri, userWebId, targetUserWebId);

  // Add target user to route's list of shared with.
  let sharedWithUri = getRoutesSharedWithFileFromRouteUri(routeUri);
  let sharedWithContentJSON = await readToJson(sharedWithUri);
  sharedWithContentJSON.alreadyShared.push(targetUserWebId);
  await fc.createFile(
    sharedWithUri,
    JSON.stringify(sharedWithContentJSON),
    "application/ld+json"
  );
}

/**
 * Adds a given URI to the list of routes shared with the given user.
 */
async function addRouteUriToShared(userWebId, uri) {
  let folder = getSharedFolder(userWebId);
  await createFolderIfAbsent(folder);
  let filePath = folder + sharedRoutesFilename;
  let sharedRoutesJSON;
  if (!(await fc.itemExists(filePath))) {
    sharedRoutesJSON = getNewSharedRoutesFileContent();
  } else {
    let sharedRoutes = await fc.readFile(filePath);
    sharedRoutesJSON = JSON.parse(sharedRoutes);
  }
  // Possibility: Add a check to not duplicate routes
  //sharedRoutesJSON.routes.push({"@id": uri}); // Old version
  sharedRoutesJSON.routes.push(uri);
  await fc.createFile(
    filePath,
    JSON.stringify(sharedRoutesJSON),
    "application/ld+json"
  );
}

/**
 * Reads the target user's inbox, adding to shared routes the ones found in the notifications present there
 * and then deletes those notifications.
 */
export async function checkInboxForSharedRoutes(userWebId) {
  let url = getInboxFolder(userWebId);
  await createFolderIfAbsent(url);
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
  await createFolderIfAbsent(url);
  await fc.createFile(
    routeUrl,
    JSON.stringify(newRoute),
    "application/ld+json"
  );

  await createFolderIfAbsent(getCommentsFolder(userWebId));
  let routeCommentsFile = getRouteCommentsFile(userWebId, newRouteName);
  await fc.createFile(
    routeCommentsFile,
    JSON.stringify(getNewCommentsFile(routeUrl)),
    "application/ld+json"
  );

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

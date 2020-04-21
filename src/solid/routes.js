import auth from "solid-auth-client";
import FC from "solid-file-client";
import { v4 as uuidv4 } from "uuid";
import SolidAclUtils from "solid-acl-utils";

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

/**
 * Returns a string containing the URI of the inbox folder for the given user.
 */
export function getInboxFolder(userWebId) {
  const inboxUrl = userWebId.split("/profile")[0] + "/" + appName + "/inbox/";
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
function getRouteCommentsFileFromRouteUri(routeUri) {
  let split = routeUri.split("routes/");
  let folder = split[0] + "/comments/routeComments/";
  let fileName = split[1];
  return folder + fileName;
}

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
async function getUsersRouteSharedWith(userWebId, routeFilename) {
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
    positions: route.waypoints,
    sharedWith: [] /*await getUsersRouteSharedWith(userWebId, routeFilename)*/,
  };
}

/**
 * Returns a route in JSON-LD form as a string from the given route object, the webId of the pod's user and
 * the file name of the route for the pod.
 */
export function getFormattedRoute(routeObject, userWebId, fileName) {
  let output = {
    "@context": {
      "@version": "1.1",
      comments: {
        "@id": "viade:comments",
        "@type": "@id",
      },
      description: {
        "@id": "schema:description",
        "@type": "xsd:string",
      },
      media: {
        "@container": "@list",
        "@id": "viade:media",
      },
      name: {
        "@id": "schema:name",
        "@type": "xsd:string",
      },
      points: {
        "@container": "@list",
        "@id": "viade:points",
      },
      latitude: {
        "@id": "schema:latitude",
        "@type": "xsd:double",
      },
      longitude: {
        "@id": "schema:longitude",
        "@type": "xsd:double",
      },
      elevation: {
        "@id": "schema:elevation",
        "@type": "xsd:double",
      },
      author: {
        "@id": "schema:author",
        "@type": "@id",
      },
      rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
      rdfs: "http://www.w3.org/2000/01/rdf-schema#",
      schema: "http://schema.org/",
      viade: "http://arquisoft.github.io/viadeSpec/",
      xsd: "http://www.w3.org/2001/XMLSchema#",
    },
    name: routeObject.name,
    author: routeObject.author,
    description: routeObject.description,
    comments: getRouteCommentsFile(userWebId, fileName),
    media: routeObject.images + routeObject.videos,
    waypoints: routeObject.positions,
    points: routeObject.positions,
  };
  return output;
}

/**
 * Returns the URI of the route from a notification object.
 */
function getRouteUriFromShareNotification(notification) {
  return notification.notification.object.uri;
}

/**
 * Returns a new shared routes file in JSON form.
 */
function getNewSharedRoutesFileContent() {
  return {
    "@context": {
      "@version": 1.1,
      routes: {
        "@container": "@list",
        "@id": "viade:routes",
      },
      viade: "http://arquisoft.github.io/viadeSpec/",
    },
    routes: [],
  };
}

/**
 * Returns a new notification in JSON form.
 */
function getNewNotification(routeUri, sharerName, receiverName) {
  return {
    "@context": {
      "@version": 1.1,
      as: "https://www.w3.org/ns/activitystreams#",
      viade: "http://arquisoft.github.io/viadeSpec/",
      notification: {
        "@id": "as:Offer",
      },
    },
    notification: {
      actor: {
        type: "Person",
        name: sharerName,
      },
      object: {
        type: "viade:route",
        uri: routeUri,
      },
      target: {
        type: "Person",
        name: receiverName,
      },
    },
  };
}

/**
 * Returns a new comments file for a route in JSON form.
 */
export function getNewCommentsFile(routeUrl) {
  return {
    "@context": {
      "@version": 1.1,
      viade: "http://arquisoft.github.io/viadeSpec/",
      schema: "http://schema.org/",
      comments: {
        "@container": "@list",
        "@id": "viade:comments",
      },
    },
    routeUri: routeUrl,
    comments: [],
  };
}

/**
 * Returns a new comment file in JSON form.
 */
function getNewComment(commentText, year, month, day) {
  return {
    "@context": {
      "@version": 1.1,
      viade: "http://arquisoft.github.io/viadeSpec/",
      schema: "http://schema.org/",
      dateCreated: {
        "@id": "viade:dateCreated",
        "@type": "xsd:date",
      },
      text: {
        "@id": "viade:text",
        "@type": "xsd:string",
      },
    },
    text: commentText,
    dateCreated: year + "-" + month + "-" + day,
  };
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
/* 

export async function createBaseStructure(userWebId) {
  let folders = [
    getRoutesFolder(userWebId),
    getCommentsFolder(userWebId),
    getMyCommentsFolder(userWebId),
    getInboxFolder(userWebId),
    getResourcesFolder(userWebId),
    getSharedFolder(userWebId),
    getRoutesSharedWithFolder(userWebId),
  ];
  let i = 0;
  for (i; i < folders.length; i++) {
    await createFolderIfAbsent(folders[i]);
  }
  if (!(await fc.itemExists(getInboxFolder(userWebId) + ".acl"))) {
    await createAclGlobalWrite(getInboxFolder(userWebId), userWebId);
  }
} */

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
  console.log(userWebId, routeUri, targetUserWebId, sharerName, receiverName);
  let url = getInboxFolder(targetUserWebId);
  if (!(await fc.itemExists(url))) {
    //return null; // Possibility: notify the user the target user does not have inbox folder
    await createFolderIfAbsent(url);
  }
  let notificationUrl = url + uuidv4() + ".jsonld";
  await fc.createFile(
    notificationUrl,
    JSON.stringify(getNewNotification(routeUri, sharerName, receiverName)),
    "application/ld+json"
  );

  // Read the route
  //  await createAclRead(routeUri, userWebId, targetUserWebId);

  // Comment it
  let routeCommentsFileUri = getRouteCommentsFileFromRouteUri(routeUri);
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
  let newRouteName = uuidv4() + ".jsonld";
  let newRoute = getFormattedRoute(routeObject, userWebId, newRouteName);
  let url = getRoutesFolder(userWebId);
  let routeUrl = url + newRouteName;
  await createFolderIfAbsent(url);
  await fc.createFile(
    routeUrl,
    JSON.stringify(newRoute),
    "application/ld+json"
  );

  // create ACL
  //await permissionsToWrite(userWebId, routeUrl, newRouteName);

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
    await fc.deleteFile(folder.files[i].url);
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
    await fc.deleteFile(url + fileName);
  }
}
/**
 *
 * @param {*} session
 * @param {*} routeName
 * @param {*} friend
 */

async function modifyPermissions(session, routeName, friend) {
  const { AclApi, Permissions } = SolidAclUtils;
  const { READ } = Permissions;

  let base = session.webId.split("profile/card#me")[0];
  let routeUrl = base + "viade/routes/" + routeName;
  let aclUrl = routeUrl + ".acl";

  if (!(await fc.itemExists(aclUrl))) {
    let content = await buildAcl(routeName);
    await fc.createFile(aclUrl, content, "text/turtle");
  }
  let friendWebId = friend.webId + "profile/card#me";
  const fetch = auth.fetch.bind(auth);
  const aclApi = new AclApi(fetch, { autoSave: true });
  const acl = await aclApi.loadFromFileUrl(routeUrl);

  await acl.addRule(READ, friendWebId);
}
/**
 * Permissions to write
 * @param {*} userWebId
 * @param {*} routePath
 * @param {*} routeName
 */
async function permissionsToWrite(userWebId, routePath, routeName) {
  const { AclApi, Permissions } = SolidAclUtils;
  const {
    WRITE,
  } = Permissions; /* 

  let aclUrl = routePath + ".acl";
  console.log(aclUrl);
  if (!(await fc.itemExists(aclUrl))) {
    let content = await buildAcl(routeName);
    console.log(content);
    await fc.createFile(aclUrl, content, "text/turtle");
}*/
  const aclApi = new AclApi(auth.fetch, { autoSave: true });
  const acl = await aclApi.loadFromFileUrl(routePath);
  await acl.addRule(WRITE, userWebId);
}

/* async function shareRoute(friend) {
  const { t } = this.props;

  try {
    var session = await auth.currentSession();
    var targetUrl = friend.webId.split("profile/card#me")[0] + "inbox/";
    await this.modifyPermissions(this, session, this.getRouteName(), friend);
    await this.sendMessage(this, session, targetUrl);
    document.getElementById("btn" + friend.webId).innerHTML = t(
      "routes.shared"
    );
    document.getElementById("btn" + friend.webId).disabled = true;
  } catch (error) {
    alert("Could not share the route");
    console.log(error);
  }
}
 */
function buildAcl(routeName) {
  let content =
    "@prefix acl: <http://www.w3.org/ns/auth/acl#>.\n" +
    "@prefix foaf: <http://xmlns.com/foaf/0.1/>.\n" +
    "<#owner> a acl:Authorization;\n" +
    "acl:agent </profile/card#me>;\n" +
    "acl:accessTo <./" +
    routeName +
    ">;" +
    "acl:mode acl:Write, acl:Control, acl:Read.";

  return content;
}

/* async function sendMessage(app, session, targetUrl) {
  var message = {};
  message.date = new Date(Date.now());
  message.id = message.date.getTime();
  message.sender = session.webId;
  message.recipient = targetUrl;

  var baseSource = session.webId.split("profile/card#me")[0];
  var source = baseSource + "viade/routes/";
  message.content = source + app.getRouteName();
  message.title = "Shared route by " + (await app.getSessionName());
  message.url = message.recipient + message.id + ".ttl";

  await app.buildMessage(session, message);
}

async function buildMessage(session, message) {
  var mess = message.url;
  await data[mess.toString()].schema$text.add(message.content);
  await data[mess.toString()].rdfs$label.add(message.title);
  await data[mess.toString()].schema$dateSent.add(message.date.toISOString());
  await data[mess.toString()].rdf$type.add(
    namedNode("https://schema.org/Message")
  );
  await data[mess.toString()].schema$sender.add(namedNode(session.webId));
}
 */

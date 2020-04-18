import auth from "solid-auth-client";
import FC from "solid-file-client";
import { v4 as uuidv4 } from "uuid";

/**
 * Functions in this file present an interface to add, get and manipulate routes
 * stored in a pod. They are intented to keep a consistent signature over time
 * so they act as a coherent module for other parts of the application to use.
 */

const appName = "viade";
const fc = new FC(auth);

export async function createFolderIfAbsent(path) {
    if ( !(await fc.itemExists(path)) ) {
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
    return userWebId.split("/profile")[0] + "/" + appName + "/inbox/";
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
 * Creates the basic folder structure in a given user's pod.
 */
export async function createBaseStructure(userWebId) {
    let folders = [
        getRoutesFolder(userWebId),
        getCommentsFolder(userWebId),
        getMyCommentsFolder(userWebId),
        getInboxFolder(userWebId),
        getResourcesFolder(userWebId),
        getSharedFolder(userWebId)
    ];
    let i = 0;
    for (i; i < folders.length; i++) {
        await createFolderIfAbsent(folders[i]);
    }
    await grantAccess(getInboxFolder(userWebId), userWebId);
}

/**
 * Returns an array containing the routes in a given user's pod.
 */
export async function getRoutesFromPod(userWebId) {
    let url = getRoutesFolder(userWebId);
    if (!(await fc.itemExists(url))) {
        return [];
    }
    let folder = await fc.readFolder(url);
    let routes = [];
    let i = 0;
    for (i; i < folder.files.length; i++) {
        let route = await getRouteFromPod(folder.files[i].name, userWebId);
        routes.push(route);
    }
    return routes;
}

/**
 * Adds a notification to the given user's inbox marking the intention of sharing a route.
 */
export async function shareRouteToPod(
    routeUri, // Do we need this? How to get it if so?
    targetUserWebId,
    sharerName,
    receiverName
) {
    let url = getInboxFolder(targetUserWebId);
    if ( !(await fc.itemExists(url)) ) {
        return; // Possibility: notify the user the target user does not have inbox folder
    }
    await fc.createFile(
        url + uuidv4() + ".jsonld",
        JSON.stringify(getNewNotification(routeUri, sharerName, receiverName)),
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
    let notifications = [];
    let i = 0;
    for (i; i < folder.files.length; i++) {
        notifications.push(await fc.readFile(folder.files[i].url));
    }
    i = 0;
    for (i; i < notifications.length; i++) {
        let routeUri = getRouteUriFromShareNotification(JSON.parse(notifications[i]));
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
    await fc.createFile(
        getRouteCommentsFile(userWebId, newRouteName),
        JSON.stringify(getNewCommentsFile(routeUrl)),
        "application/ld+json"
    );
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
    if (!(await fc.itemExists(myCommentsUrl))) {
        await fc.createFolder(myCommentsUrl);
    }
    let newCommentUrl = myCommentsUrl + uuidv4() + ".jsonld";

    // Create local comment file
    let newComment = getNewComment(commentText, year, month, day);
    await fc.createFile(
        newCommentUrl,
        JSON.stringify(newComment),
        "application/ld+json"
    );

    // Add comment url to route's comments file
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
 * Gets the comments from a given route, assuming the text is in the comments file.
 */
export async function getCommentsFromRoute(userWebId, fileName) {
    let commentsFileRoute = getRouteCommentsFile(userWebId, fileName);
    let commentsFile = await fc.readFile(commentsFileRoute);
    let commentsFileJSON = JSON.parse(commentsFile);
    return commentsFileJSON.comments;
}

/**
 * Returns a route from a given user's pod given the name of the route, or null if not found.
 */
export async function getRouteFromPod(fileName, userWebId) {
    let url = getRoutesFolder(userWebId);
    let folder = await fc.readFolder(url);
    if (folder.files.some((f) => f.name === fileName)) {
        try {
            let fileContent = await fc.readFile(url + fileName);
            let podRoute = JSON.parse(fileContent);
            return getRouteObjectFromPodRoute(podRoute);
        } catch (e) {
            console.log("[ERROR] Route loading failed: " + e);
        }
    }
    return null;
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
    for (i; i< folder.files.length; i++) {
        await fc.deleteFile(folder.files[i].url);
    }
}

/**
 * Removes a route from given user's pod, given the name of the route.
 */
export async function clearRouteFromPod(fileName, userWebId) {
    let url = getRoutesFolder(userWebId);
    let folder = await fc.readFolder(url);
    if (folder.files.some((f) => f.name === fileName)) {
        let fileUrl = url + fileName;
        await fc.deleteFile(fileUrl);
    }
}

/**
 * Grants write permissions to a file in a pod.
 */
export async function grantAccess(path, userWebId) {
    let url = path + ".acl";
    let acl = `@prefix : <#>.
        @prefix n0: <http://www.w3.org/ns/auth/acl#>.
        @prefix ch: <./>.
        @prefix c: </profile/card#>.
        @prefix c0: <${userWebId}>.
        :ControlReadWrite
            a n0:Authorization;
            n0:accessTo ch:;
            n0:agent c:me;
            n0:defaultForNew ch:;
            n0:mode n0:Control, n0:Read, n0:Write.
        :Read
            a n0:Authorization;
            n0:accessTo ch:;
            n0:agent c0:me;
            n0:defaultForNew ch:;
            n0:mode n0:Read.`;
    path += ".acl";
    /* console.log(path);
    console.log(acl);
    */
    await fc.createFile(url, acl).then(
        () => {
            /* console.log("[DEBUG] File permisions added");  */
        },
        (err) => console.log("[ERROR] Could not set file permisions" + err)
    );
}

/**
 * Returns a route in JSON-LD form as a string from the given route object, the webId of the pod's user and
 * the file name of the route for the pod.
 */
export function getFormattedRoute(routeObject, userWebId, fileName) {
    let output = {
        "@context": {
            "@version": "1.1",
            "comments": {
                "@id": "viade:comments",
                "@type": "@id"
            },
            "description": {
                "@id": "schema:description",
                "@type": "xsd:string"
            },
            "media": {
                "@container": "@list",
                "@id": "viade:media"
            },
            "name": {
                "@id": "schema:name",
                "@type": "xsd:string"
            },
            "points": {
                "@container": "@list",
                "@id": "viade:points"
            },
            "latitude": {
                "@id": "schema:latitude",
                "@type": "xsd:double"
            },
            "longitude": {
                "@id": "schema:longitude",
                "@type": "xsd:double"
            },
            "elevation": {
                "@id": "schema:elevation",
                "@type": "xsd:double"
            },
            "author": {
                "@id": "schema:author",
                "@type": "@id"
            },
            "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
            "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
            "schema": "http://schema.org/",
            "viade": "http://arquisoft.github.io/viadeSpec/",
            "xsd": "http://www.w3.org/2001/XMLSchema#"
        },
        "name": routeObject.name,
        "author": routeObject.author,
        "description": routeObject.description,
        "comments": getRouteCommentsFile(userWebId, fileName),
        "media": routeObject.images + routeObject.videos,
        "waypoints": routeObject.positions,
        "points": routeObject.positions
    };
    return output;
}

/**
 * Returns a route in JSON form from the given route in JSON-LD.
 */
function getRouteObjectFromPodRoute(route) {
    return {
        name: route.name,
        description: route.description,
        author: route.author,
        positions: route.waypoints
    };
}

/**
 * Returns the URI of the route from a notification object.
 */
function getRouteUriFromShareNotification(notification) {
    return notification.notification.object.uri;
}

/**
 * Adds a given URI to the list of routes shared with the given user.
 */
async function addRouteUriToShared(userWebId, uri) {
    let folder = getSharedFolder(userWebId);
    await createFolderIfAbsent(folder);
    let fileName = "sharedRoutes.jsonld";
    let filePath = folder + fileName;
    let sharedRoutesJSON;
    if (!(await fc.itemExists(filePath))) {
        sharedRoutesJSON = getNewSharedRoutesFileContent();
    } else {
        let sharedRoutes = await fc.readFile(filePath);
        sharedRoutesJSON = JSON.parse(sharedRoutes);
    }
    // Possibility: Add a check to not duplicate routes
    sharedRoutesJSON.routes.push({"@id": uri});
    await fc.createFile(filePath, JSON.stringify(sharedRoutesJSON), "application/ld+json");
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
            "viade": "http://arquisoft.github.io/viadeSpec/",
            "schema": "http://schema.org/",
            comments: {
                "@container": "@list",
                "@id": "viade:comments"
            },
        },
        "routeUri": routeUrl,
        "comments": [],
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


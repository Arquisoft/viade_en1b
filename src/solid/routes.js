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

async function createFolderIfAbsent(path) {
    if (! await fc.itemExists(path)) {
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
export function getRouteCommentsFile(userWebId, routeName) {
    return getCommentsFolder(userWebId) + "myRoutesComments/" + routeName;
}

/**
 * Returns a string containing the URI of the resources folder for the given user.
 */
export function getResourcesFolder(userWebId) {
    return userWebId.split("/profile")[0] + "/" + appName + "/resources/";
}

/**
 * Returns an array containing the routes in a given user's pod.
 */
export async function getRoutesFromPod(userWebId) {
    let url = getRoutesFolder(userWebId);
    if (! await fc.itemExists(url)) {
        return [];
    }
    let folder = await fc.readFolder(url);
    let routes = folder.files.map( async (f) => await getRouteFromPod(f.name, userWebId) );
    return routes.sort((route1, route2) => route1.id - route2.id);
}

/**
 * Generates a new ID based on the existing ones (to be deprecated in favor of UUIDs).
 */
async function getNextId(userWebId) {
    let routes = await getRoutesFromPod(userWebId);
    routes = routes.sort((a, b) => {
        return a.id - b.id;
    });
    console.log(routes);
    for (let i = 0; i < routes.length; i++) {
        if (i !== routes[i].id) {
            return i;
        }
    }
    return routes.length;
}

/**
 * Adds a notification to the given user's inbox marking the intention of sharing a route.
 */
export async function shareRouteToPod(route, userWebId) {
    let url = getInboxFolder(userWebId);
    if ( !fc.itemExists(url) ) {
        return; // Possibility: notify the user the target user does not have inbox folder
    }
    await fc.createFile(
        url + uuidv4(),
        getNewNotification(route),
        "application/ld+json"
    );
}

/**
 * Reads the target user's inbox, adding to shared routes the ones found in the notifications present there
 * and then deletes those notifications.
 */
export async function checkInboxForSharedRoutes(userWebId) {
    let url = getInboxFolder(userWebId);
    createFolderIfAbsent(url);
    let folder = await fc.readFolder(url);
    let notifications = folder.files.map( async (f) => await fc.readFile(f.name) );
    let i = 0;
    for ( i; i < notifications.length; i++ ) {
        addRouteUriToShared(getRouteUriFromShareNotification(notifications.get(i)));
        fc.deleteFile(folder.files[i].url);
    }
}

/**
 * Adds the given route to the given user's pod.
 */
export async function uploadRouteToPod(route, userWebId) {
    route = { ...route, id: await getNextId(userWebId) };
    let url = getRoutesFolder(userWebId);
    createFolderIfAbsent(url);
    await fc.createFile(
        url + route.name,
        JSON.stringify(route),
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
    let month = date.getMonth()+1;
    let year = date.getFullYear();
    let url = getCommentsFolder(userWebId);
    if (!await fc.itemExists(url)) {
        await fc.createFolder(url);
    }
    let newComment = getNewComment(commentText, year, month, day);
    await fc.createFile(url + uuidv4(), JSON.stringify(newComment), "application/ld+json"); // Creates local comment
    let route = fc.readFile(commentedRouteUri);
    let routeJSON = JSON.parse(route);
    let commentsFileContent = fc.readFile(routeJSON.comments);
    let commentsFileContentJSON = JSON.parse(commentsFileContent);
    commentsFileContentJSON.comments.add(newComment); // Adds comment to comments on routeComments file
    fc.createFile(
        routeJSON.comments,
        JSON.stringify(commentsFileContentJSON),
        "application/ld+json"
    );
}

/**
 * Returns a route from a given user's pod given the name of the route, or null if not found.
 */
export async function getRouteFromPod(routeName, userWebId) {
    let url = getRoutesFolder(userWebId);
    let folder = await fc.readFolder(url);
    if (folder.files.includes(routeName)) {
        return fc.readFile(url + routeName);
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
    await Promise.all(
        folder.files.map(async f => await fc.deleteFile(url + f.name))
    );
}

/**
 * Removes a route from given user's pod, given the name of the route.
 */
export async function clearRouteFromPod(routeName, userWebId) {
    let url = getRoutesFolder(userWebId);
    let folder = await fc.readFolder(url);
    if (folder.files.includes(routeName)) {
        let fileUrl = url + routeName;
        fc.deleteFile(fileUrl);
    }
}

/**
 * Grants write permissions to a file in a pod.
 */
export async function grantAccess(path, userWebId) {
    let url = path + ".acl";
    let acl =
        `@prefix : <#>.
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
    console.log(path);
    console.log(acl);
    await fc.updateFile(url, acl).then(() => {
        console.log("Folder permisions added");
    }, (err) => console.log("Could not set folder permisions" + err));
}

/**
 * Returns a new notification in JSON form.
 */
function getNewNotification(route, sharerName, receiverName) {
    return {
        "@context": {
            "@version": 1.1,
            "as": "https://www.w3.org/ns/activitystreams#",
            "viade": "http://arquisoft.github.io/viadeSpec/",
            "notification": {
                "@id": "as:Offer"
            }
        },
        "notification": {
            "actor": {
                "type": "Person",
                "name":sharerName
            },
            "object": {
                "type": "viade:route",
                "uri":route.uri // TODO
            },
            "target": {
                "type": "Person",
                "name":receiverName
            }
        }
    }
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
    let folder = userWebId.split("/profile")[0] + "/" + appName + "/shared/";
    createFolderIfAbsent(folder);
    let fileName = "sharedRoutes.jsonld";
    let filePath = folder + fileName;
    let sharedRoutesJSON;
    if (! await fc.itemExists(filePath)) {
        sharedRoutesJSON = getNewSharedRoutesFileContent();
    }
    else {
        let sharedRoutes = fc.readFile(filePath);
        sharedRoutesJSON = JSON.parse(sharedRoutes);
    }
    // Possibility: Add a check to not duplicate routes
    sharedRoutesJSON.routes.add( { "@id": uri } );
        await fc.createFile(
            filePath,
            sharedRoutesJSON,
            "application/ld+json"
        );
}

/**
 * Returns a new shared routes file in JSON form.
 */
function getNewSharedRoutesFileContent() {
    return {
        "@context": {
            "@version": 1.1,
            "routes": {
                "@container": "@list",
                "@id": "viade:routes"
            },
            "viade": "http://arquisoft.github.io/viadeSpec/"
        },
        "routes": []
    }
}

/**
 * Returns a new comment file in JSON form.
 */
function getNewComment(commentText, year, month, day) {
    return {
        "@context": {
            "@version": 1.1,
            "viade": "http://arquisoft.github.io/viadeSpec/",
            "schema": "http://schema.org/",
            "dateCreated": {
                "@id": "viade:dateCreated",
                "@type": "xsd:date"
            },
            "text": {
                "@id": "viade:text",
                "@type": "xsd:string"
            }
        },
        "text": commentText,
        "dateCreated": year + "-" + month + "-" + day
    };
}


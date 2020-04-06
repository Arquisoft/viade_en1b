import auth from "solid-auth-client";
import FC from "solid-file-client";
import { v4 as uuidv4 } from "uuid";

/**
 * Functions in this file present an interface to add, get and manipulate routes
 * stored in a pod. They are intented to keep a consistent signature over time
 * so they act as a coherent module for other parts of the application to use.
 */

const appName = "viade";

export function getRoutesFolder(userWebId) {
    return userWebId.split("/profile")[0] + "/" + appName + "/routes/";
}

export function getCommentsFolder(userWebId) {
    return userWebId.split("/profile")[0] + "/" + appName + "/comments/";
}

export function getMyCommentsFolder(userWebId) {
    return getCommentsFolder(userWebId) + "myComments/";
}

export function getRouteCommentsFile(userWebId, routeName) {
    return getCommentsFolder(userWebId) + "myRoutesComments/" + routeName;
}

export async function getRoutesFromPod(userWebId) {
    let url = getRoutesFolder(userWebId);
    let fc = new FC(auth);
    if (! await fc.itemExists(url)) {
        return [];
    }
    let folder = await fc.readFolder(url);
    return folder.files.map( async (f) => await getRouteFromPod(f.name, userWebId) );
}

async function getNextId(userWebId) {
    let routes = await getRoutesFromPod(userWebId);
    routes = routes.sort( (a, b) => { return a.id - b.id; } );
    for (let i = 0; i < routes.length; i++) {
        if (i !== routes.get(i).id) {
            return i;
        }
    }
    return routes.length;
}

export async function uploadRouteToPod(route, userWebId) {
    route.id = await getNextId(userWebId);
    let url = getRoutesFolder(userWebId);
    let fc = new FC(auth);
    if (!await fc.itemExists(url)) {
        await fc.createFolder(url);
    }
    await fc.createFile(url + route.name, JSON.stringify(route), "text/plain");
}

export async function uploadCommentToPod(userWebId, routeCommentsUri, commentText) {
    let url = getCommentsFolder(userWebId);
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();
    let fc = new FC(auth);
    if (!await fc.itemExists(url)) {
        await fc.createFolder(url);
    }
    let newComment = {
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
    await fc.createFile(url + uuidv4(), JSON.stringify(newComment), "text/plain");
    // change route comments file, adding uri of this comment
}

export async function getRouteFromPod(routeName, userWebId) {
    let url = getRoutesFolder(userWebId);
    let fc = new FC(auth);
    let folder = await fc.readFolder(url);
    if (folder.files.includes(routeName)) {
        return fc.readFile(url + routeName);
    }
    return null;
}

export async function clearRoutesFromPod(userWebId) {
    let url = getRoutesFolder(userWebId);
    let fc = new FC(auth);
    if (! await fc.itemExists(url)) {
        return;
    }
    let folder = await fc.readFolder(url);
    await Promise.all(folder.files.map(async (f) => await fc.deleteFile(url + f.name)));
}

export async function clearRouteFromPod(routeName, userWebId) {
    let url = getRoutesFolder(userWebId);
    let fc = new FC(auth);
    let folder = await fc.readFolder(url);
    if (folder.files.includes(routeName)) {
        let fileUrl = url + routeName;
        fc.deleteFile(fileUrl);
    }
}


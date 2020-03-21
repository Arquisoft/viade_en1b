import auth from "solid-auth-client";
import FC from "solid-file-client";
import { getWebId } from "./auth";

/**
 * Functions in this file present an interface to add, get and manipulate routes
 * stored in a pod. They are intented to keep a consistent signature over time
 * so they act as a coherent module for other parts of the application to use.
 */

export async function getRoutesFolder() {
    let session = await getWebId();
    return session.split("/profile")[0] + "/public/routes/";
}

export async function getRoutesFromPod() {
    let url = await getRoutesFolder();
    let fc = new FC(auth);
    let folder = await fc.readFolder(url);
    let routesTexts = await Promise.all(folder.files.map(async (f) => await fc.readFile(url + f.name)));
    let routes = routesTexts.map(JSON.parse);
    return routes;
}

async function getNextId() {
    let routes = await getRoutesFromPod();
    routes = routes.sort( (a, b) => { return a.id - b.id; } );
    for (let i = 0; i < routes.length; i++) {
        if (i !== routes.get(i).id) {
            return i;
        }
    }
    return routes.length;
}

export async function uploadRouteToPod(route) {
    route.id = await getNextId();
    let url = await getRoutesFolder();
    let fc = new FC(auth);
    if (!await fc.itemExists(url)) {
        await fc.createFolder(url);
    }
    await fc.createFile(url + route.name, JSON.stringify(route), "text/plain");
}

export async function getRouteFromPod(routeName) {
    let url = await getRoutesFolder();
    let fc = new FC(auth);
    let folder = await fc.readFolder(url);
    if (folder.files.includes(routeName)) {
        return fc.readFile(url + routeName);
    }
    return null;
}

export async function clearRoutesFromPod() {
    let url = await getRoutesFolder();
    let fc = new FC(auth);
    let folder = await fc.readFolder(url);
    await Promise.all(folder.files.map(async (f) => await fc.deleteFile(url + f.name)));
}

export async function clearRouteFromPod(routeName) {
    let url = await getRoutesFolder();
    let fc = new FC(auth);
    let folder = await fc.readFolder(url);
    if (folder.files.includes(routeName)) {
        let fileUrl = url + routeName;
        fc.deleteFile(fileUrl);
    }
}


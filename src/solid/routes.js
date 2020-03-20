import auth from "solid-auth-client";
import FC from "solid-file-client";
import { getWebId } from "./auth";

export async function uploadRouteToPod(route) {
    let url = await getRoutesFolder();
    let fc = new FC(auth);
    if(!await fc.itemExists(url)){
        await fc.createFolder(url);
    }
    await fc.createFile(url + route.name, JSON.stringify(route), "text/plain");
}

export async function getRouteFromPod(routeName) {
    let url = await getRoutesFolder();
    let fc = new FC(auth);
    let folder = await fc.readFolder(url);
    if (folder.files.includes(routeName))
        return fc.readFile(url + routeName);
    return null;
}

export async function getRoutesFromPod() {
    let url = await getRoutesFolder();
    let fc = new FC(auth);
    let folder = await fc.readFolder(url);
    let routesTexts = await Promise.all(folder.files.map(async (f) => await fc.readFile(url + f.name)));
    let routes = routesTexts.map(JSON.parse);
    return routes;
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

export async function getRoutesFolder() {
    let session = await getWebId();
    return session.split("/profile")[0] + "/public/routes/";
}


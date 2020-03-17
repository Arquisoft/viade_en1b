import auth from "solid-auth-client";
import FC from "solid-file-client";
import { getWebId } from "./auth";

export async function uploadRouteToPod(route) {
    var session = await getWebId();
    var url = session.split("/profile")[0] + "/public/routes/";
    var fc = new FC(auth);
    if(!await fc.itemExists(url)){
        await fc.createFolder(url);
    }
    await fc.createFile(url + route.name, JSON.stringify(route), "text/plain");
}

export async function getRoutesFromPod() {
    var session = await getWebId();
    var url = session.split("/profile")[0] + "/public/routes/";
    var fc = new FC(auth);
    var folder = await fc.readFolder(url);
    var routesTexts = await Promise.all(folder.files.map(async (f) => await fc.readFile(url + f.name)));
    var routes = routesTexts.map(JSON.parse);
    return routes;
}


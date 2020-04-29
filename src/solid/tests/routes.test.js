import auth from "solid-auth-client";
import FC from "solid-file-client";
import * as solid from "../routes";

describe("Solid Routes", () => {

    const LocalPod = require("solid-local-pod");
    const solidFileFetchFirst = require("solid-local-pod/src/solidFileFetch");
    const solidFileFetchSecond = require("solid-local-pod/src/solidFileFetch");

    const mkdirp = require("mkdirp");

    const userPod = new LocalPod({
        port: 3000,
        basePath: ".localpods/userpod/",
        fetch: solidFileFetchFirst
    });

    const friendPod = new LocalPod({
        port: 3333,
        basePath: ".localpods/friendpod/",
        fetch: solidFileFetchSecond
    });

    const userWebId   = "http://localhost:" + userPod.port + "/profile/card#me";
    const friendWebId = "http://localhost:" + friendPod.port + "/profile/card#me";

    const firstRouteName    = "A nice route";
    const firstRouteAuthor  = "Mortadelo";
    const secondRouteName   = "Second route";
    const secondRouteAuthor = "Filemón";

    const firstRouteFilename = "firstRoute.jsonld";

    const firstRoute =
        {
            name: firstRouteName,
            author: firstRouteAuthor,
            positions: [
                [43.363852, -5.844003],
                [43.361833, -5.842216],
                [43.362474, -5.843861],
                [43.362086, -5.846302],
                [43.360831, -5.849717],
                [43.355001, -5.851482]
            ],
            description: "Starting at Gascona, you will end right in front of the EII.",
            images: [],
            videos: [],
            comments: "A nice route indeed!"
        };
    const secondRoute =
        {
            name: secondRouteName,
            author: secondRouteAuthor,
            positions: [
                [43.364852, -5.844003],
                [43.364833, -5.842216],
                [43.364474, -5.843861],
                [43.364086, -5.846302],
                [43.364831, -5.849717],
                [43.354001, -5.851482]
            ],
            description: "Description of a second route.",
            images: [],
            videos: [],
            comments: "Comment for the second route"
        };

    const fc = new FC(auth);

    let folders = [];

    beforeAll(async () => {
        mkdirp(userPod.basePath, function (err) {
            if (err) {
                console.error(err);
            }
        });
        mkdirp(friendPod.basePath, function (err) {
            if (err) {
                console.error(err);
            }
        });
        folders = [
            solid.getRootFolder(userWebId),
            solid.getRoutesFolder(userWebId),
            solid.getCommentsFolder(userWebId),
            solid.getInboxFolder(userWebId),
            solid.getResourcesFolder(userWebId),
            solid.getSharedFolder(userWebId),
        ];
        await userPod.startListening();
        await friendPod.startListening();
    });

    afterAll( () => {
        userPod.stopListening();
        friendPod.stopListening();
    });

    /**
     * Checks base structure is created.
     */
    test("Create base structure", async() => {
        await solid.createBaseStructure(userWebId);
        await solid.createBaseStructure(friendWebId);
        let i = 0;
        for (i; i < folders.length; i++) {
            expect(await fc.itemExists(folders[i])).toBeTruthy();
        }
    });


    /**
     * Checks a route can be deleted idempotently.
     */
    test("Delete one route from POD", async () => {

        await solid.clearRoutesFromPod(userWebId);
        let routes = await solid.getRoutesFromPod(userWebId);
        expect(routes.length).toEqual(0);

        await solid.clearRouteFromPod(firstRouteFilename, userWebId);
        routes = await solid.getRoutesFromPod(userWebId);
        expect(routes.length).toEqual(0);

        await solid.uploadRouteToPod(firstRoute, userWebId);

        routes = await solid.getRoutesFromPod(userWebId);
        expect(routes.length).toEqual(1);

        let routeName = (await fc.readFolder(solid.getRoutesFolder(userWebId))).files[0].name.split(".")[0];
        await solid.clearRouteFromPod(routeName, userWebId);
        routes = await solid.getRoutesFromPod(userWebId);
        expect(routes.length).toEqual(0);

    });

    /**
     * Checks no routes are left after deleting all of them.
     */
    test("Delete routes from POD", async () => {

        await solid.clearRoutesFromPod(userWebId);
        let routes = await solid.getRoutesFromPod(userWebId);
        expect(routes.length).toEqual(0);

        await solid.uploadRouteToPod(firstRoute, userWebId);
        await solid.uploadRouteToPod(secondRoute, userWebId);
        routes = await solid.getRoutesFromPod(userWebId);
        expect(routes.length).toEqual(2);

        await solid.clearRoutesFromPod(userWebId);
        routes = await solid.getRoutesFromPod(userWebId);
        expect(routes.length).toEqual(0);

        // Test behaviour when there are no folder
        await fc.deleteFolder(solid.getRoutesFolder(userWebId));
        await solid.clearRoutesFromPod(userWebId);
        routes = await solid.getRoutesFromPod(userWebId);
        expect(routes.length).toEqual(0);
    });

    /**
     * Checks there is one route after cleaning and uploading one.
     */
    test("Add first route to POD", async () => {
        await solid.clearRoutesFromPod(userWebId);
        await solid.uploadRouteToPod(firstRoute, userWebId);
        let routes = await solid.getRoutesFromPod(userWebId);
        expect(routes.length).toEqual(1);
    });

    /**
     * Uploads a couple routes and checks they are obtained.
     */
    test("Upload and get routes", async () => {
        await solid.clearRoutesFromPod(userWebId);
        await solid.uploadRouteToPod(firstRoute, userWebId);
        await solid.uploadRouteToPod(secondRoute, userWebId);
        let routes = await solid.getRoutesFromPod(userWebId);
        expect(routes.length).toEqual(2);
        routes.sort( (r1, r2) => r1.name < r2.name ? -1 : 1 );
        expect(routes[0].name).toEqual(firstRouteName);
        expect(routes[0].author).toEqual(firstRouteAuthor);
        expect(routes[1].name).toEqual(secondRouteName);
        expect(routes[1].author).toEqual(secondRouteAuthor);

        expect(await solid.getRouteFromPod("noRoute", userWebId)).toBeFalsy();
    });

    /**
     * Checks inbox processing for getting routes shared with user.
     */
    test("Process inbox notifications", async() => {

        // Clear notifications, recreate inbox and delete shared folder in friend's pod
        await solid.checkInboxForSharedRoutes(friendWebId); // Should clear notifications
        if (await fc.itemExists(solid.getSharedFolder(friendWebId))) {
            await fc.deleteFolder(solid.getSharedFolder(friendWebId));
        }

        if (await fc.itemExists(solid.getInboxFolder(friendWebId))) {
            await fc.deleteFolder(solid.getInboxFolder(friendWebId));
            await fc.createFolder(solid.getInboxFolder(friendWebId));
        }

        // Delete user's routes
        if (await fc.itemExists(solid.getRoutesFolder(userWebId))) {
            await fc.deleteFolder(solid.getRoutesFolder(userWebId));
        }

        // No shared folder, so 0 shared routes
        let sharedRoutes = await solid.getRoutesFromPod(friendWebId);
        expect(sharedRoutes.length).toEqual(0);

        // Upload route and get its uri
        await solid.uploadRouteToPod(firstRoute, userWebId);
        let routeUri = (await fc.readFolder(solid.getRoutesFolder(userWebId))).files[0].url;
        routeUri = routeUri.split(/\.acl$/)[0]; // In case it got the .acl

        await solid.shareRouteToPod(
            userWebId,
            routeUri,
            friendWebId,
            firstRouteAuthor,
            secondRouteAuthor
        );

        await solid.checkInboxForSharedRoutes(friendWebId);

        let sharedFolder = solid.getSharedFolder(friendWebId);
        let existsSharedRoutesFolder = await fc.itemExists(sharedFolder);
        expect(existsSharedRoutesFolder).toBeTruthy();
        let existsSharedRoutesFile = await fc.itemExists(sharedFolder + "localhost.jsonld");
        expect(existsSharedRoutesFile).toBeTruthy();

        sharedRoutes = await solid.getRoutesFromPod(friendWebId);
        expect(sharedRoutes.length).toEqual(1);
        expect(sharedRoutes[0].name).toEqual(firstRouteName);
        expect(sharedRoutes[0].author).toEqual(firstRouteAuthor);

        await solid.checkInboxForSharedRoutes(friendWebId);

        sharedRoutes = await solid.getRoutesFromPod(friendWebId);
        expect(sharedRoutes.length).toEqual(1);
        expect(sharedRoutes[0].name).toEqual(firstRouteName);
        expect(sharedRoutes[0].author).toEqual(firstRouteAuthor);
        let inboxFolder = solid.getInboxFolder(friendWebId);
        let notifications = (await fc.readFolder(inboxFolder)).files;
        expect(notifications.length).toEqual(0); // Error

    });

    /**
     * Checks comments from a route can be obtained.
     */

    test("Get comments from route", async() => {

        if (await fc.itemExists(solid.getRoutesFolder(userWebId))) {
            await fc.deleteFolder(solid.getRoutesFolder(userWebId));
        }
        if (await fc.itemExists(solid.getCommentsFolder(userWebId))) {
            await fc.deleteFolder(solid.getCommentsFolder(userWebId));
        }

        // Upload route and get its uri
        await solid.uploadRouteToPod(firstRoute, userWebId);
        let routeUri = (await fc.readFolder(solid.getRoutesFolder(userWebId))).files[0].url;
        routeUri = routeUri.split( /\.acl$/ )[0]; // In case it got the .acl
        let routeFilename = routeUri.match( /[^/]*$/ )[0];

        const commentText = "Test comment";

        let routeCommentsUri = solid.getRouteCommentsFile(userWebId, routeFilename);
        await solid.uploadComment(userWebId, routeCommentsUri, commentText);
        let comments = await solid.getCommentsFromRoute(userWebId, routeFilename);
        expect(comments[0].text).toEqual(firstRoute.comments);
        expect(comments[1].text).toEqual(commentText); // Comment uploaded in order

    });

    /**
     * Checks notification are obtained correctly.
     */
    test("Get notifications", async() => {

        // Delete inbox and check empty notifications array is obtained
        if (await fc.itemExists(solid.getInboxFolder(friendWebId))) {
            await fc.deleteFolder(solid.getInboxFolder(friendWebId));
        }
        expect(await solid.getNotifications(friendWebId)).toEqual([]);

        // Create inbox
        await fc.createFolder(solid.getInboxFolder(friendWebId));

        // Upload route and get its uri
        await solid.uploadRouteToPod(firstRoute, userWebId);
        let routeUri = (await fc.readFolder(solid.getRoutesFolder(userWebId))).files[0].url;
        routeUri = routeUri.split(/\.acl$/)[0]; // In case it got the .acl

        // Share so notification is created
        await solid.shareRouteToPod(
            userWebId,
            routeUri,
            friendWebId,
            firstRouteAuthor,
            secondRouteAuthor
        );

        // Check correct notification is obtained
        let notifications = await solid.getNotifications(friendWebId);
        let routeName = firstRouteName.replace(/ /g, "_");
        expect(notifications[0].text.split(routeName)[0]).toEqual(firstRouteAuthor + " has shared ");

    });

    /**
     * Checks route unshare functionality.
     */
    test("Unshare route", async() => {

        // Delete user routes folder
        if (await fc.itemExists(solid.getRoutesFolder(userWebId))) {
            await fc.deleteFolder(solid.getRoutesFolder(userWebId));
        }

        // Recreate friend shared folder
        if (await fc.itemExists(solid.getSharedFolder(friendWebId))) {
            await fc.deleteFolder(solid.getSharedFolder(friendWebId));
        }

        // Recreate friend inbox folder
        if (await fc.itemExists(solid.getInboxFolder(friendWebId))) {
            await fc.deleteFolder(solid.getInboxFolder(friendWebId));
            await fc.createFolder(solid.getInboxFolder(friendWebId));
        }

        // Upload route and get its uri
        await solid.uploadRouteToPod(firstRoute, userWebId);
        let routeUri = (await fc.readFolder(solid.getRoutesFolder(userWebId))).files[0].url;
        routeUri = routeUri.split(/\.acl$/)[0]; // In case it got the .acl
        let routeId = routeUri.split("/");
        routeId = routeId[routeId.length - 1];
        routeId = routeId.split(/\./)[0];

        // Share
        await solid.shareRouteToPod(
            userWebId,
            routeUri,
            friendWebId,
            firstRouteAuthor,
            secondRouteAuthor
        );

        // Friend checks inbox
        await solid.checkInboxForSharedRoutes(friendWebId);

        let sharedRoutesFile = await fc.readFile(solid.getSharedFolder(friendWebId) + "localhost.jsonld");
        let sharedRoutesFileJSON = JSON.parse(sharedRoutesFile);
        expect(sharedRoutesFileJSON.routes.length).toEqual(1);

        await solid.unshareRoute(userWebId, routeId, friendWebId);

        sharedRoutesFile = await fc.readFile(solid.getSharedFolder(friendWebId) + "localhost.jsonld");
        sharedRoutesFileJSON = JSON.parse(sharedRoutesFile);
        expect(sharedRoutesFileJSON.routes.length).toEqual(0);
    });

});


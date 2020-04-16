import auth from "solid-auth-client";
import FC from "solid-file-client";
import * as solid from "../routes";

describe("Solid Routes", () => {

    const LocalPod = require('solid-local-pod')
    const solidFileFetchFirst = require('solid-local-pod/src/solidFileFetch')
    const solidFileFetchSecond = require('solid-local-pod/src/solidFileFetch')

    const userPod = new LocalPod({
        port: 3000,
        basePath: '.localpods/userpod',
        fetch: solidFileFetchFirst
    })

    const friendPod = new LocalPod({
        port: 3333,
        basePath: '.localpods/friendpod',
        fetch: solidFileFetchSecond
    })

    let userWebId;
    let friendWebId;

    beforeAll(async () => {
        userWebId = "http://localhost:" + userPod.port + "/profile/";
        friendWebId = "http://localhost:" + friendPod.port + "/profile/";
        await userPod.startListening();
        await friendPod.startListening();
    });

    afterAll(async () => {
        await userPod.stopListening();
        await friendPod.stopListening();
    });

    const firstRouteName    = "A nice route";
    const firstRouteAuthor  = "Mortadelo";
    const secondRouteName   = "Second route";
    const secondRouteAuthor = "Filemón";

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
            description: "Starting at Gascona, you will end right in front of the EII."
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
            description: "Description of a second route."
        };

    /**
     * Checks no routes are left after deleting all of them.
     */
    test("Delete routes from POD", async () => {
        await solid.clearRoutesFromPod(userWebId);
        let routes = await solid.getRoutesFromPod(userWebId);
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
        routes.sort( (r1, r2) => r1.name < r2.name ? -1 : 1);
        expect(routes[0].name).toEqual(firstRouteName);
        expect(routes[0].author).toEqual(firstRouteAuthor);
        expect(routes[1].name).toEqual(secondRouteName);
        expect(routes[1].author).toEqual(secondRouteAuthor);
    });

    /**
     * Checks route sharing creates the notification correctly.
     */
    test("Share a route", async () => {

        const firstRouteFilename = "firstRoute.jsonld";
        const firstRouteUri = solid.getRoutesFolder(userWebId) + firstRouteFilename;
        const friendInboxFolderUri = solid.getInboxFolder(userWebId); // Sharing with self

        let fc = new FC(auth);
         if (await fc.itemExists(friendInboxFolderUri)) {
             await fc.deleteFolder(friendInboxFolderUri);
         }
        await solid.createFolderIfAbsent(friendInboxFolderUri);

        let inboxFiles = await fc.readFolder(friendInboxFolderUri);
        expect(inboxFiles.files.length).toEqual(0);

        await fc.createFile(
            firstRouteUri,
            JSON.stringify(firstRoute),
            "application/ld+json"
        );
        await solid.shareRouteToPod(
            firstRouteUri,
            userWebId, // Sharing with self
            firstRouteAuthor,
            secondRouteAuthor
        );

        inboxFiles = await fc.readFolder(friendInboxFolderUri);
        expect(inboxFiles.files.length).toEqual(1);

        let notification = await fc.readFile(inboxFiles.files[0].url);
        let notificationJSON = JSON.parse(notification);
        expect(notificationJSON.notification.actor.name).toEqual(firstRouteAuthor);
        expect(notificationJSON.notification.target.name).toEqual(secondRouteAuthor);
        expect(notificationJSON.notification.object.uri).toEqual(firstRouteUri);

    });

    /**
     * Checks inbox processing for getting routes shared with user.
     */
    // test("Process inbox notifications", async() => {
    //   ...
    // });

});


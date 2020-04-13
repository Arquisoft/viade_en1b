import * as solid from "../routes";

describe("Solid Routes", () => {

    const targetWebId = "https://viandetest2020.solid.community/profile/card#me";
    const route =
        {
            name: "A nice route",
            author: "Íñigo",
            positions: [
                [43.363852, -5.844003],
                [43.361833, -5.842216],
                [43.362474, -5.843861],
                [43.362086, -5.846302],
                [43.360831, -5.849717],
                [43.355001, -5.851482]
            ],
            description: "Starting at Gascona, you will end right in front of the EII after visiting some important places in Oviedo.",
            "images": ["https://inigogf.inrupt.net/profile/catedralDeOviedo.jpg"],
            videos: []
        };

    test("Correct path to routes", async () => {
        expect(solid.getRoutesFolder(targetWebId)).toEqual("https://viandetest2020.solid.community/viade/routes/");
    });

    // test("Delete routes from POD", async () => {
    //     await solid.clearRoutesFromPod(targetWebId);
    //     let routes = await solid.getRoutesFromPod(targetWebId);
    //     expect(routes.length).toEqual(0);
    // });

    // The user needs to be logged in for this one.
    //test("Add first route to POD", async () => {
    //    await solid.clearRoutesFromPod(targetWebId);
    //    await solid.uploadRouteToPod(route, targetWebId);
    //    let routes = await solid.getRoutesFromPod(targetWebId);
    //    expect(routes.length).toEqual(1);
    //});

});


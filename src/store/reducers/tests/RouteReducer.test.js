import {routeReducer} from "../RouteReducer";
import "@testing-library/jest-dom";
import { uploadRoute } from "../../actions/RouteActions";

import {
  getRoute0,
  getRoute1,
  getRoute2,
  getRoute3,
  getRoute4
} from "../../../test/exampleRoutes";

describe("Routes Reducer", () => {

    const route0 = getRoute0();
    const route1 = getRoute1();
    const route2 = getRoute2();
    const route3 = getRoute3();
    const route4 = getRoute4();

    const routes = [
        route0,
        route1,
        route2,
        route3,
        route4,
    ];

    const initState = {
        routes,
        selectedRoute: null
    };

    const initNewState = {
        routes: [],
        selectedRoute: null,
        routesLoading: false,
        routesError: null
    };

    test("Should return default state", () => {
        const newState = routeReducer(undefined, {});
        expect(newState).toEqual({
            routes: [],
            selectedRoute: null,
            routesLoading: false,
            routesError: null
        });
    });

    describe("Should return state if receiving type", () => {
        const route = JSON.parse(JSON.stringify(route0));
        route.id = 5;

        test("Type SHOW_ROUTE", () => {
            const newState = routeReducer(initState, {
                type : "SHOW_ROUTE",
                payload: route
            });
            const expected = {...initState, selectedRoute:route};
            expect(newState).toEqual(expected);
        });

        test("Type UPLOAD_ROUTE", () => {
            const newState = routeReducer(initState, uploadRoute(routes,routes,"https://themrcesi.inrupt.net/profile/card#me"));
            const expected = {...initState};
            expect(newState).toEqual(expected);
        });

        test("Type CLEAR_ROUTE", () => {
            const newState = routeReducer(initState, {
                type : "CLEAR_ROUTE",
                payload: null
            });
            const expected = {...initState, selectedRoute:null};
            expect(newState).toEqual(expected);
        });

        test("Type DELETE_ROUTE", () => {
            const newState = routeReducer(initState, {
                type : "DELETE_ROUTE",
                payload: {
                    route,
                    uri: "https://themrcesi.inrupt.net/profile/card#me"
                }
            });
            let newRoutes = initState.routes.filter((r) => r.id !== route.id);
            const expected = {...initState, routes:newRoutes};
            expect(newState).toEqual(expected);
        });

        test("Type SHARE_ROUTE", () => {
            let route = JSON.parse(JSON.stringify(route0));
            const newState = routeReducer(initState, {
                type : "SHARE_ROUTE",
                payload: { route, friends: ["marcos"]}
            });
            const routes = [
                route0,
                route1,
                route2,
                route3,
                route4,
            ];

            expect(newState).toEqual(initState);
        });

        test("Type UNSHARE_ROUTE", () => {
            let mockRoute = route0;
            const mockAuthorWebId = "https://elbicho.solid.community/profile/card#me";
            const newState = routeReducer(initState, {
                type : "UNSHARE_ROUTE",
                payload: { routeId: mockRoute.id, authorWebId: mockAuthorWebId, userWebId: mockAuthorWebId}
            });
            const routes = [
              route1,
              route2,
              route3,
              route4,
            ];
            expect(newState.routes).toEqual(routes);

        });

        const mockPayload = "";

        test("Type LOAD_ROUTES_REQUEST", () => {
            const newState = routeReducer(initNewState, {
                type: "LOAD_ROUTES_REQUEST",
                payload: mockPayload
            });

            const expected = {
                routes: [],
                selectedRoute: null,
                routesLoading: mockPayload,
                routesError: null
            };

            expect(newState).toStrictEqual(expected);
        });

        test("Type LOAD_ROUTES_SUCCESS", () => {
            const newState = routeReducer(initNewState, {
                type: "LOAD_ROUTES_SUCCESS",
                payload: mockPayload
            });

            const expected = {
                routes: mockPayload,
                selectedRoute: null,
                routesLoading: false,
                routesError: null
            };

            expect(newState).toStrictEqual(expected);
        });

        test("Type LOAD_ROUTES_ERROR", () => {
            const newState = routeReducer(initNewState, {
                type: "LOAD_ROUTES_ERROR",
                payload: mockPayload
            });

            const expected = {
                routes: [],
                selectedRoute: null,
                routesLoading: false,
                routesError: mockPayload
            };

            expect(newState).toStrictEqual(expected);
        });

    });
});

import {routeReducer} from "../RouteReducer";
import "@testing-library/jest-dom";
import { uploadRoute } from "../../actions/RouteActions";

describe("Routes Reducer", () => {

    const route0 = { id: 0, name: "Hiking Naranco ", author: "César", positions: [[43.360383711, -5.850650009],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]], description: "A beautiful landscape for a beautiful country like Spain. Vegetation is incredible, wildlife is amazing", images: ["https://source.unsplash.com/random/600x600", "https://source.unsplash.com/random/602x602"], videos: ["futuro video 1", "futuro video 2"], sharedWith: [] };
    const route1 = { id: 1, name: "Hiking Ruta de las Xanas", author: "Marcos", positions: [[43.360383711, -5.850],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]], description: "", images: [], videos: [], sharedWith: [] };
    const route2 = { id: 2, name: "Senda del Oso", author: "César", positions: [[43.360383711, -5.850650009],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]], description: "", images: [], videos: [], sharedWith: [] };
    const route3 = { id: 3, name: "Hiking Naranco", author: "César", positions: [[43.360383711, -5.850650009],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]], description: "", images: [], videos: [], sharedWith: [] };
    const route4 = { id: 4, name: "Senda del Oso", author: "César", positions: [[43.360383711, -5.850650009],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]], description: "", images: [], videos: [], sharedWith: [] };

    const routes = [
        route0,
        route1,
        route2,
        route3,
        route4,
    ];

    const initState = {
        routes : routes,
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
        const route = { id: 5, name: "Hiking Naranco ", author: "César", positions: [[43.360383711, -5.850650009],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]], description: "A beautiful landscape for a beautiful country like Spain. Vegetation is incredible, wildlife is amazing", images: ["https://source.unsplash.com/random/600x600", "https://source.unsplash.com/random/602x602"], videos: ["futuro video 1", "futuro video 2"], sharedWith: [] };

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
            let route = { id: 0, name: "Hiking Naranco ", author: "César", positions: [[43.360383711, -5.850650009],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]], description: "A beautiful landscape for a beautiful country like Spain. Vegetation is incredible, wildlife is amazing", images: ["https://source.unsplash.com/random/600x600", "https://source.unsplash.com/random/602x602"], videos: ["futuro video 1", "futuro video 2"], sharedWith: [] };
            const newState = routeReducer(initState, {
                type : "SHARE_ROUTE",
                payload: { route, friends: ["marcos"]}
            });
            const routes = [
                { id: 0, name: "Hiking Naranco ", author: "César", positions: [[43.360383711, -5.850650009],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]], description: "A beautiful landscape for a beautiful country like Spain. Vegetation is incredible, wildlife is amazing", images: ["https://source.unsplash.com/random/600x600", "https://source.unsplash.com/random/602x602"], videos: ["futuro video 1", "futuro video 2"], sharedWith: ["marcos"] },
                { id: 1, name: "Hiking Ruta de las Xanas", author: "Marcos", positions: [[43.360383711, -5.850],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]], description: "", images: [], videos: [], sharedWith: [] },
                { id: 2, name: "Senda del Oso", author: "César", positions: [[43.360383711, -5.850650009],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]], description: "", images: [], videos: [], sharedWith: [] },
                { id: 3, name: "Hiking Naranco", author: "César", positions: [[43.360383711, -5.850650009],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]], description: "", images: [], videos: [], sharedWith: [] },
                { id: 4, name: "Senda del Oso", author: "César", positions: [[43.360383711, -5.850650009],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]], description: "", images: [], videos: [], sharedWith: [] },
            ];

            expect(newState).toEqual(initState);
        });

        test("Type UNSHARE_ROUTE", () => {
            let mockRoute = { id: 0, name: "Hiking Naranco ", author: "César", positions: [[43.360383711, -5.850650009],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]], description: "A beautiful landscape for a beautiful country like Spain. Vegetation is incredible, wildlife is amazing", images: ["https://source.unsplash.com/random/600x600", "https://source.unsplash.com/random/602x602"], videos: ["futuro video 1", "futuro video 2"], sharedWith: [] };
            const mockAuthorWebId = "https://elbicho.solid.community/profile/card#me";
            const newState = routeReducer(initState, {
                type : "UNSHARE_ROUTE",
                payload: { routeId: mockRoute.id, authorWebId: mockAuthorWebId, userWebId: mockAuthorWebId}
            });
            const routes = [
                { id: 1, name: "Hiking Ruta de las Xanas", author: "Marcos", positions: [[43.360383711, -5.850],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]], description: "", images: [], videos: [], sharedWith: [] },
                { id: 2, name: "Senda del Oso", author: "César", positions: [[43.360383711, -5.850650009],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]], description: "", images: [], videos: [], sharedWith: [] },
                { id: 3, name: "Hiking Naranco", author: "César", positions: [[43.360383711, -5.850650009],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]], description: "", images: [], videos: [], sharedWith: [] },
                { id: 4, name: "Senda del Oso", author: "César", positions: [[43.360383711, -5.850650009],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]], description: "", images: [], videos: [], sharedWith: [] },
            ];
            expect(newState.routes).toEqual(routes);

        });

        const mockPayload = "";

        test("Type LOAD_ROUTES_REQUEST", () => {
            const newState = routeReducer(initNewState, {
                type: "LOAD_ROUTES_REQUEST",
                payload: mockPayload
            })

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
            })

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

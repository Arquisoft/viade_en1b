import { testStore } from "../../../utils/index";
import {
  uploadRoute,
  showRoute,
  clearRoute,
  deleteRoute,
  shareRoute,
  loadRoutesRequest,
  loadRoutesSuccess,
  loadRoutesError
} from "../RouteActions";
import rootReducer from "../../reducers/RootReducer";
import { deepClone } from "../../../utils/functions";


describe("Route actions", () => {
  const uploadedRoute = {
    id: 0,
    name: "Hiking Naranco ",
    file: undefined,
    author: "César",
    positions: [
      [43.360383711, -5.850650009],
      [43.35763791, -5.842024025],
      [43.360976539, -5.831938919],
      [43.366405318, -5.837775406],
      [43.361382154, -5.844255623]
    ],
    description:
      "A beautiful landscape for a beautiful country like Spain. Vegetation is incredible, wildlife is amazing",
    images: [
      "https://source.unsplash.com/random/600x600",
      "https://source.unsplash.com/random/602x602"
    ],
    videos: ["futuro video 1", "futuro video 2"],
    sharedWith: []
  };
  const initState = {
    route: {
      routes: [],
      selectedRoute: null
    },
    auth: {},
    user: {}
  };

  const initNewState = {
    route: {
      routes: [],
      selectedRoute: null,
      routesLoading: false,
      routesError: null
    },
    auth: {},
    user: {}
  };

  test("show route action", () => {
    const expectedState = {
      routes: [],
      selectedRoute: uploadedRoute
    };
    const store = testStore(rootReducer, initState);

    store.dispatch(showRoute(uploadedRoute));
    const newState = store.getState().route;

    expect(newState).toStrictEqual(expectedState);
  });

  test("clear route action", () => {
    const expectedState = {
      routes: [],
      selectedRoute: null
    };

    const store = testStore(rootReducer, initState);

    store.dispatch(clearRoute());
    const newState = store.getState().route;

    expect(newState).toStrictEqual(expectedState);
  });

  test("upload route action", () => {
    const expectedState = {
      routes: [uploadedRoute],
      selectedRoute: null
    };
    const store = testStore(rootReducer, initState);

    store.dispatch(uploadRoute(uploadedRoute, initState.route.routes));
    const newState = store.getState().route;

    expect(newState).toStrictEqual(expectedState);
  });

  test("share route action", () => {
    let routesReducerState = {
      routes: [{
        id: 0,
        name: "Hiking Naranco ",
        file: undefined,
        author: "César",
        positions: [
          [43.360383711, -5.850650009],
          [43.35763791, -5.842024025],
          [43.360976539, -5.831938919],
          [43.366405318, -5.837775406],
          [43.361382154, -5.844255623]
        ],
        description:
          "A beautiful landscape for a beautiful country like Spain. Vegetation is incredible, wildlife is amazing",
        images: [
          "https://source.unsplash.com/random/600x600",
          "https://source.unsplash.com/random/602x602"
        ],
        videos: ["futuro video 1", "futuro video 2"],
        sharedWith: []
      }],
      selectedRoute: null
    };

    let initialState = {
      route: routesReducerState,
      auth: {},
      user: {}
    };

    const mockFriends = ['marcos'];

    let stateRoutes = deepClone(initialState.route.routes);
    let sharedRouteId = uploadedRoute.id;

    let alreadyShared = stateRoutes.filter(
      route => route.id == uploadedRoute.id
    )[0].sharedWith;
    let sharedRoute = {
      ...uploadedRoute,
      sharedWith: mockFriends.concat(alreadyShared)
    };
    let newRoutes = stateRoutes;
    newRoutes[sharedRouteId] = sharedRoute;

    routesReducerState = {...routesReducerState, routes:newRoutes};
    const expected = {...initialState, route:routesReducerState};

    const store = testStore(rootReducer, initialState);
    store.dispatch(shareRoute(uploadedRoute, mockFriends));
    const newState = store.getState();

    expect(newState).toStrictEqual(expected);
  });

  test("delete route action", () => {
    const expectedState = {
      routes: [],
      selectedRoute: null
    };
    const store = testStore(rootReducer, initState);

    store.dispatch(deleteRoute(uploadedRoute));
    const newState = store.getState().route;

    expect(newState).toStrictEqual(expectedState);
  });

  const mockPayload = "";

  test("load routes request action", () => {
    const expected = {
      routes: [],
      selectedRoute: null,
      routesLoading: true,
      routesError: null
    };

    const store = testStore(rootReducer, initNewState);
    store.dispatch(loadRoutesRequest());

    const newState = store.getState().route;

    expect(newState).toStrictEqual(expected);
  });

  test("load routes success action", () => {
    const expected = {
      routes: mockPayload,
      selectedRoute: null,
      routesLoading: false,
      routesError: null
    };

    const store = testStore(rootReducer, initNewState);

    store.dispatch(loadRoutesSuccess(mockPayload));
    const newState = store.getState().route;

    expect(newState).toStrictEqual(expected);
  });

  test("load routes error action", () => {
    const expected = {
      routes: [],
      selectedRoute: null,
      routesLoading: false,
      routesError: mockPayload
    };

    const store = testStore(rootReducer, initNewState);

    store.dispatch(loadRoutesError(mockPayload));
    const newState = store.getState().route;

    expect(newState).toStrictEqual(expected);
  });
});

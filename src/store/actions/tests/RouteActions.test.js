import { testStore } from "../../../utils/index";
import {
  uploadRoute,
  showRoute,
  clearRoute,
  deleteRoute,
  shareRoute,
  loadRoutesRequest,
  loadRoutesSuccess,
  loadRoutesError,
  unshareRoute
} from "../RouteActions";
import rootReducer from "../../reducers/RootReducer";


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
    user: {},
    localeReducer: {},
  };

  const initNewState = {
    route: {
      routes: [],
      selectedRoute: null,
      routesLoading: false,
      routesError: null
    },
    auth: {},
    user: {},
    localeReducer: {},
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
    const store = testStore(rootReducer, initState);

    store.dispatch(uploadRoute(uploadedRoute, initState.route.routes, "https://themrcesi.inrupt.net/profile/card#me"));
    const newState = store.getState().route;

    expect(newState).toStrictEqual(initState.route);
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
      user: {},
      control: {},
      localeReducer: {},
    };

    const mockFriends = ["marcos"];

    const store = testStore(rootReducer, initialState);
    store.dispatch(shareRoute(uploadedRoute, mockFriends));
    const newState = store.getState().route;

    expect(newState).toEqual(routesReducerState);
  });

  test("unshare action", () => {
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
      user: {},
      control: {},
      localeReducer: {},
    };
    const store = testStore(rootReducer, initialState);
    const mockAuthorWebId = "https://themrcesi.inrupt.net/profile/card#me";
    const mockRouteId = 0;
    store.dispatch(unshareRoute(mockAuthorWebId, mockRouteId, mockAuthorWebId));
    const newRoutes = initialState.route.routes.filter((r) => r.id !== mockRouteId);
    expect(store.getState().route.routes).toEqual(newRoutes);
  });

  test("delete route action", () => {
    const expectedState = {
      routes: [],
      selectedRoute: null
    };
    const store = testStore(rootReducer, initState);

    store.dispatch(deleteRoute(uploadedRoute, "https://themrcesi.inrupt.net/profile/card#me"));
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

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
import { getRoute0 } from "../../../test/exampleRoutes";

const testingRoute = getRoute0();

describe("Route actions", () => {
  const uploadedRoute = testingRoute;
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
      routes: [testingRoute],
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
      routes: [testingRoute],
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

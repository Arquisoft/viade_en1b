export const deleteRoute = route => {
  return {
    type: "DELETE_ROUTE",
    payload: route
  };
};

export const shareRoute = (route, friends) => {
  return {
    type: "SHARE_ROUTE",
    payload: {
      route: route,
      friends: friends
    }
  };
};

export const showRoute = route => {
  return {
    type: "SHOW_ROUTE",
    payload: route
  };
};

export const clearRoute = () => {
  return {
    type: "CLEAR_ROUTE",
    payload: null
  };
};

export const uploadRoute = (route, routes, webId) => {
  return {
    type: "UPLOAD_ROUTE",
    payload: {
      route: route,
      routes: routes,
      webId: webId
    }
  };
};

export const loadRoutesRequest = () => {
  return {
    type: "LOAD_ROUTES_REQUEST",
    payload: true
  };
};

export const loadRoutesSuccess = routes => {
  return {
    type: "LOAD_ROUTES_SUCCESS",
    payload: routes
  };
};

export const loadRoutesError = error => {
  return {
    type: "LOAD_ROUTES_ERROR",
    payload: error
  };
};



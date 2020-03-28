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

export const uploadRoute = (route, routes) => {
  return {
    type: "UPLOAD_ROUTE",
    payload: {
      route: route,
      routes: routes
    }
  };
};

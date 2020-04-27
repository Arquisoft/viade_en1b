import {
  uploadRouteToPod /*shareRouteToPod*/,
  shareRouteToPod,
  clearRouteFromPod,
  getRoutesFolder,
  unshareRoute,
} from "../../solid/routes";
import { deepClone } from "../../utils/functions";
import { getWebId } from "../../solid/auth";

const initState = {
  routes: [],
  selectedRoute: null,
  routesLoading: false,
  routesError: null,
};

export const routeReducer = (state = initState, action) => {
  switch (action.type) {
    case "SHOW_ROUTE":
      return {
        ...state,
        selectedRoute: action.payload,
      };
    case "UPLOAD_ROUTE":
      console.log(action.payload.webId);
      const id = action.payload.webId;
      const route = action.payload.route;
      const sharedWith = route.sharedWith ? route.sharedWith : [];
      const comments = [route.comments];
      const newRoute = {
        name: route.name,
        description: route.description,
        author: id.split("//")[1].split(".")[0],
        positions: route.positions,
        images: route.images,
        videos: route.videos,
        sharedWith: sharedWith,
        comments: comments,
      };
      uploadRouteToPod(newRoute, action.payload.webId);
      //let previousRoutes = [...action.payload.routes];
      //previousRoutes.push(action.payload.route);
      return {
        ...state,
      };

    case "DELETE_ROUTE":
      clearRouteFromPod(action.payload.route.id, action.payload.uri);
      let routes = state.routes.filter((r) => r.id !== action.payload.route.id);
      return {
        ...state,
        routes: routes,
        selectedRoute: null,
      };
    case "CLEAR_ROUTE":
      return {
        ...state,
        selectedRoute: action.payload,
      };
    case "SHARE_ROUTE":
      let stateRoutes = deepClone(state.routes);
      let sharedRouteId = action.payload.route.id;
      let alreadyShared = stateRoutes.filter(
        (route) => route.id === action.payload.route.id
      )[0].sharedWith;
      let sharedRoute = {
        ...action.payload.route,
        sharedWith: action.payload.friends.concat(alreadyShared),
      };

      let newRoutes = stateRoutes;
      newRoutes[sharedRouteId] = sharedRoute;
      let friends = action.payload.friends;

      if (friends[0]) {
        getWebId().then((userWebID) => {
          friends.forEach((friend) => {
            shareRouteToPod(
              userWebID,
              getRoutesFolder(userWebID) + action.payload.route.id + ".jsonld",
              friend.uri,
              userWebID.split("//")[1].split(".")[0],
              friend.name,
              sharedRouteId
            );
          });
        });
      }
      //console.log(newRoutes);
      return { ...state, routes: newRoutes };
    case "UNSHARE_ROUTE":
      unshareRoute(
        action.payload.authorWebId,
        action.payload.routeId,
        action.payload.userWebId
      );
      let anotherNewRoutes = state.routes.filter(
        (r) => r.id !== action.payload.routeId
      );
      return {
        ...state,
        routes: anotherNewRoutes,
        selectedRoute: null,
      };
    case "LOAD_ROUTES_REQUEST":
      return {
        ...state,
        routesLoading: action.payload,
      };
    case "LOAD_ROUTES_SUCCESS":
      return {
        ...state,
        routes: action.payload,
        routesLoading: false,
      };
    case "LOAD_ROUTES_ERROR":
      return {
        ...state,
        routesError: action.payload,
      };
    default:
      return state;
  }
};
export default routeReducer;

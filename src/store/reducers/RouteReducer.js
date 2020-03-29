import { uploadRouteToPod, shareRouteToPod } from "../../solid/routes";
import { deepClone } from "../../utils/functions";

const initState = {
  routes: [],
  selectedRoute: null,
  routesLoading: false,
  routesError: null
};

export const routeReducer = (state = initState, action) => {
  switch (action.type) {
    case "SHOW_ROUTE":
      return {
        ...state,
        selectedRoute: action.payload
      };
    case "UPLOAD_ROUTE":
      const id = action.payload.webId;
      const route = action.payload.route;
      const sharedWith= route.sharedWith ? route.sharedWith : [];
      const newRoute = {
        name: route.name,
        description: route.description,
        author: id.split("//")[1].split(".")[0],
        positions: route.positions,
        images: route.images,
        videos: route.videos,
        sharedWith: sharedWith
      };
      uploadRouteToPod(newRoute, action.payload.webId);
      //let previousRoutes = [...action.payload.routes];
      //previousRoutes.push(action.payload.route);
      return {
        ...state
      };

    case "DELETE_ROUTE":
      let routes = state.routes.filter(r => r.id !== action.payload.id);
      return {
        ...state,
        routes: routes,
        selectedRoute: null
      };
    case "CLEAR_ROUTE":
      return {
        ...state,
        selectedRoute: action.payload
      };
    case "SHARE_ROUTE":
      let stateRoutes = deepClone(state.routes);
      let sharedRouteId = action.payload.route.id;

      let alreadyShared = stateRoutes.filter(
        route => route.id === action.payload.route.id
      )[0].sharedWith;
      console.log(alreadyShared);
      let sharedRoute = {
        ...action.payload.route,
        sharedWith: action.payload.friends.concat(alreadyShared)
      };
      let newRoutes = stateRoutes;
      newRoutes[sharedRouteId] = sharedRoute;

      if (action.payload.friends[0]) {
        shareRouteToPod(action.payload.route, action.payload.friends[0].uri);
        console.log("se comparte");
      }

      return { ...state, routes: newRoutes };
    case "LOAD_ROUTES_REQUEST":
      return {
        ...state,
        routesLoading: action.payload
      }
    case "LOAD_ROUTES_SUCCESS":
      return {
        ...state,
        routes: action.payload,
        routesLoading: false
      }
    case "LOAD_ROUTES_ERROR":
      return {
        ...state,
        routesError: action.payload
      }
    default:
      return state;
  }
};
export default routeReducer;

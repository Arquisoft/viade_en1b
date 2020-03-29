import { uploadRouteToPod, shareRouteToPod } from "../../solid/routes";
import { deepClone } from "../../utils/functions";

export const initState = {
  routes: [
    {
      id: 0,
      name: "Hiking Naranco ",
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
    },
    {
      id: 1,
      name: "Hiking Ruta de las Xanas",
      author: "Marcos",
      positions: [
        [43.360383711, -5.85],
        [43.35763791, -5.842024025],
        [43.360976539, -5.831938919],
        [43.366405318, -5.837775406],
        [43.361382154, -5.844255623]
      ],
      description: "",
      images: [],
      videos: [],
      sharedWith: []
    },
    {
      id: 2,
      name: "Senda del Oso",
      author: "César",
      positions: [
        [43.360383711, -5.850650009],
        [43.35763791, -5.842024025],
        [43.360976539, -5.831938919],
        [43.366405318, -5.837775406],
        [43.361382154, -5.844255623]
      ],
      description: "",
      images: [],
      videos: [],
      sharedWith: []
    },
    {
      id: 3,
      name: "Hiking Naranco",
      author: "César",
      positions: [
        [43.360383711, -5.850650009],
        [43.35763791, -5.842024025],
        [43.360976539, -5.831938919],
        [43.366405318, -5.837775406],
        [43.361382154, -5.844255623]
      ],
      description: "",
      images: [],
      videos: [],
      sharedWith: []
    },
    {
      id: 4,
      name: "Senda del Oso",
      author: "César",
      positions: [
        [43.360383711, -5.850650009],
        [43.35763791, -5.842024025],
        [43.360976539, -5.831938919],
        [43.366405318, -5.837775406],
        [43.361382154, -5.844255623]
      ],
      description: "",
      images: [],
      videos: [],
      sharedWith: []
    }
  ],
  selectedRoute: null
};

export const routeReducer = (state = initState, action) => {
  switch (action.type) {
    case "SHOW_ROUTE":
      return {
        ...state,
        selectedRoute: action.payload
      };
    case "UPLOAD_ROUTE":
      const route = action.payload.route;
      const newRoute = {
        id: Object.keys(action.payload.routes).length,
        name: route.name,
        description: route.description,
        author: route.author,
        positions: route.positions,
        images: route.images,
        videos: route.videos
      };
      console.log("prueba");
      uploadRouteToPod(newRoute, action.payload.webId);
      let previousRoutes = [...action.payload.routes];
      previousRoutes.push(action.payload.route);
      return {
        ...state,
        routes: previousRoutes
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
        route => route.id == action.payload.route.id
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
    default:
      return state;
  }
};
export default routeReducer;

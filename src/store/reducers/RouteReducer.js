import { uploadRouteToPod } from "../../solid/routes";

const initState = {
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
      videos: ["futuro video 1", "futuro video 2"]
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
      videos: []
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
      videos: []
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
      videos: []
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
      videos: []
    }
  ],
  selectedRoute: null
};

const routeReducer = (state = initState, action) => {
  switch (action.type) {
    case "SHOW_ROUTE":
      return {
        ...state,
        selectedRoute: action.payload
      };
    case "UPLOAD_ROUTE":
      const route = action.payload;
      const newRoute = {
        id: Object.keys(action.payload.routes).length,
        name: route.name,
        description: route.description,
        author: route.author,
        positions: route.positions,
        file: route.file,
        images: route.images,
        videos: route.videos
      };
      uploadRouteToPod(newRoute);
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
      return { ...state };
    default:
      return state;
  }
};
export default routeReducer;

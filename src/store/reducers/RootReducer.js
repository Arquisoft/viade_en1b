import { combineReducers } from "redux";
import authReducer from "./AuthReducer";
import routeReducer from "./RouteReducer";
import userReducer from "./UserReducer";
import loadReducer from "./LoadReducer";
const rootReducer = combineReducers({
  auth: authReducer,
  route: routeReducer,
  user: userReducer,
  control: loadReducer
});

export default rootReducer;

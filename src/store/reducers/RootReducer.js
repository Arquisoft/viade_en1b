import { combineReducers } from "redux";
import authReducer from "./AuthReducer";
import routeReducer from "./RouteReducer";
import userReducer from "./UserReducer";
const rootReducer = combineReducers({
  auth: authReducer,
  route: routeReducer,
  user: userReducer
});

export default rootReducer;

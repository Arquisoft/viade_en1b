import { combineReducers } from "redux";
import authReducer from "./AuthReducer";
import routeReducer from "./RouteReducer";
import userReducer from "./UserReducer";
import loadReducer from "./LoadReducer";
import localeReducer from "./LocaleReducer"
const rootReducer = combineReducers({
  auth: authReducer,
  route: routeReducer,
  user: userReducer,
  control: loadReducer,
  localeReducer: localeReducer
});

export default rootReducer;

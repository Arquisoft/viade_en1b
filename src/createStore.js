import { createStore, applyMiddleware } from "redux";
import rootReducer from "./store/reducers/RootReducer";
import thunk from "redux-thunk";


export const middlewares = [thunk];

export const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

export const store = createStoreWithMiddleware(rootReducer);
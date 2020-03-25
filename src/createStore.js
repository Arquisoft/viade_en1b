import { createStore, applyMiddleware } from "redux";
import rootReducer from "./store/reducers/RootReducer";
import thunk from "redux-thunk";
import { myLogger, asyncRouteFetch } from "./middlewares/middlewares";

export const middlewares = [thunk, myLogger, asyncRouteFetch];

export const createStoreWithMiddleware = applyMiddleware(...middlewares)(
  createStore
);

export const store = createStoreWithMiddleware(rootReducer);

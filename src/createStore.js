import { createStore, applyMiddleware } from "redux";
import rootReducer from "./store/reducers/RootReducer";
import thunk from "redux-thunk";
import {
  myLogger,
  asyncRouteFetch,
  asyncProfileFetch,
} from "./middlewares/middlewares";

export const middlewares = [
  thunk,
  myLogger,
  asyncRouteFetch,
  asyncProfileFetch,
];

export const middlewaresForTesting = [
  thunk,
  asyncRouteFetch,
  asyncProfileFetch,
];

export const createStoreWithMiddleware = applyMiddleware(...middlewares)(
  createStore
);

export const store = createStoreWithMiddleware(rootReducer);

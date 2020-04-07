import { applyMiddleware, createStore } from "redux";
import { middlewares } from "../createStore";

export const testStore = (reducer, initialState) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(
    createStore
  );
  return createStoreWithMiddleware(reducer, initialState);
};

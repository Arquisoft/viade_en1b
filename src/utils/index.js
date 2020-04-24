import { applyMiddleware, createStore, combineReducers } from "redux";
import { middlewaresForTesting } from "../createStore";

export const testStore = (reducer, initialState) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewaresForTesting)(
    createStore
  );
  return createStoreWithMiddleware(reducer, initialState);
};

export const testStoreMultiple = (routeReducer, authReducer, initialState) => {
  const rootReducer = combineReducers({
    route: routeReducer,
    auth: authReducer,
  });
  return testStore(rootReducer, initialState);
};

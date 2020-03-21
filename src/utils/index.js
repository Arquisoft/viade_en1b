import { applyMiddleware, createStore } from "redux"
import { middlewares } from "../createStore"
import rootReducer from "../store/reducers/RootReducer";

export const testStore = (initialState) => {
    const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
    return createStoreWithMiddleware(rootReducer);
};
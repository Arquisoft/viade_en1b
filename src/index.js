import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import {
  ThemeContext,
  themes
} from "./components/layout/themeContext/ThemeContext";
import { store } from "./createStore";

const myLogger = store => next => action => {
  console.group(action.type);
  console.log("previous state", store.getState());
  next(action);
  console.log("actual state", store.getState());
  console.groupEnd();
};

const store = createStore(rootReducer, applyMiddleware(thunk, myLogger));

ReactDOM.render(
  <ThemeContext.Provider value={themes.purple}>
    <Provider store={myStore}>
      <App />
    </Provider>
  </ThemeContext.Provider>,
  document.getElementById("root")
);

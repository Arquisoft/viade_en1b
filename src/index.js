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

const myStore = store;

ReactDOM.render(
  <ThemeContext.Provider value={themes.purple}>
    <Provider store={myStore}>
      <App />
    </Provider>
  </ThemeContext.Provider>,
  document.getElementById("root")
);

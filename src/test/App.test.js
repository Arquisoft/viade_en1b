import { render, queryByTestId } from "@testing-library/react";
import App from "../App.js";
import React from "react";
import { locales } from "../utils/locales";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import { testStore } from "../utils";
import rootReducer from "..//store/reducers/RootReducer";

let wrapper;
const state = {
  route: {},
  auth: {},
  user: {},
  control: {},
  localeReducer: {},
};
beforeEach(() => {
  const store = testStore(rootReducer, state);
  const { container } = render(
    <Provider store={store}>
      <IntlProvider key={"en"} locale={"en"} messages={locales["en"]}>
        <App />
      </IntlProvider>
    </Provider>
  );
  wrapper = container;
});

describe("App Component", () => {
  test("Component renders correctly", () => {
    expect(queryByTestId(wrapper, "theApp")).not.toBeNull();
    expect(queryByTestId(wrapper, "theNavBar")).toBeNull();
  });
});

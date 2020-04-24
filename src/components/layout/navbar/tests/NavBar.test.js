import React from "react";
import {
  render,
  waitForElement,
  fireEvent,
  queryByTestId,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "../NavBar";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { testStore } from "../../../../utils";
import rootReducer from "../../../../store/reducers/RootReducer";
import { locales } from "../../../../utils/locales"
import { IntlProvider } from "react-intl";
let rendered = null;
const state = {
  route: {},
  auth: {},
  user: {},
  control: {},
  localeReducer:{},
};
const getCurrentPage = () => {
  let currentPage = window.location.href;
  currentPage = currentPage.split("/");
  currentPage = currentPage[currentPage.length - 1];
  return currentPage;
};
beforeEach(() => {
  const store = testStore(rootReducer, state);
  const { container } = render(
    <Provider store={store}>
      <IntlProvider key={"en"} locale={"en"} messages={locales["en"]}>
      <HashRouter>
        <Navbar></Navbar>
      </HashRouter>
      </IntlProvider>
    </Provider>
  );
  rendered = container;
});

describe("Navbar is correctly rendered", () => {
  test("all buttons are rendered", () => {
    waitForElement(() => {
      expect(queryByTestId(rendered, "navbar-my-routes")).not.toBeNull();
      expect(queryByTestId(rendered, "navbar-upload-route")).not.toBeNull();
      expect(queryByTestId(rendered, "navbar-my-profile")).not.toBeNull();
      expect(queryByTestId(rendered, "navbar-logout")).not.toBeNull();
      expect(queryByTestId(rendered, "navbar-brand")).not.toBeNull();
      expect(queryByTestId(rendered, "navbar-settingsks")).not.toBeNull();
      expect(queryByTestId(rendered, "navbar-dashboard")).not.toBeNull();
    });
  });

  test("redirections work", () => {
    waitForElement(() => {
      let routes = queryByTestId(rendered, "navbar-my-routes");
      let upload = queryByTestId(rendered, "navbar-upload-route");
      let profile = queryByTestId(rendered, "navbar-my-profile");
      let brand = queryByTestId(rendered, "navbar-brand");
      let logout = queryByTestId(rendered, "navbar-logout");
      let settings = queryByTestId(rendered, "navbar-settings");
      let dashboard = queryByTestId(rendered, "navbar-dashboard");

      fireEvent.click(routes);
      expect(getCurrentPage()).toEqual("routes");

      fireEvent.click(upload);
      expect(getCurrentPage()).toEqual("upload");

      fireEvent.click(profile);
      expect(getCurrentPage()).toEqual("profile");

      fireEvent.click(brand);
      expect(getCurrentPage()).toEqual("dashboard");

      fireEvent.click(logout);
      expect(getCurrentPage()).toEqual("");

      fireEvent.click(settings);
      expect(getCurrentPage()).toEqual("settings");

      fireEvent.click(dashboard);
      expect(getCurrentPage()).toEqual("dashboard");
    });
  });
});



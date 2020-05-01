import { render, waitForElement,  } from "@testing-library/react";
import "@testing-library/jest-dom";
import {queryByTestId} from "@testing-library/dom";
import React from "react";
import Dashboard from "../Dashboard";
import { testStore } from "../../../utils";
import rootReducer from "../../../store/reducers/RootReducer";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import { locales } from "../../../utils/locales";
import { IntlProvider } from "react-intl";
describe("Dashboard Component", () => {
  let wrapper;
  const mockFn = jest.fn();
  beforeEach(() => {
    const initState = {
      route: {},
      auth: {},
      user: {},
      control: {},
    };
    const store = testStore(rootReducer, initState);
    const { container } = render(
      <Provider store={store}>
        <IntlProvider key={"en"} locale={"en"} messages={locales["en"]}>
          <HashRouter>
            <Dashboard
              routes={[]}
              selectedRoute={""}
              showRoute={() => mockFn}
            ></Dashboard>
          </HashRouter>
        </IntlProvider>
      </Provider>
    );
    wrapper = container;
  });

  test("renders correctly", () => {
    waitForElement(() => {
      expect(queryByTestId(wrapper, "dashboard-container")).not.toBeNull();
    });
  });
});

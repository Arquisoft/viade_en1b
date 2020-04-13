import {
    render,
    waitForElement
  } from "@testing-library/react";
  import "@testing-library/jest-dom";
import React from "react";
import Dashboard from "../Dashboard";
import { testStore } from "../../../utils";
import rootReducer from "../../../store/reducers/RootReducer";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";

describe("Dashboard Component", () => {

    let wrapper;
    const mockFn = jest.fn();
    beforeEach(() => {
        const initState = {
            route: {},
            auth: {},
            user: {},
            control: {}
          };
        const store = testStore(rootReducer, initState);
        const {container} = render(<Provider store={store}>
            <HashRouter>
                <Dashboard routes ={[]} selectedRoute={""} showRoute={() => mockFn}></Dashboard>
            </HashRouter>
        </Provider>);
        wrapper = container;
    });

    test("renders correctly", () => {
        waitForElement(() => {
            expect(queryByTestId(wrapper, "dashboard-container")).not.toBeNull();
        });
    });
});
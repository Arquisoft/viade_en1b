import React from "react";
import {render} from "@testing-library/react";
import {queryByTestId} from "@testing-library/dom";
import "@testing-library/jest-dom";
import { RouteList } from "../RouteList";
import { locales } from "../../../../utils/locales";
import { IntlProvider } from "react-intl";

import { getRoute0 } from "../../../../test/exampleRoutes";

describe("The components are rendered correctly", () => {
  describe("Component renders", () => {
    let wrapper;
    const mockRoute = getRoute0();
    const mockFunc = jest.fn();
    beforeEach(() => {
      const props = {
        key: mockRoute.id,
        routes: [{ mockRoute }],
        onClick: mockFunc,
      };
      const { container, rerender } = render(
        <IntlProvider key={"en"} locale={"en"} messages={locales["en"]}>
          <RouteList {...props}></RouteList>
        </IntlProvider>
      );
      wrapper = container;
    });

    describe("Components are rendered", () => {
      test("routes render", () => {
        expect(wrapper.routes).not.toBeNull();
      });
      test("summaries render", () => {
        expect(wrapper.summaries).not.toBeNull();
      });
      test("Div renders", () => {
        expect(queryByTestId(wrapper, "route-list-div")).not.toBeNull();
      });
    });
  });
});

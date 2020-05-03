import React from "react";
import { render, fireEvent } from "@testing-library/react";
import {queryByTestId} from "@testing-library/dom";
import "@testing-library/jest-dom";
import { RouteSummary } from "../RouteSummary";
import { locales } from "../../../../utils/locales";
import { IntlProvider } from "react-intl";
import { getRoute0 } from "../../../../test/exampleRoutes";

describe("RouteSummary Component", () => {
  describe("Component Renders", () => {
    let wrapper;
    const mockRoute = getRoute0();
    const mockFunc = jest.fn();
    beforeEach(() => {
      const props = {
        key: mockRoute.id,
        route: mockRoute,
        onClickHandle: mockFunc,
      };
      const { container, rerender } = render(
        <IntlProvider key={"en"} locale={"en"} messages={locales["en"]}>
          <RouteSummary {...props}></RouteSummary>
        </IntlProvider>
      );
      wrapper = container;
    });

    describe("Should renders without error", () => {
      test("card is rendered correctly", () => {
        expect(queryByTestId(wrapper, "route-summary-card")).not.toBeNull();
      });
      test("title is rendered correctly", () => {
        expect(queryByTestId(wrapper, "route-summary-title")).not.toBeNull();
      });
      test("subtitle is rendered correctly", () => {
        expect(queryByTestId(wrapper, "route-summary-subtitle")).not.toBeNull();
      });
    });

    test("Function should be called", () => {
      let card = queryByTestId(wrapper, "route-summary-card");
      fireEvent.click(card);
      expect(mockFunc).toBeCalled();
    });
  });
});

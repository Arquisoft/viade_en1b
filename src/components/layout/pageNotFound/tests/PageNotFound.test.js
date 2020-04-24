import React from "react";
import { render, queryByTestId } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PageNotFound } from "../PageNotFound";
import { locales } from "../../../../utils/locales";
import { IntlProvider } from "react-intl";

describe("PageNotFound Component", () => {
  describe("Component renders", () => {
    let wrapper;
    beforeEach(() => {
      const { container, rerenders } = render(
        <IntlProvider key={"en"} locale={"en"} messages={locales["en"]}>
          <PageNotFound />
        </IntlProvider>
      );
      wrapper = container;
    });

    test("Renders without errors", () => {
      expect(queryByTestId(wrapper, "page-not-found-container")).not.toBeNull();
    });
  });
});

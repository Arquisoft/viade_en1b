import { render, waitForElement, queryByTestId } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { Footer } from "../Footer";
import { locales } from "../../../../utils/locales";
import { IntlProvider } from "react-intl";

describe("Footer component", () => {
  let wrapper;
  beforeEach(() => {
    const { container } = render(
      <IntlProvider key={"en"} locale={"en"} messages={locales["en"]}>
        <Footer></Footer>
      </IntlProvider>
    );
    console.log(container);
    wrapper = container;
  });

  describe("renders correctly", () => {
    test("footer", () => {
      waitForElement(() => {
        expect(queryByTestId(wrapper, "footer")).toBeNull();
      });
    });

    test("team", () => {
      waitForElement(() => {
        expect(queryByTestId(wrapper, "footer-team")).toBeNull();
      });
    });

    test("github", () => {
      waitForElement(() => {
        expect(queryByTestId(wrapper, "footer-github")).not.toBeNull();
      });
    });

    test("react", () => {
      waitForElement(() => {
        expect(queryByTestId(wrapper, "footer-react")).not.toBeNull();
      });
    });
  });
});

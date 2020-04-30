import { render, waitForElement, queryByTestId } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import  {Comments} from "../Comments";
import { locales } from "../../../../utils/locales";
import { IntlProvider } from "react-intl";


describe("Comments component", () => {
    let wrapper;
    beforeEach(() => {
        const { container } = render(
            <IntlProvider key={"en"} locale={"en"} messages={locales["en"]}>
                <Comments userWebId='1'></Comments>
                </IntlProvider>
        );
        wrapper = container;
    });

    describe("renders correctly", () => {
        test("comments general", () => {
            waitForElement(() => {
                expect(queryByTestId(wrapper, "general-component")).not.toBeNull();
            });
        });

        test("comments modal", () => {
            waitForElement(() => {
                expect(queryByTestId(wrapper, "Modal-component")).not.toBeNull();
            });
        });

        test("comment form", () => {
            waitForElement(() => {
                expect(queryByTestId(wrapper, "form-component")).not.toBeNull();
            });
        });

        test("comment text area", () => {
            waitForElement(() => {
                expect(queryByTestId(wrapper, "textarea-component")).not.toBeNull();
            });
        });

        test("comments button", () => {
            waitForElement(() => {
                expect(queryByTestId(wrapper, "Leave-Cooment-text")).not.toBeNull();
            });
        });

    });

});
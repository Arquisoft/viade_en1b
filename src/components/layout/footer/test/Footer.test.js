import {
    render,
    waitForElement
  } from "@testing-library/react";
  import "@testing-library/jest-dom";
import React from "react";
import {Footer} from "../Footer";

describe("Footer component", () => {

    let wrapper;
    beforeEach(() => {
        const {container} = render(<Footer></Footer>);
        console.log(container)
        wrapper = container;
    });

    describe("renders correctly", () => {

        test("footer", () => {
            waitForElement(() => {
                expect(queryByTestId(wrapper,"footer")).toBeNull();
            });
        });

        test("team", () => {
            waitForElement(() => {
                expect(queryByTestId(wrapper,"footer-team")).toBeNull();
            });
        });

        test("github", () => {
            waitForElement(() => {
                expect(queryByTestId(wrapper,"footer-github")).not.toBeNull();
            });
        });

        test("react", () => {
            waitForElement(() => {
                expect(queryByTestId(wrapper,"footer-react")).not.toBeNull();
            });
        });
    });
});
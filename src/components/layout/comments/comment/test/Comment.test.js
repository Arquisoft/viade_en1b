import { render, waitForElement, queryByTestId } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import  Comment from "../Comment";

describe("Comment component", () => {
    let wrapper;
    beforeEach(() => {
        const { container } = render(
                <Comment author="alvarogarinf" text="This is a test" date="2020-4-29"></Comment>
        );
        wrapper = container;
    });

    describe("renders correctly", () => {
        test("comment", () => {
            waitForElement(() => {
                expect(queryByTestId(wrapper, "comment")).not.toBeNull();
            });
        });

        test("date", () => {
            waitForElement(() => {
                expect(queryByTestId(wrapper, "date")).not.toBeNull();
            });
        });

        test("text", () => {
            waitForElement(() => {
                expect(queryByTestId(wrapper, "text")).not.toBeNull();
            });
        });

        test("text", () => {
            waitForElement(() => {
                expect(queryByTestId(wrapper, "text")).not.toBeNull();
            });
        });

    });

});
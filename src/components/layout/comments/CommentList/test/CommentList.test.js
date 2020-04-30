import { render, waitForElement, queryByTestId } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import  CommentList from "../CommentList";
import  Comment from "../../comment/Comment";


describe("CommentList component", () => {
    let wrapper;
    beforeEach(() => {
        const comment =  <Comment author="alvarogarinf" text="This is a test" date="2020-4-29"></Comment>;
        const { container } = render(
                <CommentList comments={[comment]}></CommentList>
        );
        wrapper = container;
    });

    describe("renders correctly", () => {
        test("comments", () => {
            waitForElement(() => {
                expect(queryByTestId(wrapper, "comments")).not.toBeNull();
            });
        });

    });

});
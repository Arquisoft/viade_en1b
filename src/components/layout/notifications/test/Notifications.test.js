import { Notifications } from "../Notifications";
import { queryByTestId, render, waitForElement } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";


describe("Notifications component", () => {

    let component;

    const mockUserWebId = "https://themrcesi.inrupt.net/profile/card#me";

    beforeEach(() => {
        const {container, rerender} = render(<Notifications userWebId = {mockUserWebId}></Notifications>);
        component = container;
    });

    describe("renders correctly", () => {
        
        test("div", () => {
            expect(queryByTestId(component, "notifications-div")).not.toBe(null);
        });

        test("list", () => {
            waitForElement(() => {
                expect(queryByTestId(component, "notifications-list")).not.toBe(null);
            });
        });

    });
});
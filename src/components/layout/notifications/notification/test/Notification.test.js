import { render, queryByTestId, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import {Notification} from "../Notification";

describe("Notification component", () => {

    const mockNot = {
        text: "Esto es una prueba"
    };

    let component;

    beforeEach(() => {
        const {container, rerender} = render(<Notification notification={mockNot}></Notification>);
        component = container;
    });

    describe("renders correctly", () => {
        test("card", () => {
            expect(component).not.toBe(null);
            expect(queryByTestId(component, "notification-card")).not.toBe(null);
        });
    });

    test("content", () => {
        waitForElement(() => {
            expect(queryByTestId(component, "notification-card-text").innerHTML).toBe(mockNot.text);
        });
    });
});
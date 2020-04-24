import { render, queryByTestId, queryAllByTestId } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { NotificationsList } from "../NotificationsList";

describe("NotificationsList component", () => {

    let component;

    let mockNot = [
        { text: "Notification 1" },
        { text: "Notification 2" },
        { text: "Notification 3" },
        { text: "Notification 4" },
    ];

    beforeEach(() => {
        const {container, rerender} = render(<NotificationsList notifications = {mockNot}></NotificationsList>);
        component = container;
    }); 

    describe("renders correctly", () => {
        test("div", () => {
            expect(component).not.toBe(null);
            expect(queryByTestId(component, "notification-list-div"));
        });

        test("list", () => {
            expect(queryByTestId(component, "notification-list-component")).not.toBe(null);
        });
    });

    test("correct number of notifications", () => {
        expect(queryAllByTestId(component, "notification-card").length).toBe(mockNot.length);
    });

});
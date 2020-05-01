import { render, queryByTestId, waitForElement, queryAllByTestId, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from 'react'
import { NotificationsList } from "../NotificationsList";
import { IntlProvider } from "react-intl";
import { locales } from "../../../../../utils/locales";

describe("Notifications list component", () => {

    const mockWebId = "http://piratillajudoka.inrupt.net/profile/card#me";
    const mockLoad = jest.fn();

    let component;

    beforeEach(() => {
        const { container, rerender } = render(<IntlProvider messages={locales["en"]} locale="en"><NotificationsList userWebId={mockWebId} loadRoutes={mockLoad}></NotificationsList></IntlProvider>);
        component = container;
    });

    describe("renders correctly", () => {
        test("div", () => {
            expect(component).not.toBeNull();
            expect(queryByTestId(component, "notificationslist-div")).not.toBeNull();
        });
        test("list", () => {
            expect(component).not.toBeNull();
            expect(queryByTestId(component, "notificationslist-divcomponent")).not.toBeNull();
        });
        test("button", () => {
            expect(component).not.toBeNull();
            waitForElement(() => {
                expect(queryByTestId(component, "notificationslist-button")).not.toBeNull();
            });
        });
    });

    test("notifications", () => {
        waitForElement(() => {
            expect(queryAllByTestId(component, "notification")).not.toBeNull();
        });
    });

    test("click", () => {
        waitForElement(() => {
            fireEvent.click(queryByTestId(component, "notificationslist-button"));
            expect(mockLoad).toBeCalled();
        });

    });
});
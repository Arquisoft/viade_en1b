import { render, queryByTestId, waitForElement, queryAllByTestId, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from 'react'
import {Notifications} from "../Notifications";
import { IntlProvider } from "react-intl";
import { locales } from "../../../../utils/locales";

describe("Notifications component", () => {

    let component;

    beforeAll(() => {
        const {container, rerender} = render(<IntlProvider messages={locales["en"]} locale="en"><Notifications></Notifications></IntlProvider>);
        component = container;
    });

    describe("renders correctly", () => {
        test("div", () => {
            expect(queryByTestId(component, "notifications-div")).not.toBeNull();
        });
        test("list", () => {
            waitForElement(() => {
                expect(queryByTestId(component, "notifications-list")).not.toBeNull();
            });
        });
    });
});
import React from 'react'
import { render, queryByTestId, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom'
import Footer from '../Footer';

describe("Footer component", () => {
    
    test("Team div renders correctly", () => {
        const wrapper = <Footer></Footer>;
        waitForElement(() => {
            expect(queryByTestId(wrapper, "footer-team")).not.toBeNull();
        });
    });

    test("div renders correctly", () => {
        const wrapper = <Footer></Footer>;
        waitForElement(() => {
            expect(queryByTestId(wrapper, "footer")).not.toBeNull();
        });
    });

    test("Github div renders correctly", () => {
        const wrapper = <Footer></Footer>;
        waitForElement(() => {
            expect(queryByTestId(wrapper, "footer-github")).not.toBeNull();
        });
    });

    test("React div renders correctly", () => {
        const wrapper = <Footer></Footer>;
        waitForElement(() => {
            expect(queryByTestId(wrapper, "footer-react")).not.toBeNull();
        });
    });

    test("icon github", () => {
        const wrapper = <Footer></Footer>;
        waitForElement(() => {
            expect(queryByTestId(wrapper, "icon-github")).not.toBeNull();
        });
    });

    test("icon react", () => {
        const wrapper = <Footer></Footer>;
        waitForElement(() => {
            expect(queryByTestId(wrapper, "icon-react")).not.toBeNull();
        });
    });
    
});
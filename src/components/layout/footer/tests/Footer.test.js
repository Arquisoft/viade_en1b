import React from 'react'
import { render, queryByTestId } from '@testing-library/react'
import '@testing-library/jest-dom'
import Footer from '../Footer';

let wrapper;
beforeEach(() => {
    const {container, rerender} = render(<Footer></Footer>);
    wrapper = container;
});

describe("Footer component", () => {
    
    test("Team div renders correctly", () => {
        expect(queryByTestId(wrapper, "footer-team")).not.toBeNull();
    });

    test("Github div renders correctly", () => {
        expect(queryByTestId(wrapper, "footer-github")).not.toBeNull();
    });

    test("React div renders correctly", () => {
        expect(queryByTestId(wrapper, "footer-react")).not.toBeNull();
    });
    
});
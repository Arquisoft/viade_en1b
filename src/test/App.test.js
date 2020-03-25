import { render, queryByTestId, fireEvent, waitForDomChange } from "@testing-library/react";
import App from "../App.js";
import React from "react";
import { useLoggedIn,  } from "@solid/react";

let wrapper;
let myMockTheme;
let myMockLanguage;
beforeEach(() => {
    
    const {container} = render(<App />);
    wrapper = container;
    
});

describe('App Component', () => {

    test('Component renders correctly', () => {
        expect(queryByTestId(wrapper, 'theApp')).not.toBeNull();
        expect(queryByTestId(wrapper, 'theNavBar')).toBeNull();
    });

   

});
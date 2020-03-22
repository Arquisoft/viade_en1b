import { render, queryByTestId, waitForElement } from "@testing-library/react";
import React from 'react'
import { myMap } from "../MyMap";

describe('MyMap Component', () => {

    let wrapper;
    beforeEach(() => {
        const props = {
            center: [[43.360976539, -5.831938919]],
            positions: []
        };
        wrapper = myMap(props.center, props.positions);
    });
    
    test('Component renders correctly', () => {
        waitForElement(() => {
            expect(queryByTestId(wrapper, 'mymap-container')).not.toBeNull();
            expect(queryByTestId(wrapper, 'mymap-map')).not.toBeNull();
            expect(queryByTestId(wrapper, 'mymap-tilelayer')).not.toBeNull();
            expect(queryByTestId(wrapper, 'mymap-polyline')).not.toBeNull();
        });
    });

});
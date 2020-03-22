import { render, queryByTestId, waitForElement } from "@testing-library/react";
import React from 'react'
import MyMap, { myMap } from "../MyMap";

describe('MyMap Component', () => {

    let wrapper;
    let wrapperb;
    beforeEach(() => {
        const props = {
            center: [[43.360976539, -5.831938919]],
            positions: []
        };
        wrapper = myMap(props.center, props.positions);
        wrapperb = <MyMap center={props.center} positions={props.positions}></MyMap>
    });
    
    test('Component renders correctly', () => {
        waitForElement(() => {
            expect(wrapperb.prop('positions')).not.toBeNull();
            expect(wrapperb.prop('center')).not.toBeNull();
            expect(queryByTestId(wrapper, 'mymap-container')).not.toBeNull();
            expect(queryByTestId(wrapper, 'mymap-map')).not.toBeNull();
            expect(queryByTestId(wrapper, 'mymap-tilelayer')).not.toBeNull();
            expect(queryByTestId(wrapper, 'mymap-polyline')).not.toBeNull();
        });
    });

});
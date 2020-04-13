import React from 'react'
import { render, queryByTestId } from '@testing-library/react'
import '@testing-library/jest-dom'
import { PageNotFound } from '../PageNotFound'


describe('PageNotFound Component', () => {

    describe('Component renders', () => {

        let wrapper;
        beforeEach(() => {
            const {container, rerenders} = render(<PageNotFound/>);
            wrapper = container;
        });

        test('Renders without errors', () => {
            expect(queryByTestId(wrapper, 'page-not-found-container')).not.toBeNull();
        });

    });
});
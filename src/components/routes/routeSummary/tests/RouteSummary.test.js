import React from 'react'
import { render, fireEvent, queryByTestId, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom'
import { RouteSummary } from '../RouteSummary'

describe('RouteSummary Component', () =>{

    describe('Component Renders', () => {
        
        let wrapper;
        const mockRoute = {id: 0, name: "Hiking Naranco ", author: "César", positions: [[43.360383711, -5.850650009],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]], description: 'A beautiful landscape for a beautiful country like Spain. Vegetation is incredible, wildlife is amazing', images: ["https://source.unsplash.com/random/600x600", "https://source.unsplash.com/random/602x602"], videos: ["futuro video 1", "futuro video 2"]};
        const mockFunc = jest.fn();
        beforeEach(() => {
            const props = {
                key: mockRoute.id,
                route: mockRoute,
                onClickHandle: mockFunc
            };
            const {container, rerender} = render(<RouteSummary {...props}></RouteSummary>);
            wrapper = container;
        })

        describe('Should renders without error', () => {
            test('card is rendered correctly', () => {
                expect(queryByTestId(wrapper, 'route-summary-card')).not.toBeNull();
            });
            test('title is rendered correctly', () => {
                expect(queryByTestId(wrapper, 'route-summary-title')).not.toBeNull();
            });
            test('subtitle is rendered correctly', () => {
                expect(queryByTestId(wrapper, 'route-summary-subtitle')).not.toBeNull();
            });
        })

        test('Function should be called', () => {
            let card = queryByTestId(wrapper, 'route-summary-card'); 
            fireEvent.click(card);
            expect(mockFunc).toBeCalled();
        })
    })



})
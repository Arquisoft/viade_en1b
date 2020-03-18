import React from 'react'
import { render, fireEvent, queryByTestId, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom'
import { RouteDetails } from '../RouteDetails'

const selectedRoute = { id: 0, name: "Hiking Naranco ", author: "César", positions: [[43.360383711, -5.850650009],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]], description: 'A beautiful landscape for a beautiful country like Spain. Vegetation is incredible, wildlife is amazing', images: ["https://source.unsplash.com/random/600x600", "https://source.unsplash.com/random/602x602"], videos: ["futuro video 1", "futuro video 2"] }
let routeDetails = null;
let rerenderFunc = () => {}
let mock = jest.fn()

beforeEach( () => {
    const { container, rerender } = render(<RouteDetails selectedRoute={selectedRoute}></RouteDetails>);
    routeDetails = container;
    rerenderFunc = rerender

})

describe('The component is rendered correctly', () => {
    test('all the information is rendered correctly', () => {
        expect(queryByTestId(routeDetails, 'route-details-description')).not.toBeNull();
        expect(queryByTestId(routeDetails, 'route-details-button-share')).not.toBeNull();
        expect(queryByTestId(routeDetails, 'route-details-button-delete')).not.toBeNull();
    });
});

describe('The buttons function the way they should', () => {
    test('delete button executes the function passed as a parameter', () => {
        let mock = jest.fn();
        let deleteButton = queryByTestId(routeDetails, 'route-details-button-delete'); 
        rerenderFunc(<RouteDetails deleteRoute={mock}></RouteDetails>);
        waitForElement(() => {
            fireEvent.click(deleteButton);
            expect(mock).toBeCalled();
        })
    })
})
import React from 'react'
import { render, fireEvent, queryByTestId, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom'
import { RouteList } from '../RouteList'

describe('The components are rendered correctly', () => {

    describe('Component renders', ()=>{
        let wrapper;
        const mockRoute= {id: 0, name: "Hiking Naranco ", author: "César", positions: [[43.360383711, -5.850650009],[43.35763791, -5.842024025],[43.360976539, -5.831938919],[43.366405318, -5.837775406],[43.361382154, -5.844255623]], description: 'A beautiful landscape for a beautiful country like Spain. Vegetation is incredible, wildlife is amazing', images: ["https://source.unsplash.com/random/600x600", "https://source.unsplash.com/random/602x602"], videos: ["futuro video 1", "futuro video 2"]};
        const mockFunc = jest.fn();
        beforeEach(()=>{
            const props = {
                key: mockRoute.id,
                routes: [{mockRoute}],
                onClick: mockFunc
            };
            const { container, rerender } = render(<RouteList {...props}></RouteList>);
            wrapper = container;
        })

    describe('Components are rendered', ()=>{
        test('routes render', ()=>{
            expect(wrapper.routes ).not.toBeNull();
        });
        test('summaries render', ()=>{
            expect(wrapper.summaries ).not.toBeNull();
        });
        test('Div renders',()=>{
            expect(queryByTestId(wrapper, 'route-list-div')).not.toBeNull();
        });
    })

})
})  


import React from 'react'
import { render, waitForElement, fireEvent, queryByTestId } from '@testing-library/react'
import '@testing-library/jest-dom'
import Slideshow from '../Slideshow'

const images = ['https://source.unsplash.com/random/200x200', 'https://source.unsplash.com/random/200x200']

let slideshowWithPictures = null
let slideshowNoPictures = null
beforeEach( () => {
    const { container } = render(<Slideshow images={images}></Slideshow>);
    const { secondContainer } = render(<Slideshow images={[]}></Slideshow>);
    slideshowWithPictures = container;
    slideshowNoPictures = secondContainer;
})


describe('The slideshow render correctly', () => {
    test('buttons are rendered when having some pictures to show', () => {
        waitForElement(() => {
            expect(queryByTestId(slideshowWithPictures, 'previous')).not.toBeNull();
            expect(queryByTestId(slideshowWithPictures, 'next')).not.toBeNull();
        });
    });

    test('buttons are not rendered when having no pictures to show', () => {
        waitForElement(() => {
            expect(queryByTestId(slideshowNoPictures, 'previous')).toBeNull();
            expect(queryByTestId(slideshowNoPictures, 'next')).toBeNull();
            
        });
    });

    test('images are rendered in the slideshow with pictures', () => {
        waitForElement(() => {
            expect(queryByTestId(slideshowWithPictures, 'current-image-slideshow')).not.toBeNull();
        });
    });

    test('images are not rendered in the slideshow with no pictures', () => {
        waitForElement(() => {
            expect(queryByTestId(slideshowNoPictures, 'current-image-slideshow')).toBeNull();
        });
    });

    test('buttons have the correct functionality', () => {
        waitForElement(() => {
            const nextButton = queryByTestId(slideshowWithPictures, 'next');
            const previousButton = queryByTestId(slideshowWithPictures, 'next');
            
            fireEvent.click(nextButton)
            expect(nextButton).toBeDisabled()

            fireEvent.click(previousButton)
            expect(previousButton).toBeDisabled();
        })
    });
});
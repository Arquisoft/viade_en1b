import React from 'react'
import { render, waitForElement, fireEvent, queryByTestId, queryByText } from '@testing-library/react'
import '@testing-library/jest-dom'
import Login from '../Login.js'

let rendered = null
beforeEach(() => {
    const { container } = render(<Login></Login>)
    rendered = container
})


describe('login component', () => {

    test('renders the header correctly', async () => {
        const text = 'Login'
        waitForElement(() => {
            expect(queryByTestId(rendered, 'login-header')).toEqual('Login')
            expect(queryByTestId(rendered, 'login-header')).not.toBeNull()
        })
    })

    test('pop up opens up', () => {
        waitForElement(() => {
            global.open = jest.fn();
            fireEvent.click(queryByText(rendered, 'Login here!'))
            expect(global.open).toBeCalled();
        })

    })


})

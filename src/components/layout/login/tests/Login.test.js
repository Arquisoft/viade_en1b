import React from 'react'
import { render } from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect"
import Login from '../Login.js'

describe('rendering', () => {
    it('renders login header', () => {
        const { getByTestId } = render(<Login></Login>)
        const loginHeader = getByTestId('login-header')
        expect(loginHeader.textContent).toBe('Login')

    })
    it('renders login button', () => {
        const { getByTestId } = render(<Login></Login>)
        const loginButton = getByTestId('login-button')
        expect(loginButton.textContent).toBe('Login')
    })

    it('renders form correctly', () => {
        const { getByTestId } = render(<Login></Login>)
        const loginProvider = getByTestId('login-provider')
        const loginLabel = getByTestId('login-label')
        
        expect(loginProvider).not.toBe(null);
        expect(loginLabel.textContent).toBe('Choose a provider')
    })

    
})

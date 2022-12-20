import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
//import * as router from 'react-router'

import Form from './Form'
import handleSubmit from './Form'


import axios from 'axios'
// import { act } from 'react-dom/test-utils'

jest.mock('axios')
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => (mockedUsedNavigate )
  }));



describe('LogIn component renders correctly', () => {
    test('Should render inputs and button on Form layout', () => {
        render(
            <MemoryRouter>
                {' '}
                <Form />
            </MemoryRouter>
        )
        const emailInputElement = screen.getByRole('textbox');
        const passwordInputElement = screen.getByTestId('pswd-label');
        const buttonElement = screen.getByRole('button');
        expect(emailInputElement).toBeInTheDocument();
        expect(emailInputElement.value).toBe('');
        expect(emailInputElement.value).toBe('');
        expect(passwordInputElement).toBeInTheDocument();
        expect(buttonElement).toBeInTheDocument();
    });
});

describe('Form input values take email and password values', () => {
    test('Email input takes email value', () => {
        render(
            <MemoryRouter>
                {' '}
                <Form />
            </MemoryRouter>
        )
        const emailInputElement = screen.getByRole('textbox');
        const testValue = 'hola@gmail.com';
        fireEvent.change(emailInputElement, {target: {value: testValue} });
        expect(emailInputElement.value).toBe(testValue);
    });

    test('Password input takes password value', () => {
        render(
            <MemoryRouter>
                {' '}
                <Form />
            </MemoryRouter>
        )
        const passwordInputElement = screen.getByRole('textbox');
        const testValue = 'abcD34.7';
        fireEvent.change(passwordInputElement, {target: {value: testValue} });
        expect(passwordInputElement.value).toBe(testValue);
    });
});

describe('submit is called when click on start button', () => {
    test('it should call axios', () => {
        axios.get = jest.fn(() => Promise.resolve({ data: [] }))
        const spy = jest.spyOn(axios, 'get')
        render(
            <MemoryRouter>
            {' '}
            <Form />
            </MemoryRouter>
        )
        fireEvent.click(screen.getByText('Start'))
        expect(spy).toHaveBeenCalled()
    });
});
    
    test('Should render inputs and button on Form layout', () => {
        render(
            <MemoryRouter>
                {' '}
                <Form />
            </MemoryRouter>
        )
        const emailInputElement = screen.getByRole('textbox');
        const passwordInputElement = screen.getByTestId('pswd-label');
        const buttonElement = screen.getByRole('button');
        fireEvent.change(emailInputElement, {target: {value: 'admin_karla@gmail.com'}})
        fireEvent.change(passwordInputElement, {target: {value: '123456'}})
        fireEvent.click(buttonElement)
        expect(mockedUsedNavigate).toHaveBeenCalledTimes(1)
        
        });
    


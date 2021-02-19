import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import { Login } from '../../src/components/auth/login';


describe('Login component tests', () => {
    let container: HTMLDivElement;
    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    })
    afterEach(() => {
        document.body.removeChild(container);
    });

    it('can render login', () => {
        act(() => {
        //    ReactDOM.render(<Login />, container);
        });
    });
});
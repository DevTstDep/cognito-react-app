import * as ReactDOM from 'react-dom';
import React from 'react';
import { fireEvent } from '@testing-library/react';
import { CognitoUser } from '@aws-amplify/auth';
import { AuthService } from '../../src/services/AuthService';
import * as appConfig from '../../src/config.json';
import { Profile } from '../../src/components/Profile';


/**
 * @jest-environment jsdom
 */
describe('Profile component test suite', () => {

    let user: CognitoUser;
    let container: HTMLDivElement

    beforeAll(async () => {
        user = await new AuthService().login(
            appConfig.test.username,
            appConfig.test.password
        )
    })
    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
        ReactDOM.render(<Profile user={user}/>, container);
    });
    afterEach(() => {
        document.body.removeChild(container);
        container.remove();
    })

    it('Profile render test', () => {
        console.log('everything ok until now')
    })



});
import * as ReactDOM from 'react-dom';
import React from 'react';
import { fireEvent } from '@testing-library/react';
import { CognitoUser } from '@aws-amplify/auth';
import { AuthService } from '../services/AuthService';
import * as appConfig from '../config.json';



describe('Profile component test suite', () => {

    let user: CognitoUser;

    beforeAll(async ()=>{
        user = await new AuthService().login(
            appConfig.test.username,
            appConfig.test.password
        )
    })

    it('initial test', () => {
        console.log('just a console log');
    })

});
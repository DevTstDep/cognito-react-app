import { LoginService } from "../../src/login/LoginService";
import { DataService } from "../../src/services/DataService";
import { CognitoUser } from '@aws-amplify/auth';
import * as config from "../../config.json";
import * as AWS from 'aws-sdk';



describe('Data service test suite', ()=>{
    let dataService: DataService;
    let loginService: LoginService;
    let user: CognitoUser;

    beforeAll(async ()=>{
        dataService = new DataService();
        loginService = new LoginService();
        user = await loginService.login(
            config.test.username,
            config.test.password
        );
        await loginService.getAwsCredentials(user);
    });

    test('Upload profile picture',async ()=>{
        await dataService.uploadProfilePicture('assets/profilepic.jpg');
    });

    





});
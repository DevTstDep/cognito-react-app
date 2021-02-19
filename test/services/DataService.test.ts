import { AuthService } from "../../src/services/AuthService";
import { DataService } from "../../src/services/DataService";
import { CognitoUser } from '@aws-amplify/auth';
import * as config from "../../src/config.json";
import { readFileSync } from "fs";

describe('Data service test suite', () => {
    let dataService: DataService;
    let authService: AuthService;
    let user: CognitoUser;
    let picUrl: string;

    beforeAll(async () => {
        authService = new AuthService();
        dataService = new DataService(authService);

        user = await authService.login(
            config.test.username,
            config.test.password
        );
        await authService.getAwsCredentials(user);
    });

    test('Upload profile picture', async () => {
        picUrl = await dataService.uploadProfilePicture('assets/profilepic.jpg');
        await authService.updateUserAttribute(user, {
            picture: picUrl
        })
    });
    test('set profile picture', async () => {
        await authService.updateUserAttribute(user, {
            picture: picUrl
        });
    });
    test('get groups', () => {
        const groups: string[] = user.getSignInUserSession()?.getIdToken().payload['cognito:groups'];
        console.log(123)
    });
    test('test get spaces', async () => {
        const result = await dataService.getSpaces();
    });
    test.only('post reservation',async ()=>{
        const result = await dataService.reserveSpace('sdfsfd');
        console.log(123);
    });

});
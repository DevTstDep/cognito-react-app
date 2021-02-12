import { AuthService } from "../../src/services/AuthService";
import { DataService } from "../../src/services/DataService";
import { CognitoUser } from '@aws-amplify/auth';
import * as config from "../../src/config.json";

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
    test.only('get groups', ()=>{
        const groups:string[] = user.getSignInUserSession()?.getIdToken().payload['cognito:groups'];
        console.log(123)
    });







});
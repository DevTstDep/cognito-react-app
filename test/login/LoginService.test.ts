import { AuthService } from "../../src/services/AuthService";
import { DataService } from "../../src/services/DataService";
import * as config from "../../src/config.json";
import { CognitoUser } from '@aws-amplify/auth';
import * as axios from 'axios';

axios.default.defaults.validateStatus = function () {
    return true;
}



describe('LoginService test suite', () => {

    let authService: AuthService;
    let user: CognitoUser;

    beforeEach(() => {
        authService = new AuthService();
    });

    test.skip('signUp test', async () => {
        await authService.signUp(
            config.test.username,
            config.test.password,
            config.test.email
        )
    });
    test('login user', async () => {
        user = await authService.login(
            config.test.username,
            config.test.password
        );
        console.log(1300);

    });
    test('calls with user credentials', async () => {
        const response = await axios.default.get(
            config.api.invokeUrl + 'hello',
            {
                headers: {
                    'Authorization': user.getSignInUserSession()!.getIdToken().getJwtToken()
                }
            }
        )
        console.log(123);

    });
    test.skip('update user attributes', async () => {
        await authService.updateUserAttribute(user, {
            ['Picture']: 'SomePictureUrl'
        }
        );
    });
    test.skip('get AWS temporary credentials', async () => {
        await authService.getAwsCredentials(user);
        const dataService: DataService = new DataService(authService);
        const s3Result = await dataService.listBuckets();
        console.log(123);
    });

})
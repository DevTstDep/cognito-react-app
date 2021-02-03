import { LoginService } from "../../src/login/LoginService";
import { DataService } from "../../src/services/DataService";
import * as config from "../../config.json";
import { CognitoUser } from '@aws-amplify/auth';
import * as axios from 'axios';

axios.default.defaults.validateStatus = function () {
    return true;
}



describe('LoginService test suite', () => {

    let loginService: LoginService;
    let user: CognitoUser;

    beforeEach(() => {
        loginService = new LoginService();
    });

    test.skip('signUp test', async () => {
        await loginService.signUp(
            config.test.username,
            config.test.password,
            config.test.email
        )
    });
    test('login user', async () => {
        user = await loginService.login(
            config.test.username,
            config.test.password
        );
    });
    test('calls with user credentials', async () => {
        const response = await axios.default.get(
            config.api.invokeUrl,
            {
                headers: {
                    'Authorization': user.getSignInUserSession().getIdToken().getJwtToken()
                }
            }
        )
        console.log(123);

    });
    test.only('get AWS temporary credentials', async () => {
        user = await loginService.login(
            config.test.username,
            config.test.password
        );
        const credentials = await loginService.getAwsCredentials(user);
        const dataService: DataService = new DataService();
        //       dataService.updateCredentials(credentials);
        const s3Result = await dataService.createBucket();
        console.log(123);
    });

})
import { LoginService } from "../../src/login/LoginService";
import * as config from "../../config.json";



describe('LoginService test suite', () => {

    let loginService: LoginService;

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
    test('login', async () => {
        await loginService.login(
            config.test.username,
            config.test.password
        )
    })

})
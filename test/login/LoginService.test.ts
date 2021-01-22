import { LoginService } from "../../src/login/LoginService";



describe('LoginService test suite', () => {

    let loginService: LoginService;

    beforeEach(() => {
        loginService = new LoginService();
    });

    test.skip('signUp test', async () => {
        await loginService.signUp(
            'sefu',
            '1234567',
            'xxx@gmail.com'
        )
    });
    test('login', async () => {
        await loginService.login(
            'sefu',
            '1234567'
        )
    })

})
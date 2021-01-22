import { LoginService } from "../../src/login/LoginService";



describe('LoginService test suite', () => {

    let loginService:LoginService;

    beforeEach(()=>{
        loginService = new LoginService();
    });

    test('initial test', async () => {
        await loginService.login('asd', 'def');
    }); 

})
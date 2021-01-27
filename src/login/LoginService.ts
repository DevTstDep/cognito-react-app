import { Auth } from "aws-amplify";
import Amplify from "aws-amplify";
import * as config from "../../config.json";

Amplify.configure({
    Auth: {
        mandatorySignIn: true,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID,
        authenticationFlowType: "USER_PASSWORD_AUTH"
    }
});

export class LoginService {

    public async login(userName: string, password: string): Promise<boolean> {

        //Login phase:
        const user = await Auth.signIn(userName, password);

        // AWS identity credentials:
        


        return false;
    }

    public async signUp(userName: string, password: string, email: string): Promise<boolean> {
        const signUpResponse = await Auth.signUp({
            username: userName,
            password: password,
            attributes: {
                email: email
            }
        });
        return false;
    }
}
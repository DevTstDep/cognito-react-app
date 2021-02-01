import { Auth } from "aws-amplify";
import Amplify from "aws-amplify";
import { CognitoUser } from '@aws-amplify/auth';
import * as config from "../../config.json";
import * as AWS from 'aws-sdk';
import { CredentialsOptions } from "aws-sdk/lib/credentials";

AWS.config.region = config.cognito.REGION;

Amplify.configure({
    Auth: {
        mandatorySignIn: false,
        region: config.cognito.REGION,
        userPoolId: config.cognito.USER_POOL_ID,
        userPoolWebClientId: config.cognito.APP_CLIENT_ID,
        identityPoolId: config.cognito.IDENTITY_POOL_ID,
        authenticationFlowType: "USER_PASSWORD_AUTH"
    }
});

export class LoginService {

    public async login(userName: string, password: string): Promise<CognitoUser> {
        const user = await Auth.signIn(userName, password) as CognitoUser;
        return user;
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
    };

    public async getAwsCredentials(user: CognitoUser) {
        const cognitoIdentityPool = `cognito-idp.${config.cognito.REGION}.amazonaws.com/${config.cognito.IDENTITY_POOL_ID}`;
        var creds = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: config.cognito.IDENTITY_POOL_ID,
            Logins: {
                cognitoIdentityPool: user.getSignInUserSession().getIdToken().getJwtToken()
            }
        })
        const awsCredentials = await this.getCredentialsPromise();
        console.log(5);
    }

    private async getCredentialsPromise():Promise<AWS.Credentials | CredentialsOptions>{
        return new Promise((resolve, reject) => {
            AWS.config.getCredentials((err, data)=>{
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        })
    }
}
import { Auth } from "aws-amplify";
import Amplify from "aws-amplify";
import { CognitoUser } from '@aws-amplify/auth';
import * as config from "../../config.json";
import * as AWS from 'aws-sdk';
import { Credentials, CredentialsOptions } from "aws-sdk/lib/credentials";

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

    public async updateUserAttribute(user: CognitoUser, attribute: {
        [key: string]: string
    }) {
        await Auth.updateUserAttributes(user, attribute)
    }

    public async getAwsCredentials(user: CognitoUser): Promise<void> {
        const cognitoIdentityPool = `cognito-idp.${config.cognito.REGION}.amazonaws.com/${config.cognito.USER_POOL_ID}`;

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: config.cognito.IDENTITY_POOL_ID,
            Logins: {
                [cognitoIdentityPool]: user.getSignInUserSession().getIdToken().getJwtToken()
            }
        }, {
            region: config.cognito.REGION
        });
        await this.refreshCredentials();
    }

    private async refreshCredentials(): Promise<void> {
        return new Promise((resolve, reject) => {
            (AWS.config.credentials as Credentials).refresh(err => {
                if (err) {
                    reject(err);
                } else {
                    resolve()
                }
            });
        })
    }
}
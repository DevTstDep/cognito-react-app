import { Auth } from "aws-amplify";

export class LoginService {

    public async login(userName: string, password: string): Promise<boolean> {
        const user = await Auth.signIn(userName, password)
        return false;

    }
}
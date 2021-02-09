import { CognitoUser } from "@aws-amplify/auth";
import { Component } from "react";
import { Link } from "react-router-dom";

interface IProfileProps {
    user: CognitoUser | undefined
}
interface IProfileState { }


export class Profile extends Component<IProfileProps, IProfileState>{


    render() {
        let profileSpace;
        if (this.props.user) {
            profileSpace = <h1>Welcome {this.props.user.getUsername()}</h1>
        } else {
            profileSpace = <div>
                Please <Link to="/login">Login</Link>
            </div>
        }
        return <div>
            <h2>Hello to the profile page!</h2>
            {profileSpace}
        </div>
    }

}
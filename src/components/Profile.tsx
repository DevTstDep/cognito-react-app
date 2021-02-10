import { CognitoUser } from "@aws-amplify/auth";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { Component } from "react";
import { Link } from "react-router-dom";
import './Profile.css';

interface IProfileProps {
    user: CognitoUser | undefined
}
interface IProfileState {
    userAttributes: CognitoUserAttribute[]
}


export class Profile extends Component<IProfileProps, IProfileState>{

    state: IProfileState = {
        userAttributes: []
    }

    private getProfilePicture(): string | undefined {
        const user = this.props.user;
        if (this.props.user) {
            return ''
        } else {
            return undefined
        }
    }

    private async getUserAttributes(): Promise<CognitoUserAttribute[]> {
        return new Promise((resolve, reject) => {
            if (this.props.user) {
                this.props.user.getUserAttributes((err, result) => {
                    if (err) {
                        reject(err)
                    } else {
                        if (result) {
                            resolve(result)
                        } else {
                            resolve([])
                        }
                    }
                })
            } else {
                resolve([])
            }
        })
    }

    private renderUserAttributes() {
        const userAttributes = this.state.userAttributes;
        const rows: any[] = [];
        for (const userAttribute of userAttributes) {
            rows.push(<tr>{userAttribute.Name} {userAttribute.Value}</tr>)
        }
        return <table>
            {rows}
        </table>
    }

    async componentDidMount() {
        const userAttributes = await this.getUserAttributes();
        this.setState({
            userAttributes: userAttributes
        })
    }


    render() {
        const profilePicture = this.getProfilePicture();
        let profileSpace;
        if (this.props.user) {
            profileSpace =
                <div id='profile-space'>
                    {this.renderUserAttributes()}
                    <h1>Nadia </h1>
                    <p className="title">CEO & Founder, Example</p>
                    <p>Harvard University</p>
                    <a href="#"><i className="fa fa-dribbble"></i></a>
                    <a href="#"><i className="fa fa-twitter"></i></a>
                    <a href="#"><i className="fa fa-linkedin"></i></a>
                    <a href="#"><i className="fa fa-facebook"></i></a>
                    <p><button>Contact</button></p>
                </div>
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
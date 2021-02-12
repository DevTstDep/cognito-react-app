import { CognitoUser } from "@aws-amplify/auth";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { Component, SyntheticEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import { DataService } from "../services/DataService";
import './Profile.css';

interface CustomEvent {
    target: HTMLInputElement
}

interface IProfileProps {
    user: CognitoUser | undefined,
    dataService: DataService
}
interface IProfileState {
    userAttributes: CognitoUserAttribute[]
}


export class Profile extends Component<IProfileProps, IProfileState>{

    state: IProfileState = {
        userAttributes: []
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

    private async setProfilePicture(event: CustomEvent) {
        const files = event.target.files
        if (files && files[0]) {
            console.log('File' + files[0].name);
            const result = await this.props.dataService.uploadProfileFromFile(files[0]);
            await this.props.dataService.updateUserPicture(
                this.props.user!,
                result
            )
            const newAttributes = [...this.state.userAttributes];
            const picAttribute = newAttributes.find(atr => atr.Name == 'picture');
            if (picAttribute) {
                picAttribute.Value = result
            }
            this.setState({
                userAttributes: newAttributes
            });
        }
    }

    private renderUserAttributes() {
        const userAttributes = this.state.userAttributes;
        const rows: any[] = [];
        let hasPicture = false;
        for (const userAttribute of userAttributes) {
            if (userAttribute.Name == 'picture') {
                rows.push(<tr key={userAttribute.Name}><td colSpan={2}>
                    <img src={userAttribute.Value} /></td>
                </tr>)
                hasPicture = true
            }
        }
        if (!hasPicture) {
            rows.push(<tr key={'uploadPictureRow'}><td>Please upload a profile picture</td></tr>)
        } else {
            rows.push(<tr key={'changePicture'}>
                <td>Change picture</td>
                <td><input type='file' onChange={e => this.setProfilePicture(e)}></input></td>
            </tr>)
        }
        for (const userAttribute of userAttributes) {
            if (userAttribute.Name != 'picture' && userAttribute.Name != 'sub') {
                rows.push(<tr key={userAttribute.Name}>
                    <td> {userAttribute.Name} </td>
                    <td> {userAttribute.Value} </td>
                </tr>)
            }
        }
        return <table className='profileTable'>
            <tbody>{rows}</tbody>
        </table>
    }

    async componentDidMount() {
        const userAttributes = await this.getUserAttributes();
        this.setState({
            userAttributes: userAttributes
        })
    }


    render() {
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
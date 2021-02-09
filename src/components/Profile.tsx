import { CognitoUser } from "@aws-amplify/auth";
import { Component } from "react";
import { Link } from "react-router-dom";
import './Profile.css';

interface IProfileProps {
    user: CognitoUser | undefined
}
interface IProfileState { }


export class Profile extends Component<IProfileProps, IProfileState>{


    render() {
        let profileSpace;
        if (this.props.user) {
            profileSpace =
                <div id='profile-space'>
                    <img src="img.jpg" alt="John"/>
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
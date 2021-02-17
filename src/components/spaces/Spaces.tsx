import { CognitoUser } from "@aws-amplify/auth";
import { Component } from "react";
import { Link } from "react-router-dom";
import { DataService } from "../../services/DataService";


interface ISpacesState { }
interface ISpaceProps {
    user: CognitoUser | undefined,
    dataService: DataService
}

export class Spaces extends Component<ISpaceProps, ISpacesState> {

    render() {
        return <div>
            <h2>
                Spaces works!! You are {this.props.user?.getUsername()}
            </h2>
            <Link to="/createSpace">Create space</Link>
        </div>
    }
}
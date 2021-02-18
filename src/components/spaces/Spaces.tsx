import { CognitoUser } from "@aws-amplify/auth";
import { Component } from "react";
import { Link } from "react-router-dom";
import { DataService } from "../../services/DataService";
import { SpaceComponent } from "./SpaceComponent";


interface ISpacesState { }
interface ISpaceProps {
    user: CognitoUser | undefined,
    dataService: DataService
}

export class Spaces extends Component<ISpaceProps, ISpacesState> {

    render() {
        return <div >
            <h2>
                Spaces works!! You are {this.props.user?.getUsername()}
            </h2>
            <SpaceComponent location='asdasd' name='aaaa' spaceId='asdasd' description='aaaa' photoURL='https://spaces-photos-ax9lbm0z.s3.eu-west-1.amazonaws.com/d4b5bb48-5561-42d3-b217-c6cdd05e2b1czz.jpg'/>
            <SpaceComponent location='asdasd' name='aaaa' spaceId='asdasd' description='aaaa'/>
            <SpaceComponent location='asdasd' name='aaaa' spaceId='asdasd' description='aaaa'/>
            <SpaceComponent location='asdasd' name='aaaa' spaceId='asdasd' description='aaaa'/>
            <SpaceComponent location='asdasd' name='aaaa' spaceId='asdasd' description='aaaa'/>
            <Link to="/createSpace">Create space</Link>
        </div>
    }
}
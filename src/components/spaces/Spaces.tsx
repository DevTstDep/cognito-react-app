import { CognitoUser } from "@aws-amplify/auth";
import { Component } from "react";
import { Link } from "react-router-dom";
import { DataService } from "../../services/DataService";
import { SpaceComponent } from "./SpaceComponent";

export interface Space {
    name: string,
    spaceId: string,
    location: string,
    description: string,
    photoURL?: string
}

interface ISpacesState {
    spaces: Space[]
}
interface ISpaceProps {
    user: CognitoUser | undefined,
    dataService: DataService
}

export class Spaces extends Component<ISpaceProps, ISpacesState> {

    state: ISpacesState = { spaces: [] }

    async componentDidMount() {
        const spaces = await this.props.dataService.getSpaces();
        this.setState({ spaces: spaces })
    }
    private renderSpaces() {
        const rows: any[] = [];
        for (const space of this.state.spaces) {
            rows.push(
                <SpaceComponent
                    location={space.location}
                    name={space.name}
                    spaceId={space.spaceId}
                    photoURL={space.photoURL}
                    key={space.spaceId} 
                    dataService={this.props.dataService}/>
            )
        }
        return rows
    }

    render() {
        return <div >
            <h2>
                Spaces works!! You are {this.props.user?.getUsername()}
            </h2>
            {this.renderSpaces()}
            <Link to="/createSpace">Create space</Link>
        </div>
    }
}
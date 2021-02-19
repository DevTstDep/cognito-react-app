import { Component } from "react";
import './spaceComponent.css';
import genericImage from '../../assets/generic-image.jpg';
import { DataService } from "../../services/DataService";

interface ISpaceComponentState { }
interface ISpaceComponentProps {
    spaceId: string,
    name: string,
    location: string,
    description?: string,
    photoURL?: string
    dataService: DataService
}


export class SpaceComponent extends Component<ISpaceComponentProps, ISpaceComponentState> {

    private renderImage() {
        if (this.props.photoURL) {
            return <img src={this.props.photoURL} />
        } else {
            return <img src={genericImage} />;
        }
    }

    private async reserveSpace() {
        await this.props.dataService.reserveSpace(this.props.spaceId);
    }

    render() {
        return <div className='spaceComponent'>
            {this.renderImage()}
            <label className='name'>{this.props.name}</label><br />
            <label className='spaceId'>{this.props.spaceId}</label><br />
            <label className='location'>{this.props.location}</label><br />
            <button onClick={() => this.reserveSpace()}>Reserve</button>
        </div>
    }


}
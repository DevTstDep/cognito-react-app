import { Component } from "react";
import './spaceComponent.css';
import genericImage from '../../assets/generic-image.jpg';

interface ISpaceComponentState { }
interface ISpaceComponentProps {
    spaceId: string,
    name: string,
    location: string,
    description?: string,
    photoURL?: string
}


export class SpaceComponent extends Component<ISpaceComponentProps, ISpaceComponentState> {

    private renderImage() {
        if (this.props.photoURL) {
            return <img src={this.props.photoURL} />
        } else {
            return <img src={genericImage}/>;
        }
    }

    render() {
        return <div className='spaceComponent'>
            {this.renderImage()}
            <label className='name'>{this.props.name}</label><br />
            <label className='spaceId'>{this.props.spaceId}</label><br />
            <label className='location'>{this.props.location}</label><br />
        </div>
    }


}
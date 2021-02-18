import { Component } from "react";
import './spaceComponent.css';

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
            return null;
        }
    }

    render() {
        return <div className='spaceComponent'>
            {this.renderImage()}
            {this.props.spaceId}<br />
            {this.props.name}<br />
            {this.props.location}<br />
            {this.props.location}<br />
        </div>
    }


}
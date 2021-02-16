import { Component } from "react";

interface ISpaceComponentState {}
interface ISpaceComponentProps {
    spaceId: string,
    name: string,
    location: string,
    description?: string,
    photoURL?: String
}


export class SpaceComponent extends Component<ISpaceComponentProps, ISpaceComponentState> {

    render(){
        return <div>
            
        </div>
    }

    
}
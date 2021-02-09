import { Component } from "react";
import { Link } from 'react-router-dom';


export class AppNavbar extends Component<{ userName: string | undefined }>{

    render() {
        let loginLogOut: any;
        if (this.props.userName) {
            loginLogOut =<Link to="/logout" style={{float:"right"}}>{this.props.userName}</Link>
        } else {
            loginLogOut = <Link to="/login" style={{float:"right"}}>Login</Link>
        }
        return <div className="topnav">
            <Link to="/">home</Link>
            <Link to="/home">some stuff</Link>
            <Link to="/profile">profile</Link>
            {loginLogOut}
        </div>
    }
}
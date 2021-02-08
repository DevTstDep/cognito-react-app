import { Component } from "react";
import { Link } from 'react-router-dom';


export class AppNavbar extends Component<{ userName: string }>{

    render() {
        return <div className="topnav">
            <Link to="/">home</Link>
            <Link to="/home">some stuff</Link>
            <Link to="/login" style={{float:"right"}}>Login</Link>
        </div>
    }
}
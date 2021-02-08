import React from "react";
import { Login } from "./auth/login";
import { AuthService } from "./services/AuthService";
import { DataService } from "./services/DataService";



export class App extends React.Component {

    private authService: AuthService = new AuthService();
    private dataService: DataService = new DataService();

    render() {
        return (
            <div className="wrapper">
                <h1>Welcome to the best app ever!</h1>
                <Login authService={this.authService} />
            </div>
        )
    }

}
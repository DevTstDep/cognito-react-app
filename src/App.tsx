import React from "react";
import { Login } from "./components/auth/login";
import { AuthService } from "./services/AuthService";
import { DataService } from "./services/DataService";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AppNavbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { CognitoUser } from "@aws-amplify/auth";

interface AppState {
    user: CognitoUser | undefined;
    userName: string | undefined;
}

export class App extends React.Component<{}, AppState> {

    private authService: AuthService = new AuthService();
    private dataService: DataService = new DataService();

    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
            userName: undefined
        }
        this.setCognitoUser = this.setCognitoUser.bind(this);
    }

    private setCognitoUser(user: CognitoUser) {
        const cognitoUserName = user.getUsername();
        this.setState({
            user: user,
            userName: cognitoUserName
        })
        console.log('Setting user to:')
        console.log(this.state.user)
    };

    render() {
        return (
            <div className="wrapper">
                <BrowserRouter>
                    <div>
                        <AppNavbar userName={this.state.userName} />
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route exact path='/login'>
                                <Login authService={this.authService} setCognitoUser={this.setCognitoUser} />
                            </Route>
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        )
    }

}
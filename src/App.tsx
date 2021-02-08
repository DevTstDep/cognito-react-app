import React from "react";
import { Login } from "./components/auth/login";
import { AuthService } from "./services/AuthService";
import { DataService } from "./services/DataService";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AppNavbar } from "./components/Navbar";
import { Home } from "./components/Home";



export class App extends React.Component {

    private authService: AuthService = new AuthService();
    private dataService: DataService = new DataService();

    render() {
        return (
            <div className="wrapper">
                <BrowserRouter>
                    <div>
                        <AppNavbar userName='sefu' />
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route exact path='/login' component={Login} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </div>
        )
    }

}
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Login } from './auth/login';
import { AuthService } from './services/AuthService';


const zuthService = new AuthService();
ReactDOM.render(
  <div className="wrapper">
  <h1>Welcome to the best app ever!</h1>
  <Login authService={zuthService}/>

</div>,
  document.getElementById('root')
);


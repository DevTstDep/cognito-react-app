import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Login } from './auth/login';

ReactDOM.render(
  <div className="wrapper">
  <h1>Welcome to the best app ever!</h1>
  <h2>Please login</h2>
  <Login />

</div>,
  document.getElementById('root')
);


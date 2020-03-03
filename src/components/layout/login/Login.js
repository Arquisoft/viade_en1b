import React from "react";
import { AuthButton, LoggedIn } from '@solid/react'
import "./Login.css";
import {Redirect} from 'react-router-dom'

function Login(props) {
  return (
    <div id="container">
      <div className="background-image"></div>
      <div className="background-div"></div>
      <h1 data-testid="login-header">Login</h1>
      <AuthButton popup="https://solid.github.io/solid-auth-client/dist/popup.html" login="Login here!" logout="Log me out" />
      <LoggedIn>
          <Redirect to="/dashboard"></Redirect>
      </LoggedIn>
    </div>
  );
}

export default Login
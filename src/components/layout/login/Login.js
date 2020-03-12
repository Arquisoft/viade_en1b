import React from "react";
import { AuthButton, LoggedIn, LoggedOut } from '@solid/react'
import "./Login.css";
import { Redirect } from "react-router-dom";

function Login(props) {
  return (
    <div id="container">
      <LoggedOut>
        <div className="background-image"></div>
        <div className="background-div"></div>
        <h1 data-testid="login-header">Login</h1>
        <AuthButton popup="https://solid.github.io/solid-auth-client/dist/popup.html" login="Login here!" logout="Log me out" />
      </LoggedOut>
      <LoggedIn>
          <Redirect to='/dashboard'></Redirect>
      </LoggedIn>
    </div>
  );
}

export default Login
import React from "react";
import { AuthButton, LoggedIn, LoggedOut } from "@solid/react";
import "./Login.css";
import { Redirect } from "react-router-dom";

function Login(props) {
  return (
    <div id="login-container">
      <LoggedOut>
        <div id="login-card">
          <img
            alt="Viade logo"
            src={process.env.PUBLIC_URL + "/viade-logo.svg"}
          ></img>
          <h1>Manage your routes like never before.</h1>
          <p>
            A new descentralized system where your information is truly yours.
          </p>
        </div>
        <div id="clipped"></div>
        <div id="login-another-div">
          <h3 data-testid="login-header">Login</h3>
          <AuthButton
            popup="https://solid.github.io/solid-auth-client/dist/popup.html"
            login="Login here!"
            logout="Log me out"
          />
        </div>
      </LoggedOut>
      <LoggedIn>
        <Redirect to="/dashboard"></Redirect>
      </LoggedIn>
    </div>
  );
}

export default Login;

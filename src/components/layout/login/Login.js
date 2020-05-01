import React from "react";
import { AuthButton, LoggedIn, LoggedOut } from "@solid/react";
import "./Login.css";
import { Redirect } from "react-router-dom";
import { FormattedMessage } from "react-intl";

/**
 * Component for the user to log in
 * @param {*} props 
 */
function Login(props) {
  return (
    <div id="login-container">
      <LoggedOut>
        <div id="login-card">
          <img
            alt="Viade logo"
            src={process.env.PUBLIC_URL + "/viade-logo.svg"}
          ></img>
          <h1>
            <FormattedMessage id="LoginTitle" />
          </h1>
          <p>
            <FormattedMessage id="LoginParagraph" />
          </p>
        </div>
        <div id="clipped"></div>
        <div id="login-another-div">
          <h3 data-testid="login-header">
            <FormattedMessage id="LoginButtonTitle" />
          </h3>
          <AuthButton
            popup="https://solid.github.io/solid-auth-client/dist/popup.html"
            login={<FormattedMessage id="LoginButton" />}
            logout={<FormattedMessage id="LogoutButton" />}
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

import React from "react";
import { Form, Button} from "react-bootstrap";
import {AuthButton, LoggedIn, LoggedOut, useWebId, Value} from '@solid/react'
import "./Login.css";
import Dashboard from './../../dashboard/Dashboard'
import {Redirect} from 'react-router-dom'

export default function Login(props) {
  console.log(props.title);
  return (
    <div id="container">
      <div className="background-image"></div>
      <div className="background-div"></div>
      <h1 data-testid="login-header">Login</h1>
      <AuthButton popup="https://solid.github.io/solid-auth-client/dist/popup.html" login="Login here!" logout="Log me out" />
      <LoggedIn>
        <Redirect to="/dashboard"/>
      </LoggedIn>
    </div>
  );
}

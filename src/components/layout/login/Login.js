import React from "react";
import { Form, Button} from "react-bootstrap";
import "./Login.css";

export default function Login(props) {
  console.log(props.title);
  return (
    <div id="container">
      <div className="background-image"></div>
      <div className="background-div"></div>
        <h1 data-testid="login-header">Login</h1>
        <Form onSubmit={props.onSubmit}>
          <Form.Group data-testid="login-provider" controlId="provider">
            <Form.Label data-testid="login-label">Choose a provider</Form.Label>
            <Form.Control as="select">
              <option>Inrupt</option>
              <option>Solid Community</option>
            </Form.Control>
          </Form.Group>

          <Button data-testid="login-button" variant="primary" type="submit">
            Login
          </Button>
        </Form>
    </div>
  );
}

import React from "react";
import { Card } from "react-bootstrap";
import "./Notification.css";

export function Notification(props) {
  const { notification } = props;

  return (
    <Card
      data-testid="notification-card"
      className="notification"
      onClick={() => {}}
    >
      <Card.Body className="notificationCardBody">
        <Card.Text data-testid="notification-card-text" className="notificationText">{notification.text}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Notification;

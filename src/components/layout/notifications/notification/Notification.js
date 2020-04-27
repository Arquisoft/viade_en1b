import React from "react";
import { Card } from "react-bootstrap";
import "./Notification.css";

export default function Notification(props) {
  const { notification } = props;

  return (
    <Card
      data-testid="notification-card"
      className="notification"
      onClick={() => {}}
    >
      <Card.Body className="notificationCardBody">
        <Card.Text className="notificationText">{notification.text}</Card.Text>
      </Card.Body>
    </Card>
  );
}

import React from "react";
import { Card } from "react-bootstrap";

export function Notification(props) {
  const { notification } = props;

  return (
    <Card
      data-testid="notification-card"
      className="notification"
      onClick={() => {}}
    >
      <Card.Body>
        <Card.Text data-testid="notification-card-text">{notification.text}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Notification;

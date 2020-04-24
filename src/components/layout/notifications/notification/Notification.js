import React from 'react'
import { Card } from 'react-bootstrap'

export default function Notification(props) {

    const {notification} = props;

    return (
        <Card data-testid = "notification-card" id={props.id} onClick={() => {}}>
            <Card.Body>
                <Card.Text>{notification.text}</Card.Text>
            </Card.Body>
        </Card>
    );
}







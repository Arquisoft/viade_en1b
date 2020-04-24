import React from "react";
import { Card } from "react-bootstrap";
import "./RouteSummary.css";

export const RouteSummary = (props) => {
    const {route} = props;
    const {onClickHandle} = props;
    return (
        <Card data-testid = "route-summary-card" id={props.id} onClick={() => onClickHandle(route)}>
            <div id="blurryBackground"></div>
            <Card.Body>
                <Card.Title data-testid="route-summary-title">{route.name}</Card.Title>
                <Card.Subtitle data-testid="route-summary-subtitle">{route.author}</Card.Subtitle>
            </Card.Body>
        </Card>
    );
};

export default RouteSummary;


import React from "react";
import NotificationsList from "./notificationsList/NotificationsList";
import { Button } from "react-bootstrap";
import { checkInboxForSharedRoutes } from "../../../solid/routes";
export default function Notifications(props) {
  return (
    <div>
      <NotificationsList props={props}></NotificationsList>
    </div>
  );
}

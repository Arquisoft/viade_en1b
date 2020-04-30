import React from "react";
import {NotificationsList} from "./notificationsList/NotificationsList";
export function Notifications(props) {
  return (
    <div data-testid = "notifications-div">
      <NotificationsList data-testid = "notifications-list" props={props}></NotificationsList>
    </div>
  );
}

export default Notifications;

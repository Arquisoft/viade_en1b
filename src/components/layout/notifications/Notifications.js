import React from "react";
import NotificationsList from "./notificationsList/NotificationsList";
export default function Notifications(props) {
  return (
    <div>
      <NotificationsList props={props}></NotificationsList>
    </div>
  );
}

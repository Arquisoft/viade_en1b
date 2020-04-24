import React from "react";
import Notification from "../notification/Notification";
import style from "./NotificationsList.module.css";

export function NotificationsList(props) {

  const {notifications} = props; 

  const notificationsComponent = notifications.map((notification, key) => {
    return <Notification key={key} notification={notification}></Notification>;
  });
  return (
    <div
      className={
        style.notificationsListContainer
          ? style.notificationsListContainer
          : "notification-list-div"
      }
      data-testid = "notification-list-div"
    >
      <h1>Notifications</h1>
      <div className={style.notificationsList} data-testid = "notification-list-component">{notificationsComponent}</div>
    </div>
  );
}

export default NotificationsList;
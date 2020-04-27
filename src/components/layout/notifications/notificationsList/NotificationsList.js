import React from "react";
import Notification from "../notification/Notification";
import { connect } from "react-redux";
import style from "./NotificationsList.module.css";
export function NotificationsList(props) {
  const { userWebId } = props;
  let notifications = [
    { text: "Notification 1" },
    { text: "Notification 2" },
    { text: "Notification 3" },
    { text: "Notification 4" },
    { text: "Notification 5" },
    { text: "Notification 6" },
    { text: "Notification 7" },
    { text: "Notification 8" },
    { text: "Notification 9" },
    { text: "Notification 10" },
    { text: "Notification 11" },
    { text: "Notification 12" },
  ]; // = getNotifications(userWebId)

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
    >
      <h1>Notifications</h1>
      <div className={style.notificationsList}>{notificationsComponent}</div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userWebId: state.auth.userWebId,
  };
};

export default connect(mapStateToProps)(NotificationsList);

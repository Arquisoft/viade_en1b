import React from "react";
import Notification from "../notification/Notification";
import { connect } from "react-redux";
import style from "./NotificationsList.module.css";
import { useNotifications } from "../../../../utils/hooks/hooks";

export function NotificationsList(props) {
  const { userWebId } = props;
  let notifications = useNotifications(userWebId);

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

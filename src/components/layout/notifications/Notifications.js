import React from "react";
import NotificationsList from "./notificationsList/NotificationsList";
import { connect } from "react-redux";

export function Notifications(props) {

  const notifications = [
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
  ]; //getNotifications(userWebId)

  return (
    <div data-testid = "notifications-div">
      <NotificationsList data-testid = "notifications-list" props={props} notifications = {notifications}></NotificationsList>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userWebId: state.auth.userWebId,
  };
};

export default connect(mapStateToProps)(Notifications);


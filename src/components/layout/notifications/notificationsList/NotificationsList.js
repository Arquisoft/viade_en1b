import React from "react";
import Notification from "../notification/Notification";
import { connect } from "react-redux";
import style from "./NotificationsList.module.css";
import { useNotifications } from "../../../../utils/hooks/hooks";
import { Button } from "react-bootstrap";
import { checkInboxForSharedRoutes } from "../../../../solid/routes";
import { loadRoutesRequest } from "../../../../store/actions/RouteActions";
import { FormattedMessage } from "react-intl";

export function NotificationsList(props) {
  const { userWebId, loadRoutes } = props;
  let notifications = useNotifications(userWebId);
  const handleOnClick = () => {
    console.log("Clicked");
    checkInboxForSharedRoutes(userWebId).then((routes) => {
      loadRoutes();
    });
  };

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
      <h1><FormattedMessage id="Notifications"/></h1>
      <Button onClick={handleOnClick}><FormattedMessage id="Accepts"/></Button>

      <div className={style.notificationsList}>{notificationsComponent}</div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userWebId: state.auth.userWebId,
  };
};

const mapDispathToProps = (dispath) => {
  return {
    loadRoutes: () => dispath(loadRoutesRequest()),
  };
};

export default connect(mapStateToProps, mapDispathToProps)(NotificationsList);

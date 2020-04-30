import React from "react";
import { Notification } from "../notification/Notification";
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
    return (
      <Notification
        data-testid="notification"
        key={key}
        notification={notification}
      ></Notification>
    );
  });
  return (
    <div
      data-testid="notificationslist-div"
      className={
        style.notificationsListContainer
          ? style.notificationsListContainer
          : "notification-list-div"
      }
    >
      <h1>
        <FormattedMessage id="Notifications" />
      </h1>
      <div
        data-testid="notificationslist-divcomponent"
        className={
          notifications.length == 0
            ? style.notificationsEmpty
            : style.notificationsList
        }
      >
        {notificationsComponent}
      </div>{" "}
      <Button
        className={
          notifications.length == 0
            ? style.acceptAllButtonDisabled
            : style.acceptAllButton
        }
        data-testid="notificationslist-button"
        onClick={handleOnClick}
      >
        <FormattedMessage id="Accepts" />
      </Button>
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

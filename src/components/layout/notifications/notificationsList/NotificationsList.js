import React from "react";
import { Notification } from "../notification/Notification";
import style from "./NotificationsList.module.css";
import { useNotifications } from "../../../../utils/hooks/hooks";
import { Button } from "react-bootstrap";
import { checkInboxForSharedRoutes } from "../../../../solid/routes";
import { FormattedMessage } from "react-intl";
import { FaBellSlash } from "react-icons/fa";

export function NotificationsList(props) {
  const { userWebId, loadRoutes } = props;
  let notifications = useNotifications(userWebId);
  const handleOnClick = () => {
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
          notifications.length === 0
            ? style.notificationsEmpty
            : style.notificationsList
        }
      >
        {notifications.length === 0 ? (
          <FaBellSlash></FaBellSlash>
        ) : (
          notificationsComponent
        )}
      </div>{" "}
      <Button
        className={
          notifications.length === 0
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

export default NotificationsList;

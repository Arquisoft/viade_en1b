import React from "react";
import { Notification } from "../notification/Notification";
import { connect } from "react-redux";
import style from "./NotificationsList.module.css";
import { useNotifications } from "../../../../utils/hooks/hooks";
import { checkInboxForSharedRoutes } from "../../../../solid/routes";
import { loadRoutesRequest } from "../../../../store/actions/RouteActions";
import { FormattedMessage } from "react-intl";
import ViadeModal from "../../../layout/modal/Modal";

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
    return <Notification data-testid="notification" key={key} notification={notification}></Notification>;
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
      <h1><FormattedMessage id="Notifications" /></h1>
      <ViadeModal
        data-testid="notificationslist-button"
        onOpen={handleOnClick}
        disabled={false}
        toggleText={<FormattedMessage id="Accepts" />}
        handleClose={() => { }}
        onSave={() => { }}
        closeText={<FormattedMessage id="Close" />}
      ><FormattedMessage id="AcceptsMessage" />
      </ViadeModal>

      <div data-testid="notificationslist-divcomponent" className={style.notificationsList}>{notificationsComponent}</div>
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

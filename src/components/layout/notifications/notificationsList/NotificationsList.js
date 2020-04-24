import React from 'react'
import Notification from '../notification/Notification';
import { connect } from 'react-redux';

export function NotificationsList(props) {

    const {userWebId} = props;
    let notifications = [{text: "esto es una prueba"}]; // = getNotifications(userWebId)

    const notificationsComponent = notifications.map((notification, key) => {
        return (
            <Notification key={key} notification={notification}></Notification>
        );
    });
    return (
        <div id = "notifications-list-div">
            {notificationsComponent}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
      userWebId: state.auth.userWebId
    };
  };

export default connect(mapStateToProps)(NotificationsList);

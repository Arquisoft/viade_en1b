import React from "react";
import {NotificationsList} from "./notificationsList/NotificationsList";
import { connect } from "react-redux";
import { loadRoutesRequest } from "../../../store/actions/RouteActions";
export function Notifications(props) {
  return (
    <div data-testid = "notifications-div">
      <NotificationsList userWebId = {props.userWebId} loadRoutes = {props.loadRoutes} data-testid = "notifications-list" props={props}></NotificationsList>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userWebId: state.auth.userWebId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadRoutes: () => dispatch(loadRoutesRequest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);

import React from "react";
import styles from "./MyRoutes.module.css";
import RouteList from "../routeList/RouteList";
import RouteDetails from "../routeDetails/RouteDetails";
import { connect } from "react-redux";
import { showRoute } from "../../../store/actions/RouteActions";
import { LoggedIn, LoggedOut } from "@solid/react";
import { Redirect } from "react-router-dom";

export function MyRoutes(props) {
  const { routes } = props;
  const { selectedRoute } = props;
  const { showRoute } = props;

  return (
    <div className={styles.routesContainer}>
      <LoggedIn>
        <RouteList
          data-testid="myRoutes-route-list"
          style={styles.routeList}
          currentMap={selectedRoute}
          routes={routes}
          onClick={showRoute}
        />
        <RouteDetails
          data-testid="myRoutes-route-details"
          style={styles.routeDetails}
          selectedRoute={selectedRoute}
        ></RouteDetails>
      </LoggedIn>
      <LoggedOut>
        <Redirect to="/"></Redirect>
      </LoggedOut>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    routes: state.route.routes,
    selectedRoute: state.route.selectedRoute
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showRoute: route => dispatch(showRoute(route))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyRoutes);

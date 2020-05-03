import React from "react";
import MyMap from "./myMap/MyMap";
import style from "./Dashboard.module.css";
import RouteList from "./../routes/routeList/RouteList";
import { connect } from "react-redux";
import { showRoute } from "../../store/actions/RouteActions";
import { LoggedIn, LoggedOut } from "@solid/react";
import { Redirect } from "react-router-dom";
import { FormattedMessage } from "react-intl";

/**
 * Component to show the dashboard, showing the list of routes
 * and a map to show the selected route
 * @param {*} props 
 */
function Dashboard(props) {
  const { routes } = props;
  const { selectedRoute } = props;
  const { showRoute } = props;

  //header of the currently selected  route
  const currentSelectedMap =
    selectedRoute == null ? (
      <div data-testid="dashboard-header" className={style.titleHolder}>
        <h1>
          <FormattedMessage id="RoutesList" />
        </h1>
      </div>
    ) : (
      <div data-testid="dashboard-header" className={style.titleHolder}>
        <h1>{selectedRoute.name}</h1>{" "}
        <p>
          {" "}
          <FormattedMessage id="By" /> {selectedRoute.author}
        </p>
      </div>
    );

  //positions of the route
  const positions = selectedRoute == null ? {} : selectedRoute.positions;
  // center for the map
  const center =
    selectedRoute == null
      ? [43.360976539, -5.831938919]
      : selectedRoute.positions[selectedRoute.positions.length - 1];

  return (
    <div data-testid="dashboard-container" className={style.dashboard}>
      <LoggedIn>
        <RouteList
          currentMap={selectedRoute}
          routes={routes}
          onClick={showRoute}
          style={style.routeList}
        />
        <div className={style.mapContainer}>
          {currentSelectedMap}
          <MyMap style={style.myMap} center={center} positions={positions} />
        </div>
      </LoggedIn>
      <LoggedOut>
        <Redirect to="/"></Redirect>
      </LoggedOut>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    routes: state.route.routes,
    selectedRoute: state.route.selectedRoute,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showRoute: (route) => dispatch(showRoute(route)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

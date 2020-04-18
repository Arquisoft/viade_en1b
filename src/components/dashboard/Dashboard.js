import React from "react";
import MyMap from "./myMap/MyMap";
import "./Dashboard.css";
import RouteList from "./../routes/routeList/RouteList";
import { connect } from "react-redux";
import { showRoute } from "../../store/actions/RouteActions";
import { LoggedIn, LoggedOut } from "@solid/react";
import { Redirect } from "react-router-dom";

function Dashboard(props) {
  const { routes } = props;
  const { selectedRoute } = props;
  const { showRoute } = props;

  //header of the currently selected  route
  const currentSelectedMap =
    selectedRoute == null ? (
      <div data-testid="dashboard-header" id="titleHolder">
        <h1>Routes List</h1>
      </div>
    ) : (
      <div data-testid="dashboard-header" id="titleHolder">
        <h1>{selectedRoute.name}</h1> <p> by {selectedRoute.author}</p>
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
    <div data-testid="dashboard-container" className="dashboard">
      <LoggedIn>
        {currentSelectedMap}
        <RouteList
          currentMap={selectedRoute}
          routes={routes}
          onClick={showRoute}
        />
        <MyMap center={center} positions={positions} />
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

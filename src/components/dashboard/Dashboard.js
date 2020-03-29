import React from "react";
import MyMap from "./myMap/MyMap";
import "./Dashboard.css";
import RouteList from "./../routes/routeList/RouteList";
import { connect } from "react-redux";
import { showRoute, loadRoutesRequest } from "../../store/actions/RouteActions";
import { LoggedIn, LoggedOut } from "@solid/react";
import { Redirect } from "react-router-dom";
import {
  loadFriendsRequest,
  loadEmailRequest
} from "../../store/actions/UserActions";
import { useEffect } from "react";
import { useWebId } from "@solid/react";
import { updateWebId } from "../../store/actions/AuthActions";
import { contentLoaded } from "../../store/actions/LoadActions";
import { getWebId } from "../../solid/auth";


function Dashboard(props) {
  const { routes } = props;
  const { selectedRoute } = props;
  const { showRoute } = props;
  //console.log(selectedRoute)
  //getWebId().then(x=> console.log(x))

  //header of the currently selected  route
  let webId = null;
  getWebId().then(id => webId = id);
  useEffect(() => {
    if(!props.loaded) {
      props.updateWebId(webId);
      props.loadFriendsRequest();
      props.loadEmailRequest();
      props.loadRoutesRequest();
      props.contentLoaded();
    }
  }, [webId, props]);
  const currentSelectedMap =
    selectedRoute == null ? (
      <div id="titleHolder">
        <h1>Routes List</h1>
      </div>
    ) : (
      <div id="titleHolder">
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
    <div className="dashboard container">
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

const mapStateToProps = state => {
  return {
    routes: state.route.routes,
    selectedRoute: state.route.selectedRoute,
    loaded: state.control.loaded
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showRoute: route => dispatch(showRoute(route)),
    loadFriendsRequest: () => dispatch(loadFriendsRequest()),
    updateWebId: webId => dispatch(updateWebId(webId)),
    loadEmailRequest: () => dispatch(loadEmailRequest()),
    loadRoutesRequest: () => dispatch(loadRoutesRequest()),
    contentLoaded: () => dispatch(contentLoaded())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

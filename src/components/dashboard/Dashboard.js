import React from "react";
import MyMap from "./myMap/MyMap";
import "./Dashboard.css";
import RouteList from "./../routes/routeList/RouteList";
import { connect } from "react-redux";
import { showRoute } from "../../store/actions/RouteActions";
import { LoggedIn, LoggedOut } from "@solid/react";
import { Redirect } from "react-router-dom";
import { loadFriendsRequest } from "../../store/actions/UserActions";
import { useEffect } from "react";
import { useWebId } from "@solid/react";
import { updateWebId } from "../../store/actions/AuthActions";

function Dashboard(props) {
  const { routes } = props;
  const { selectedRoute } = props;
  const { showRoute } = props;
  //console.log(selectedRoute)
  //getWebId().then(x=> console.log(x))

  //header of the currently selected  route
  let webId = useWebId();
  useEffect(() => {
    props.updateWebId(webId);
    props.loadFriendsRequest();
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
    selectedRoute: state.route.selectedRoute
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showRoute: route => dispatch(showRoute(route)),
    loadFriendsRequest: () => dispatch(loadFriendsRequest()),
    updateWebId: webId => dispatch(updateWebId(webId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

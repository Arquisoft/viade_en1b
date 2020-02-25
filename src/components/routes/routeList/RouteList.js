import React from "react";
import RouteSummary from "./../routesummary/RouteSummary";
import './RouteList.css'

const RouteList = React.memo(({ routes, onClick, currentMap }) => {

  const summaries = routes.map((route, id) => {
    return (currentMap) ? <RouteSummary id={route.id === currentMap.id ? 'active' : ''} onClickHandle={onClick} route={route}></RouteSummary>
    : <RouteSummary onClickHandle={onClick} route={route}></RouteSummary>
  });
  return (
    <div id="routeList">
      {summaries}
    </div>
    
  );
})

export default RouteList
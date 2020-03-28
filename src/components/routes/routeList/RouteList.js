import React from "react";
import RouteSummary from "./../routeSummary/RouteSummary";
import styles from './RouteList.module.css'

export const RouteList = React.memo((props) => {

  const {routes} = props
  const {onClick} = props
  const {currentMap} = props
  const summaries = routes.map((route) => {
    return (currentMap) ? <RouteSummary data-testid="route-list-map" key={route.id} id={route.id === currentMap.id ? 'active' : ''} onClickHandle={onClick} route={route}></RouteSummary>
    : <RouteSummary data-testid="route-list-handler" key={route.id} onClickHandle={onClick} route={route}></RouteSummary>
  });

  return (
    <div data-testid="route-list-div" className={ props.style ? props.style : styles.routeList}>
      {summaries}
    </div>
  );
})


export default RouteList;
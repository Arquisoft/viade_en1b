import React from "react";
import RouteSummary from "./../routeSummary/RouteSummary";
import styles from './RouteList.module.css'

const RouteList = React.memo(({ routes, onClick, currentMap }) => {

  const summaries = routes.map((route) => {
    return (currentMap) ? <RouteSummary key={route.id} id={route.id === currentMap.id ? 'active' : ''} onClickHandle={onClick} route={route}></RouteSummary>
    : <RouteSummary key={route.id} onClickHandle={onClick} route={route}></RouteSummary>
  });
  return (
    <div className={ props.style ? props.style : styles.routeList}>
      {summaries}
    </div>
    
  );
})

export default RouteList
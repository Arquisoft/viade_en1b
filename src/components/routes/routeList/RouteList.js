import React, { useContext } from "react";
import RouteSummary from "./../routeSummary/RouteSummary";
import styles from "./RouteList.module.css";
import { connect } from "react-redux";
import Loader from "react-loader-spinner";
import { ThemeContext } from "../../layout/themeContext/ThemeContext";
import { FormattedMessage } from "react-intl";

export const RouteList = React.memo((props) => {
  const theme = useContext(ThemeContext);
  const { routes } = props;
  const { onClick } = props;
  const { currentMap } = props;
  console.log(routes);
  const summaries = routes.map((route) => {
    return currentMap ? (
      <RouteSummary
        data-testid="route-list-map"
        key={route.id}
        id={route.id === currentMap.id ? "active" : ""}
        onClickHandle={onClick}
        route={route}
      ></RouteSummary>
    ) : (
      <RouteSummary
        data-testid="route-list-handler"
        key={route.id}
        onClickHandle={onClick}
        route={route}
      ></RouteSummary>
    );
  });

  return (
    <div
      data-testid="route-list-div"
      className={props.style ? props.style : styles.routeList}
    >
      {props.loading ? (
        <Loader color={theme["--color-primary"]} type="Bars"></Loader>
      ) : summaries.length > 0 ? (
        summaries
      ) : (
        <span className={styles.noRoutes}>
          <FormattedMessage id="NoRoutes" />
        </span>
      )}
    </div>
  );
});

const mapStateToProps = (state) => {
  return {
    loading: state.route.routesLoading,
  };
};

export default connect(mapStateToProps)(RouteList);

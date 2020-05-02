import React from "react";
import style from "./GroupList.module.css";
import { useGroups } from "../../../../utils/hooks/hooks";
import { shareRoute } from "../../../../store/actions/RouteActions";
import { connect } from "react-redux";

export function GroupList() {
  let groups = [
    { name: "group1", friends: [] },
    { name: "group2", friends: [] },
    { name: "group3", friends: [] },
    { name: "group4", friends: [] },
    { name: "group5", friends: [] },
    { name: "group6", friends: [] },
  ]; /*useGroups()*/
  let groupList = groups.map((group, key) => {
    return <li key={key}>{group.name}</li>;
  });
  return (
    <div className={style.groupListContainer}>
      <h1>Groups</h1>
      <ul>{groupList}</ul>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userWebId: state.auth.userWebId,
    selectedRoute: state.route.selectedRoute,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    shareRoute: (selectedRoute, friends) =>
      dispatch(shareRoute(selectedRoute, friends)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupList);

import React from "react";
import style from "./GroupList.module.css";
import { useGroups } from "../../../../utils/hooks/hooks";

export function GroupList(props) {
  let groups = useGroups(props.userWebId);
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

export default GroupList;

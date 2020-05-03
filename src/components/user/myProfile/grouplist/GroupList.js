import React from "react";
import style from "./GroupList.module.css";
import { useGroups } from "../../../../utils/hooks/hooks";
import { FaUsers } from "react-icons/fa";
import { FormattedMessage } from "react-intl";

export function GroupList(props) {
  let groups = useGroups(props.userWebId);
  let groupList =
    groups.length === 0 ? (
      <span className={style.noGroupsContainer}>
        <FaUsers></FaUsers>
        <FormattedMessage id="NoGroups"></FormattedMessage>
      </span>
    ) : (
      groups.map((group, key) => {
        return <li key={key}>{group.name}</li>;
      })
    );
  return (
    <div className={style.groupListContainer}>
      <h1>Groups</h1>
      <ul>{groupList}</ul>
      <div className="buttons"></div>
    </div>
  );
}

export default GroupList;

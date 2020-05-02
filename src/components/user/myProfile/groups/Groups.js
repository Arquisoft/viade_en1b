import React from "react";
import style from "./Groups.module.css";
import { GroupList } from "../grouplist/GroupList";

export default function Groups() {
  return (
    <div className={style.groupsContainer}>
      <GroupList></GroupList>
    </div>
  );
}

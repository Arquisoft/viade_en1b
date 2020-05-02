import { useState, useEffect } from "react";
import { getNotifications } from "../../solid/routes";

export function useNotifications(userWebId) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (userWebId != null) {
      getNotifications(userWebId).then((notifications) => {
        setNotifications(notifications);
        console.log(notifications);
      });
    }
  }, [userWebId]);

  return notifications;
}

export function useComments(selectedRoute) {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    if (selectedRoute != null) {
      setComments(selectedRoute.comments);
    }
  }, [selectedRoute]);
  return comments;
}
export function useGroups(userWebId) {
  const [groups, setGroups] = useState({});
  /*  useEffect(() => {
    getGroups(userWebId).then(
      (groups) => {
        setGroups(groups);
      },
      [userWebId]
    );
  });
  */
  return groups;
}

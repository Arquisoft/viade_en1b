import { useState, useEffect } from "react";
import { getNotifications } from "../../solid/routes";

export function useNotifications(userWebId) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (userWebId != null) {
      getNotifications(userWebId).then((notifications) => {
        setNotifications(notifications);
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
  });
  return comments;
}

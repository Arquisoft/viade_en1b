import { useState, useEffect } from "react";
import { getNotifications } from "../../solid/routes";

export function useNotifications(userWebId) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getNotifications(userWebId).then((notifications) => {
      setNotifications(notifications);
    });
  }, [userWebId]);

  return notifications;
}

import React, {createContext, useCallback, useState} from "react";
import { IAlerts } from "../../../Types/AlertMessageTypes";

export interface INotificationsContextState {
  notifications: IAlerts[];
  setNotifications: (state: IAlerts[]) => void;
  newNotification: (
    message: string,
    severity: "error" | "warning" | "info" | "success"
  ) => void;
  removeNotification: (notification: IAlerts) => void;
}

export const NotificationsContext = createContext<INotificationsContextState>({
  notifications: [],
  setNotifications: (state: IAlerts[]) => { },
  newNotification: (
    message: string,
    severity: "error" | "warning" | "info" | "success"
  ) => { },
  removeNotification: (notification: IAlerts) => { },
});

export const NotificationsContainer = (props: any) => {
  const { children } = props;
  const [notifications, setNotifications] = useState<IAlerts[]>([]);

  /**
   * Adds a new notification to the notification array
   * @param message - the message you wish to be added to the notification (can be any type not just strings)
   * @param severity - must be "error"|"warning"|"info"|"success"
   */
  const newNotification = useCallback(
      (message: any,
       severity: "error" | "warning" | "info" | "success") => {
        if (typeof message != typeof "") {
          message = JSON.stringify(message);
        }
        setNotifications((notifications) => [
          ...notifications,
          {
            message: message,
            numberOfOccurrences: 1,
            severity: severity,
            notificationDate: new Date(),
          },
        ]);
      },
      [ setNotifications],
  );


  /**
   * Removes a notification from the notification array
   * @param notification - the Alert you wish to remove
   */
  const removeNotification = (notification: IAlerts): void => {
    setNotifications((notifications) => {
      let temp: IAlerts[] = [...notifications];
      let index: number = temp.indexOf(notification);
      temp.splice(index, 1);
      return temp;
    });
  };

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        setNotifications,
        newNotification,
        removeNotification,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

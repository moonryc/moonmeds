import React, {useContext, useEffect, useState} from 'react';
import {Snackbar, SnackbarOrigin} from "@mui/material";
import {NotificationsContext} from "../../../Context/NotificationsContext";
import {IAlerts} from "../../../../../Types/AlertMessageTypes";
import {Alert, AlertTitle} from "@mui/lab";


export interface State extends SnackbarOrigin {
    open: boolean;
}

/**
 * NotificationParent displays all notifications that the user has received
 * @constructor
 */
const NotificationsParent = () => {

    //region Context
    /**
     * gets the list of notifications from the notification context
     */
    const {notifications, removeNotification} = useContext(NotificationsContext);
    //endregion

    const [priorityNotification, setPriorityNotification] = useState<IAlerts | null>(null);

    const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string,) => {
        if (reason === 'clickaway') {
            return;
        }

        if (priorityNotification != null) {
            removeNotification(priorityNotification)
        }
    };


    useEffect(() => {
        let errorAlerts = notifications.filter(alert => alert.severity === "error")
        let warningAlerts = notifications.filter(alert => alert.severity === "warning");
        let infoAlerts = notifications.filter(alert => alert.severity === "info");
        let successAlerts = notifications.filter(alert => alert.severity === "success");

        if (errorAlerts.length > 0) {
            setPriorityNotification(errorAlerts[0])
        } else if (warningAlerts.length > 0 && errorAlerts.length == 0) {
            setPriorityNotification(warningAlerts[0])
        } else if (infoAlerts.length > 0 && errorAlerts.length == 0 && warningAlerts.length == 0) {
            setPriorityNotification(infoAlerts[0])
        } else if (successAlerts.length > 0 && errorAlerts.length == 0 && warningAlerts.length == 0 && infoAlerts.length == 0) {
            setPriorityNotification(successAlerts[0])
        } else {
            setPriorityNotification(null)
        }
        console.log(notifications)
    }, [notifications]);


    return (
        <div>
            {priorityNotification != null ?
                <Snackbar anchorOrigin={{vertical: "bottom", horizontal: "right"}} open={true} autoHideDuration={null}
                          onClose={handleClose}>
                    <Alert onClose={handleClose} severity={priorityNotification.severity} sx={{width: "100%"}}>
                        {priorityNotification.severity == "error" ? <AlertTitle>Error</AlertTitle> : <></>}
                        {priorityNotification.severity == "warning" ? <AlertTitle>Warning</AlertTitle> : <></>}
                        {priorityNotification.message}
                    </Alert>
                </Snackbar> : <></>
            }
        </div>
    );
};

export default NotificationsParent;

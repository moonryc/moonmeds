import React, {useContext, useEffect, useState} from 'react';
import {Snackbar, Stack} from "@mui/material";
import {ApiContext} from "../../../Context/ApiContext";
import {IAlerts} from "../../../../../Types/AlertMessageTypes";
import Alert from "@mui/material/Alert";
import CustomAlert from "./CustomAlert";
import {AlertTitle} from "@mui/lab";
import {NotificationsContext} from "../../../Context/NotificationsContext";

/**
 * NotificationParent displays all notifications that the user has received
 * @constructor
 */
const NotificationsParent = () => {

    //region Context
    /**
     * gets the list of notifications from the notification context
     */
    const {notifications} = useContext(NotificationsContext);
    //endregion

    return (
        <div>
            <Stack sx={{width: "100%"}} spacing={2}>
                {notifications.map((alert:IAlerts)=>{
                    return <CustomAlert alert={alert}/>
                })}
            </Stack>
        </div>
    );
};

export default NotificationsParent;

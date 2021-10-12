import React, {useContext, useEffect, useState} from 'react';
import {Snackbar, Stack} from "@mui/material";
import {Alert, AlertTitle} from "@mui/lab";
import {NotificationsContext} from "../../../Context/NotificationsContext";
import {IAlerts} from "../../../../../Types/AlertMessageTypes";

interface ICustomAlertProps {
    alert:IAlerts
}

/**
 *
 * @param props - {alert:IAlerts}
 * @constructor
 */
const CustomAlert = (props:ICustomAlertProps) => {

    if(props.alert.severity=="success"){
        setTimeout( ()=>{
            removeNotification(props.alert)
        },20000)
    }

    //region Context
    /**
     * Notifications context, gets the function to remove remove notifications
     */
    const {removeNotification} = useContext(NotificationsContext);
    //endregion

    return (
        <div>
            <Alert onClose={()=>removeNotification(props.alert)} severity={props.alert.severity} variant={"filled"}>
                {props.alert.severity == "error"? <AlertTitle>Error</AlertTitle>:<></>}
                {props.alert.severity == "warning"? <AlertTitle>Warning</AlertTitle>:<></>}

                {props.alert.message}
            </Alert>
        </div>
    );
};

export default CustomAlert;

import React from 'react';
import {IconButton} from "@mui/material";
import {ArrowBack, ArrowForward} from "@mui/icons-material";

interface ICalendarHeaderProps {
    goForwardAMonth():void,
    goBackAMonth():void,
    month:Date
}


const CalendarHeader = (props:ICalendarHeaderProps) => {


    return (
        <div>
            <IconButton onClick={()=>props.goBackAMonth()}>
                <ArrowBack/>
            </IconButton>
            <>{props.month.toDateString()}</>
            <IconButton onClick={()=>props.goForwardAMonth()}>
                <ArrowForward/>
            </IconButton>
        </div>
    );
};

export default CalendarHeader;

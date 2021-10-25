import React from 'react';
import {Box, IconButton} from "@mui/material";
import {ArrowBack, ArrowForward} from "@mui/icons-material";
import {subTextStyle} from "../../../Styles";

interface ICalendarHeaderProps {
    goForwardAMonth():void,
    goBackAMonth():void,
    month:Date
}



const CalendarHeader = (props:ICalendarHeaderProps) => {

    return (
        <Box sx={{position:'absolute', left:'0', right:'0', textAlign: 'center', top:'2%'}}>
            <IconButton onClick={()=>props.goBackAMonth()}>
                <ArrowBack sx={subTextStyle}/>
            </IconButton>
            <>{props.month.toDateString()}</>
            <IconButton onClick={()=>props.goForwardAMonth()}>
                <ArrowForward sx={subTextStyle}/>
            </IconButton>
        </Box>
    );
};

export default CalendarHeader;

import React from 'react';
import {Box, IconButton, Typography} from "@mui/material";
import {ArrowBack, ArrowForward} from "@mui/icons-material";
import {centeredTextStyle, subTextStyle} from "../../../Styles";

interface ICalendarHeaderProps {
    goForwardAMonth():void,
    goBackAMonth():void,
    month:Date
}



const CalendarHeader = (props:ICalendarHeaderProps) => {

    return (
        <Typography sx={{...centeredTextStyle, textAlign:['right','right','right','center'], fontSize:['2vw'], overflow:'visible'}}>
            <IconButton onClick={()=>props.goBackAMonth()}>
                <ArrowBack sx={subTextStyle}/>
            </IconButton>
            <>{props.month.toDateString()}</>
            <IconButton onClick={()=>props.goForwardAMonth()}>
                <ArrowForward sx={subTextStyle}/>
            </IconButton>
        </Typography>
    );
};

export default CalendarHeader;

import React from 'react';
import {IconButton} from "@mui/material";
import {ArrowBack, ArrowForward} from "@mui/icons-material";
import {makeStyles} from "@mui/styles";

interface ICalendarHeaderProps {
    goForwardAMonth():void,
    goBackAMonth():void,
    month:Date
}

const useStyles = makeStyles((theme?: any) => ({

    leftArrow:{
        color: theme.palette.text.primary
    },
    rightArrow:{
        color: theme.palette.text.primary
    },
}));


const CalendarHeader = (props:ICalendarHeaderProps) => {
    const classes = useStyles();

    return (
        <div>
            <IconButton onClick={()=>props.goBackAMonth()}>
                <ArrowBack className={classes.leftArrow}/>
            </IconButton>
            <>{props.month.toDateString()}</>
            <IconButton onClick={()=>props.goForwardAMonth()}>
                <ArrowForward className={classes.rightArrow}/>
            </IconButton>
        </div>
    );
};

export default CalendarHeader;

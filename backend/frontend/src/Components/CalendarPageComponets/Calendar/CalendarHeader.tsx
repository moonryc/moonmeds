import React from 'react';
import {Box, IconButton} from "@mui/material";
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
        <Box sx={{position:'absolute', left:'0', right:'0', textAlign: 'center', top:'2%'}}>
            <IconButton onClick={()=>props.goBackAMonth()}>
                <ArrowBack className={classes.leftArrow}/>
            </IconButton>
            <>{props.month.toDateString()}</>
            <IconButton onClick={()=>props.goForwardAMonth()}>
                <ArrowForward className={classes.rightArrow}/>
            </IconButton>
        </Box>
    );
};

export default CalendarHeader;

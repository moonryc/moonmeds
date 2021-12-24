import {ArrowBack, ArrowForward} from "@mui/icons-material";
import {Box, IconButton, Typography, useMediaQuery} from "@mui/material";
import React from "react";
import {centeredTextStyle, flexWrapperStyle, subTextStyle} from "../../../Styles";

interface ICalendarHeaderProps {
    goForwardAMonth(): void;

    goBackAMonth(): void;

    month: Date;
}

const CalendarHeader = (props: ICalendarHeaderProps) => {
    const xs = useMediaQuery('(max-width:1199px)');
    return (
        <Box sx={{...flexWrapperStyle,flexDirection:'row'}}>
            <Typography
                sx={{
                    width: '100%',
                    ...centeredTextStyle,
                    textAlign: "center",
                    fontSize: ['15px'],
                }}
                variant={'body2'}
            >
                <IconButton onClick={() => props.goBackAMonth()}>
                    <ArrowBack sx={{...subTextStyle, fontSize: ['15px']}}/>
                </IconButton>
                <>{props.month.toDateString()}</>
                <IconButton onClick={() => props.goForwardAMonth()}>
                    <ArrowForward sx={{...subTextStyle, fontSize: ['15px']}}/>
                </IconButton>
            </Typography>
            
        </Box>
    );
};

export default CalendarHeader;

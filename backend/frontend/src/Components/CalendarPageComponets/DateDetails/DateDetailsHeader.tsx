import React, {useMemo} from 'react';
import {ICalendarDay} from "../../../../../Types/CalendarType";
import {toDate} from "date-fns";
import {Typography} from "@mui/material";

const DateDetailsHeader = (props:ICalendarDay) => {

    const date = useMemo(() => toDate(props.date).toDateString(), [props.date])

    return (
        <div>
            <Typography>Header</Typography>
            <Typography>{date}</Typography>
        </div>
    );
};

export default DateDetailsHeader;

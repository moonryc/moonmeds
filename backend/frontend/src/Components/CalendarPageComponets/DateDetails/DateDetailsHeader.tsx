import React, {useMemo} from 'react';
import {ICalendarDay} from "../../../../../Types/CalendarType";
import {toDate} from "date-fns";

const DateDetailsHeader = (props:ICalendarDay) => {

    const date = useMemo(() => toDate(props.date).toDateString(), [props.date])

    return (
        <div>
            <h6>Header</h6>
            <h6>{date}</h6>
        </div>
    );
};

export default DateDetailsHeader;

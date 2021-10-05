import React from 'react';
import {ICalendarDay} from "../../../../../Types/CalendarType";
import {Typography} from "@mui/material";

const DateDetailsMedicationToTake = (props:ICalendarDay) => {
    return (
        <div>
            <Typography>Medications to take</Typography>
        </div>
    );
};

export default DateDetailsMedicationToTake;

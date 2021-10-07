import React, {useContext} from 'react';
import {ICalendarDay} from "../../../../../Types/CalendarType";
import {Typography} from "@mui/material";
import {CalendarContext} from "../../../Context/CalendarContext";
import {format, parseISO} from "date-fns";

const DateDetailsMedicationToTake = (props:ICalendarDay) => {

    const {selectedDayDetails} = useContext(CalendarContext);

    return (
        <div>
            <Typography>Medications to take</Typography>
            {
                selectedDayDetails.map(medicationDosage=>

                    {return !medicationDosage.hasBeenTaken ? <>{medicationDosage.prescriptionName}: {medicationDosage.amount} is scheduled to be taken at {format(parseISO(medicationDosage.time.toString()),'hh:mm aa').toString()}<br/></>:<></>}

                )}
        </div>
    );
};

export default DateDetailsMedicationToTake;

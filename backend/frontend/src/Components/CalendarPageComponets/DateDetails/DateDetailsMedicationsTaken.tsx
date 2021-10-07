import React, {useContext} from 'react';
import {ICalendarDay} from "../../../../../Types/CalendarType";
import {Typography} from "@mui/material";
import {CalendarContext} from "../../../Context/CalendarContext";

const DateDetailsMedicationsTaken = (props:ICalendarDay) => {

    const {selectedDayDetails} = useContext(CalendarContext);

    return (
        <div>
            <Typography>Medications Taken</Typography>
            {
                selectedDayDetails.map(medicationDosage=>

                {return medicationDosage.hasBeenTaken ? <>medicationDosage.prescriptionName +":"+ medicationDosage.amount+" has been taken"</>:<></>}

            )}
        </div>
    );
};

export default DateDetailsMedicationsTaken;

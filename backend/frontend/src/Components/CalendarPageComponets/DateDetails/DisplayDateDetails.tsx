import React, {useContext, useMemo} from 'react';
import DateDetailsHeader from "./DateDetailsHeader";
import DateDetailsMedicationsTaken from "./DateDetailsMedicationsTaken";
import DateDetailsMedicationToTake from "./DateDetailsMedicationToTake";
import DateDetailsMissedMedications from "./DateDetailsMissedMedications";
import DateDetailsMedicationToRefill from "./DateDetailsMedicationToRefill";
import {ICalendarDay} from "../../../../../Types/CalendarType";
import {Box, Typography} from "@mui/material";
import {format, parseISO, toDate} from "date-fns";
import {CalendarContext} from "../../../Context/CalendarContext";


interface IDisplayDateDetailsProp {
    selectedDate:ICalendarDay
}



const DisplayDateDetails = (props:IDisplayDateDetailsProp) => {

    const date = useMemo(() => toDate(props.selectedDate.date).toDateString(), [props.selectedDate.date])
   //
    const {selectedDayDetails} = useContext(CalendarContext);
   //

    return (
        <Box sx={{ maxHeight: '70vh', overflow: 'auto'}}>





            {/*<DateDetailsHeader index={0} date={props.selectedDate.date}/>*/}

                <Typography variant={'h5'}>{date.toString()}</Typography>
            {/*<DateDetailsMedicationsTaken index={0} date={props.selectedDate.date}/>*/}
            <Typography>Medications Taken</Typography>
            <Typography variant={'body2'} sx={{color:'text.secondary'}}>{
                selectedDayDetails.map(medicationDosage => {
                        return medicationDosage.hasBeenTaken ?
                            <p key={medicationDosage._id}>medicationDosage.prescriptionName +":"+ medicationDosage.amount+"
                                has been taken"</p> : <p key={medicationDosage.prescriptionName+medicationDosage.time}></p>
                    }
                )}
            </Typography>

            {/*<DateDetailsMedicationToTake index={0} date={props.selectedDate.date}/>*/}
            <Typography>Medications to take</Typography>
            <Typography variant={'body2'} sx={{color:'text.secondary'}}>{
                selectedDayDetails.map(medicationDosage => {
                        return !medicationDosage.hasBeenTaken ?
                            <p key={medicationDosage._id}>{medicationDosage.prescriptionName}: {medicationDosage.amount} is
                                scheduled to be taken
                                at {format(parseISO(medicationDosage.time.toString()), 'hh:mm aa').toString()}<br/></p> :
                            <p key={medicationDosage.prescriptionName+medicationDosage.time}></p>
                    }
                )}
            </Typography>
            {/*<DateDetailsMissedMedications index={0} date={props.selectedDate.date}/>*/}
            <Typography>Missed Medications</Typography>
            {/*<DateDetailsMedicationToRefill index={0} date={props.selectedDate.date}/>*/}
            <Typography>Medication to refill</Typography>
        </Box>
    );
};

export default DisplayDateDetails;

import React from 'react';
import DateDetailsHeader from "./DateDetailsHeader";
import DateDetailsMedicationsTaken from "./DateDetailsMedicationsTaken";
import DateDetailsMedicationToTake from "./DateDetailsMedicationToTake";
import DateDetailsMissedMedications from "./DateDetailsMissedMedications";
import DateDetailsMedicationToRefill from "./DateDetailsMedicationToRefill";
import {ICalendarDay} from "../../../Types/CalendarType";


interface IDisplayDateDetailsProp {
    selectedDate:ICalendarDay
}


const DisplayDateDetails = (props:IDisplayDateDetailsProp) => {
    return (
        <div>
            <DateDetailsHeader index={0} date={props.selectedDate.date}/>
            <DateDetailsMedicationsTaken index={0} date={props.selectedDate.date}/>
            <DateDetailsMedicationToTake index={0} date={props.selectedDate.date}/>
            <DateDetailsMissedMedications index={0} date={props.selectedDate.date}/>
            <DateDetailsMedicationToRefill index={0} date={props.selectedDate.date}/>
        </div>
    );
};

export default DisplayDateDetails;

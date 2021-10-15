import React, {useContext, useMemo} from 'react';
import {ICalendarDay} from "../../../../../Types/CalendarType";
import {Box, Typography} from "@mui/material";
import {toDate} from "date-fns";
import {CalendarContext} from "../../../Context/CalendarContext";
import MedicationDosageDetails from "../../Misc/MedicationDosageDetails";


interface IDisplayDateDetailsProp {
    selectedDate: ICalendarDay
}


const DisplayDateDetails = (props: IDisplayDateDetailsProp) => {

    const date = useMemo(() => toDate(props.selectedDate.date).toDateString(), [props.selectedDate.date])
    //
    const {selectedDayDetails} = useContext(CalendarContext);
    //

    return (
        <Box sx={{maxHeight: '70vh', overflow: 'auto'}}>

            <Typography variant={'h5'}>
                {date.toString()}
            </Typography>

            <Typography>
                Medications Taken
            </Typography>
            <Typography variant={'body2'} sx={{color: 'text.secondary'}}>
                {selectedDayDetails.map(medicationDosage => {
                        return medicationDosage.hasBeenTaken ?
                            <>
                                <MedicationDosageDetails
                                    medication={medicationDosage}
                                    medicationTaken={true}
                                    medicationToTake={false}
                                    missedMedications={false}
                                    upcomingRefill={false}/>

                                <br/>
                            </> :
                            <p key={medicationDosage.prescriptionName + medicationDosage.time}></p>
                    }
                )}
            </Typography>

            {/*<DateDetailsMedicationToTake index={0} date={props.selectedDate.date}/>*/}
            <Typography>
                Medications to take
            </Typography>
            <Typography variant={'body2'} sx={{color: 'text.secondary'}}>
                {selectedDayDetails.map(medicationDosage => {
                        return !medicationDosage.hasBeenTaken && !medicationDosage.isLateToTakeMedication ?
                            <>
                                <MedicationDosageDetails
                                    medication={medicationDosage}
                                    medicationTaken={false}
                                    medicationToTake={true}
                                    missedMedications={false}
                                    upcomingRefill={false}/>
                                <br/>
                                {/*//TODO TRAVIS ADD PADDING*/}
                            </> :
                            <p key={medicationDosage.prescriptionName + medicationDosage.time}></p>
                    }
                )}
            </Typography>
            <Typography>
                Missed Medications
            </Typography>
            <Typography variant={'body2'} sx={{color: 'text.secondary'}}>
                {selectedDayDetails.map(medicationDosage => {
                        return medicationDosage.isLateToTakeMedication ?
                            <>
                                <MedicationDosageDetails
                                    medication={medicationDosage}
                                    medicationTaken={false}
                                    medicationToTake={false}
                                    missedMedications={true}
                                    upcomingRefill={false}/>
                                <br/>
                                {/*//TODO TRAVIS ADD PADDING*/}
                            </> :
                            <p key={medicationDosage.prescriptionName + medicationDosage.time}></p>
                    }
                )}
            </Typography>
            <Typography>
                Medication to refill
            </Typography>
            <Typography variant={'body2'} sx={{color: 'text.secondary'}}>
                {selectedDayDetails.map(medicationDosage => {
                        return(<>
                            <MedicationDosageDetails
                                medication={medicationDosage}
                                medicationTaken={false}
                                medicationToTake={false}
                                missedMedications={false}
                                upcomingRefill={true}/>
                            <br/>
                            {/*//TODO TRAVIS ADD PADDING*/}
                        </>)
                    }
                )}
            </Typography>
        </Box>
    );
};

export default DisplayDateDetails;

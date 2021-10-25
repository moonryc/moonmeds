import React, {useContext, useMemo} from 'react';
import {ICalendarDay} from "../../../../../Types/CalendarType";
import {Box, Typography} from "@mui/material";
import {toDate} from "date-fns";
import {CalendarContext} from "../../../Context/CalendarContext";
import MedicationDosageDetails from "../../Misc/MedicationDosageDetails";
import {centeredTextStyle, titleStyle} from "../../../Styles";


interface IDisplayDateDetailsProp {
    selectedDate: ICalendarDay
}


const DisplayDateDetails = (props: IDisplayDateDetailsProp) => {

    const date = useMemo(() => toDate(props.selectedDate.date).toDateString(), [props.selectedDate.date])
    //
    const {selectedDayDetails} = useContext(CalendarContext);
    //

    return (
        <Box sx={{height: '74vh', overflow: 'auto', padding:'3vh'}}>
            <Typography variant={'h4'} sx={{...titleStyle, ...centeredTextStyle}}> Date Details</Typography>
            <Typography variant={'h5'}>
                {date.toString()}
            </Typography>

            <Typography>
                Medications Taken
            </Typography>
            <Typography variant={'body2'} sx={{fontSize:'25px', color: 'text.primary', }}>
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
                            <p key={medicationDosage.prescriptionName + medicationDosage.timeToTake}></p>
                    }
                )}
            </Typography>

            {/*<DateDetailsMedicationToTake index={0} date={props.selectedDate.date}/>*/}
            <Typography>
                Medications to take
            </Typography>
            <Typography variant={'body2'} sx={{fontSize:'25px', color: 'text.primary', }}>
                {selectedDayDetails.map(medicationDosage => {
                        return !medicationDosage.hasBeenTaken && !medicationDosage.hasBeenMissed ?
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
                            <p key={medicationDosage.prescriptionName + medicationDosage.timeToTake}></p>
                    }
                )}
            </Typography>
            <Typography>
                Missed Medications
            </Typography>
            <Typography variant={'body2'} sx={{fontSize:'25px', color: 'text.primary', }}>
                {selectedDayDetails.map(medicationDosage => {
                        return medicationDosage.hasBeenMissed ?
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
                            <Typography key={medicationDosage.prescriptionName + medicationDosage.timeToTake}></Typography>
                    }
                )}
            </Typography>
            <Typography>
                Medication to refill
            </Typography>
            <Typography variant={'body2'} sx={{fontSize:'25px', color: 'text.primary', }}>
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

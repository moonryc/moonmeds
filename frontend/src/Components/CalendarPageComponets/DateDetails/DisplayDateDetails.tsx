import React, {useContext, useMemo} from 'react';
import {ICalendarDay} from "../../../../../Types/CalendarType";
import {Accordion, AccordionDetails, AccordionSummary, Box, Typography} from "@mui/material";
import {toDate} from "date-fns";
import {CalendarContext} from "../../../Context/CalendarContext";
import MedicationDosageDetails from "../../Misc/MedicationDosageDetails";
import {centeredTextStyle, titleStyle} from "../../../Styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


interface IDisplayDateDetailsProp {
    selectedDate: ICalendarDay
}


const DisplayDateDetails = (props: IDisplayDateDetailsProp, ) => {

    const date = useMemo(() => toDate(props.selectedDate.date).toDateString(), [props.selectedDate.date])
    //
    const {selectedDayDetails} = useContext(CalendarContext);
    //

    console.log(selectedDayDetails)

    return (
        <Box sx={{height: '74vh', overflow: 'auto', padding:'3vh'}}>
            <Typography variant={'h4'} sx={{...titleStyle, ...centeredTextStyle}}> Date Details</Typography>
            <Typography variant={'h5'}>
                {date.toString()}
            </Typography>

            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Medications Taken</Typography>
                </AccordionSummary>
                <AccordionDetails>
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
                                    <span key={Math.random()}/>
                            }
                        )}
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Medications To Take</Typography>
                </AccordionSummary>
                <AccordionDetails>
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
                                    <span key={Math.random()}/>
                            }
                        )}
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Missed Medications</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography variant={'body2'} sx={{fontSize:'25px', color: 'text.primary', }}>
                        {selectedDayDetails.map(medicationDosage => {
                                return medicationDosage.hasBeenMissed && !medicationDosage.hasBeenTaken ?
                                    <>
                                        <MedicationDosageDetails
                                            medication={medicationDosage}
                                            medicationTaken={false}
                                            medicationToTake={false}
                                            missedMedications={true}
                                            upcomingRefill={false}/>
                                        <br/>
                                    </> :
                                    <span key={Math.random()}/>
                            }
                        )}
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Medications To Refill</Typography>
                </AccordionSummary>
                <AccordionDetails>
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
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default DisplayDateDetails;

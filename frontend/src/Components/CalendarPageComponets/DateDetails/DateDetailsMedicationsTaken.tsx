import React, {useContext} from 'react';
import {ICalendarDay} from "../../../../../Types/CalendarType";
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import {CalendarContext} from "../../../Context/CalendarContext";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const DateDetailsMedicationsTaken = (props: ICalendarDay) => {

    const {selectedDayDetails} = useContext(CalendarContext);



    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Medications Taken</Typography>
                </AccordionSummary>
                <AccordionDetails>test
                    {/*<Typography>*/}
                    {/*    {*/}
                    {/*        selectedDayDetails.map(medicationDosage => {*/}
                    {/*                return medicationDosage.hasBeenTaken ?*/}
                    {/*                    <p key={medicationDosage.dosageId}>medicationDosage.prescriptionName +":"+ medicationDosage.amount+"*/}
                    {/*                        has been taken"</p> : <p key={medicationDosage.prescriptionName+medicationDosage.timeToTake}></p>*/}
                    {/*            }*/}
                    {/*        )}*/}
                    {/*</Typography>*/}
                </AccordionDetails>
            </Accordion>
            <Typography>Medications Taken</Typography>
            {
                selectedDayDetails.map(medicationDosage => {
                        return medicationDosage.hasBeenTaken ?
                            <p key={medicationDosage.dosageId}>medicationDosage.prescriptionName +":"+ medicationDosage.amount+"
                                has been taken"</p> : <p key={medicationDosage.prescriptionName+medicationDosage.timeToTake}></p>
                    }
                )}
        </div>
    );
};

export default DateDetailsMedicationsTaken;

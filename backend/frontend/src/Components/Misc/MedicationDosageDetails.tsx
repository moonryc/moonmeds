import React, {useContext, useState} from 'react';
import {Box, Button} from "@mui/material";
import {IMedicationDosagesSchema} from "../../../../Types/MedicationType";
import {differenceInDays, format, parseISO} from "date-fns";
import {render} from "react-dom";
import {ApiContext} from "../../Context/ApiContext";

interface IMedicationDosageDetails {
    medication: IMedicationDosagesSchema,
    medicationTaken: boolean,
    medicationToTake: boolean,
    missedMedications: boolean
    upcomingRefill: boolean
}

const MedicationDosageDetails = (props: IMedicationDosageDetails) => {

    const {putUpdateMedicationDosageTaken} = useContext(ApiContext);

    const prefix = props.medication.prescriptionName + " | " + props.medication.prescriptionName + " : " + props.medication.amount
    const numberOfDaysBeforeRefill = differenceInDays(new Date(props.medication.nextFillDay),new Date(props.medication.time));




    const hasBeenTaken = () => {
        return (
            <>
                <Box sx={{bgcolor: "green", width: "100%", height: 60, borderRadius: 2}}>
                    {prefix + " was taken"}
                    <Button variant={"contained"} sx={{ml: "85%"}}>Undo</Button>
                </Box>
            </>
        )
    }

    const toBeTaken = () => {
        return (
            <>
                <Box sx={{bgcolor: "orange", width: "100%", height: 60, borderRadius: 2}}>
                    {prefix + " is scheduled to be taken at " + format(parseISO(props.medication.time.toString()), 'hh:mm aa').toString()}
                    <Button variant={"contained"} sx={{ml: "80%"}}>Mark as Taken</Button>
                </Box>
            </>
        )
    }

    //TODO TRAVIS CSS
    const missedMedicationText = () => {
        return (
            <>
                <Box sx={{bgcolor: "red", width: "100%", height: 60, borderRadius: 2}}>
                    {prefix + " was missed at " + format(parseISO(props.medication.time.toString()), 'hh:mm aa').toString()}

                    <Button variant={"contained"} sx={{ml: "75%"}}>Mark as taken</Button>
                </Box>
            </>
        )
    }

    const refillReminder = () => {
        return (
            <>
                <Box sx={{bgcolor: "blue", width: "100%", height: 60, borderRadius: 2}}>
                    {prefix + " is ready for a refill in " + differenceInDays(new Date(props.medication.nextFillDay),new Date()) + " days"}
                    {/*<Button variant={"contained"} sx={{ml: "75%"}}>Refill</Button>*/}
                </Box>
            </>
        )
    }


    return (
        <div>
            {props.medicationTaken ? hasBeenTaken() : <></>}
            {props.medicationToTake ? toBeTaken() : <></>}
            {props.missedMedications ? missedMedicationText() : <></>}
            {props.upcomingRefill && numberOfDaysBeforeRefill <= 7 ? refillReminder() : <></>}
        </div>
    );
};

export default MedicationDosageDetails;

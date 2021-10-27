import React, {useContext, useState} from 'react';
import {Box, Button, Typography} from "@mui/material";
import {IMedicationDosagesBase} from "../../../../Types/MedicationDosagesTypes";
import {differenceInDays, format, parseISO} from "date-fns";
import {render} from "react-dom";
import {ApiContext} from "../../Context/ApiContext";

interface IMedicationDosageDetails {
    medication: IMedicationDosagesBase,
    medicationTaken: boolean,
    medicationToTake: boolean,
    missedMedications: boolean
    upcomingRefill: boolean
}

const MedicationDosageDetails = (props: IMedicationDosageDetails) => {

    //TODO make this functional
    const {putUpdateMedicationDosage} = useContext(ApiContext);

    const prefix = props.medication.medicationOwner + " | " + props.medication.prescriptionName + " : " + props.medication.amount
    const numberOfDaysBeforeRefill = differenceInDays(new Date(props.medication.nextFillDay),new Date(props.medication.timeToTake));




    const hasBeenTaken = () => {
        return (
            <>
                <Box sx={{bgcolor: "green", width: "100%", height: 60, borderRadius: 2, position:'relative'}}>
                    <Typography sx={{marginLeft:'1vh',fontSize:'20px', top:'22.5%',position:'absolute'}}>{prefix + " was taken"}</Typography>
                    <Button variant={"contained"} sx={{position:'absolute', right: "2.5%", top:'20%'}}>Undo</Button>
                </Box>
            </>
        )
    }

    const toBeTaken = () => {
        return (
            <>
                <Box sx={{bgcolor: "orange", width: "100%", height: 60, borderRadius: 2, position:'relative'}}>
                    <Typography sx={{marginLeft:'1vh',fontSize:'20px', top:'22.5%',position:'absolute'}}>{prefix + " is scheduled to be taken at " + format(parseISO(props.medication.timeToTake.toString()), 'hh:mm aa').toString()}</Typography>
                    <Button variant={"contained"} sx={{position:'absolute', right: "2.5%", top:'20%'}}>Mark as Taken</Button>
                </Box>
            </>
        )
    }

    //TODO TRAVIS CSS
    const missedMedicationText = () => {
        return (
            <>
                <Box sx={{bgcolor: "red", width: "100%", height: 60, borderRadius: 2, position:'relative'}}>
                    <Typography sx={{marginLeft:'1vh',fontSize:'20px', top:'22.5%',position:'absolute'}}>{prefix + " was missed at " + format(parseISO(props.medication.timeToTake.toString()), 'hh:mm aa').toString()}</Typography>

                    <Button variant={"contained"} sx={{position:'absolute', right: "2.5%", top:'20%'}}>Mark as taken</Button>
                </Box>
            </>
        )
    }

    const refillReminder = () => {
        return (
            <>
                <Box sx={{bgcolor: "blue", width: "100%", height: 60, borderRadius: 2, position:'relative'}}>
                    <Typography sx={{marginLeft:'1vh',fontSize:'20px', top:'22.5%',position:'absolute'}}>{prefix + " is ready for a refill in " + differenceInDays(new Date(props.medication.nextFillDay),new Date()) + " days"}</Typography>
                    <Button variant={"contained"} sx={{position:'absolute', right: "2.5%", top:'20%'}}>Refill</Button>
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

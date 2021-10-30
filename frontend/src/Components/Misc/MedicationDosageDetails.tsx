import React, {useContext, useEffect, useState} from 'react';
import {Accordion, AccordionDetails, AccordionSummary, Box, Button, Chip, chipClasses, Typography} from "@mui/material";
import {IMedicationDosagesBase} from "../../../../Types/MedicationDosagesTypes";
import {differenceInDays, format, parseISO} from "date-fns";
import {render} from "react-dom";
import {ApiContext} from "../../Context/ApiContext";
import {UserContext} from "../../Context/UserContext";
import {Face} from "@mui/icons-material";
import MedicationIcon from '@mui/icons-material/Medication';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

    const {usersPeople} = useContext<any>(UserContext);
    const [color, setColor] = useState<string>("secondary");

    useEffect(() => {
        getPersonColor()
        console.log(color)
    }, []);

    useEffect(()=> {
        getPersonColor()
    },[usersPeople])


    const getPersonColor = () => {
        for( let person of usersPeople){
            if(props.medication.medicationOwner == person.name){
                return setColor(person.color)
            }
        }
        return setColor("secondary")
    }


    const owner = <Chip sx={{backgroundColor:color}} icon={<Face/>} label={props.medication.medicationOwner} />
    const medication = <Chip sx={{backgroundColor:color}} icon={<MedicationIcon/>} label={props.medication.prescriptionName}/>
    const prefix = " | " + props.medication.amount
    const numberOfDaysBeforeRefill = differenceInDays(new Date(props.medication.nextFillDay),new Date(props.medication.timeToTake));




    const hasBeenTaken = () => {
        return (
            <>
                <Box sx={{bgcolor: "green", width: "100%", height: 60, borderRadius: 2, position:'relative'}}>
                    <Typography sx={{marginLeft:'1vh',fontSize:'20px', top:'22.5%',position:'absolute'}}>{owner}{" | "}{medication}{" | Dosage was taken at "}{format(parseISO(props.medication.timeTaken), 'h:mm aa')}</Typography>
                    <Button variant={"contained"} sx={{position:'absolute', right: "2.5%", top:'20%'}} onClick={()=>putUpdateMedicationDosage(props.medication.dosageId,false,props.medication.hasBeenMissed,new Date())}>Undo</Button>
                </Box>
            </>
        )
    }

    const toBeTaken = () => {
        return (
            <>
                <Box sx={{bgcolor: "orange", width: "100%", height: 60, borderRadius: 2, position:'relative'}}>
                    <Typography sx={{marginLeft:'1vh',fontSize:'20px', top:'22.5%',position:'absolute'}}>{owner}{" | "}{medication}{" | Dosage to be taken at " }{format(parseISO(props.medication.timeToTake.toString()), 'h:mm aa').toString()}</Typography>
                    <Button variant={"contained"} sx={{position:'absolute', right: "2.5%", top:'20%'}} onClick={()=>putUpdateMedicationDosage(props.medication.dosageId,true,props.medication.hasBeenMissed,new Date())}>Mark as Taken</Button>
                </Box>
            </>
        )
    }

    const missedMedicationText = () => {
        return (
            <>
                <Box sx={{bgcolor: "red", width: "100%", height: 60, borderRadius: 2, position:'relative'}}>
                    <Typography sx={{marginLeft:'1vh',fontSize:'20px', top:'22.5%',position:'absolute'}}>{owner}{" | "}{medication}{" | Dosage was missed at " }{format(parseISO(props.medication.timeToTake.toString()), 'h:mm aa').toString()}</Typography>
                    <Button variant={"contained"} sx={{position:'absolute', right: "2.5%", top:'20%'}} onClick={()=>putUpdateMedicationDosage(props.medication.dosageId,true,props.medication.hasBeenMissed,new Date())}>Mark as taken</Button>
                </Box>
            </>
        )
    }

    const refillReminder = () => {
        return (
            <>
                <Box sx={{bgcolor: "blue", width: "100%", height: 60, borderRadius: 2, position:'relative'}}>
                    <Typography sx={{marginLeft:'1vh',fontSize:'.75vw', top:'22.5%',position:'absolute'}}>{owner}{" | "}{medication}{" | refill in " + differenceInDays(new Date(props.medication.nextFillDay),new Date()) + " days"}</Typography>
                    <Button variant={"contained"} sx={{position:'absolute', right: "2.5%", top:'20%'}}>Refill</Button>
                </Box>
            </>
        )
    }


    return (
        <div>
            {/*<Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Has Been Taken</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {props.medicationTaken ? hasBeenTaken() : <></>}
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>Medication To Take</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {props.medicationToTake ? toBeTaken() : <></>}
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Upcoming Refills</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {props.upcomingRefill && numberOfDaysBeforeRefill <= 7 ? refillReminder() : <></>}
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Has Been Taken</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {props.medicationTaken ? hasBeenTaken() : <></>}
                    </Typography>
                </AccordionDetails>
            </Accordion>*/}
            {props.medicationTaken ? hasBeenTaken() : <></>}
            {props.medicationToTake ? toBeTaken() : <></>}
            {props.missedMedications ? missedMedicationText() : <></>}
            {props.upcomingRefill && numberOfDaysBeforeRefill <= 7 ? refillReminder() : <></>}

        </div>
    );
};

export default MedicationDosageDetails;

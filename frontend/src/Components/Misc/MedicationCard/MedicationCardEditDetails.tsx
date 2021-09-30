import React, {useEffect, useState} from 'react';
import {Divider, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {IMedicationDetails} from "./MedicationCard";

interface IMedicationCardEditDetails {
    medicationDetails: IMedicationDetails,
    updateMedicationDetails(name:string,remainingDosages:number, userNotes:string,prescriptionDosage:number):void
}
{/*TODO(Spotexx): theming*/}
const MedicationCardEditDetails = (props: IMedicationCardEditDetails) => {


    const [prescriptionName, setPrescriptionName] = useState(props.medicationDetails.prescriptionName);
    const [prescriptionDosage, setPrescriptionDosage] = useState(props.medicationDetails.prescriptionDosage);
    const [remainingDosages, setRemainingDosages] = useState(props.medicationDetails.remainingDosages);
    const [userNotes, setUserNotes] = useState(props.medicationDetails.userNotes);

    const handlePrescriptionNameOnChange = (e: any) => {
        setPrescriptionName(e.target.value)
    }
    const handleRemainingDosagesOnChange = (e: any) => {
        setRemainingDosages(e.target.value)
    }
    const handlePrescriptionDosageOnChange = (e: any) => {
        setPrescriptionDosage(e.target.value)
    }
    const handleUserNotesChange = (e: any) => {
        setUserNotes(e.target.value)
    }
    useEffect(() => {
        props.updateMedicationDetails(prescriptionName,remainingDosages,userNotes,prescriptionDosage)

    }, [prescriptionName,remainingDosages,userNotes,prescriptionDosage]);


    return (
        <div>
            <Typography paragraph>
                <br/>
                <TextField size={"small"}
                           onChange={(e) => handlePrescriptionNameOnChange(e)}
                           id="outlined-number"
                           label={"Prescription Name"} type="text" InputLabelProps={{shrink: true,}}
                defaultValue={props.medicationDetails.prescriptionName}/>
            </Typography>


            <Divider/>
            <Typography paragraph>
                <br/>
                <TextField size={"small"}
                           onChange={(e) => handlePrescriptionDosageOnChange(e)}
                           id="outlined-number"
                           label={"Prescription Dosage"} type="number" InputLabelProps={{shrink: true,}}
                defaultValue={props.medicationDetails.prescriptionDosage}/>
                <br/>
            </Typography>
            <Divider/>
            <Typography paragraph>
                <br/>
                <TextField size={"small"}
                           onChange={(e) => handleRemainingDosagesOnChange(e)}
                           id="outlined-number"
                           label={"Remaining Doses"} type="number" InputLabelProps={{shrink: true,}}
                defaultValue={props.medicationDetails.remainingDosages}/>
                <br/>
            </Typography>
            <Divider/>
            <Typography>
                <br/>
                <TextField
                    id="outlined-multiline-static"
                    label="Notes"
                    multiline
                    rows={4}
                    onChange={(e)=>handleUserNotesChange(e)}
                    InputLabelProps={{shrink: true,}}
                    defaultValue={props.medicationDetails.userNotes}
                />
                <br/>
                <br/>
            </Typography>
        </div>
    );
};

export default MedicationCardEditDetails;

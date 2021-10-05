import React, {useEffect, useState} from 'react';
import {Divider, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import {IMedication} from "../../../../../Types/MedicationType";
import MobileDatePicker from '@mui/lab/MobileDatePicker';



interface IMedicationCardEditDetails {
    medication: IMedication,
    updateMedicationDetails(name:string,nextFillDate:Date, userNotes:string,prescriptionDosage:number):void
}
{/*TODO(Spotexx): theming*/}
const MedicationCardEditDetails = (props: IMedicationCardEditDetails) => {


    const [prescriptionName, setPrescriptionName] = useState<string>(props.medication.prescriptionName);
    const [prescriptionDosage, setPrescriptionDosage] = useState<number>(props.medication.prescriptionDosage);
    const [nextFillDate, setNextFillDate] = useState<Date>(props.medication.nextFillDay);
    const [userNotes, setUserNotes] = useState<string>(props.medication.userNotes);

    const handlePrescriptionNameOnChange = (e: any) => {
        setPrescriptionName(e.target.value)
    }

    const handlePrescriptionDosageOnChange = (e: any) => {
        setPrescriptionDosage(e.target.value)
    }
    const handleUserNotesChange = (e: any) => {
        setUserNotes(e.target.value)
    }
    useEffect(() => {
        props.updateMedicationDetails(prescriptionName,nextFillDate,userNotes,prescriptionDosage)

    }, [prescriptionName,nextFillDate,userNotes,prescriptionDosage]);


    const handleChange = (newValue: Date|null) => {
        if(newValue == null){
            setNextFillDate(new Date())
        }else{
        setNextFillDate(newValue);
        }
    };

    return (
        <div>
            <Typography paragraph>
                <br/>
                <TextField size={"small"}
                           onChange={(e) => handlePrescriptionNameOnChange(e)}
                           id="outlined-number"
                           label={"Prescription Name"} type="text" InputLabelProps={{shrink: true,}}
                defaultValue={props.medication.prescriptionName}/>
            </Typography>


            <Divider/>
            <Typography paragraph>
                <br/>
                <TextField size={"small"}
                           onChange={(e) => handlePrescriptionDosageOnChange(e)}
                           id="outlined-number"
                           label={"Prescription Dosage"} type="number" InputLabelProps={{shrink: true,}}
                defaultValue={props.medication.prescriptionDosage}/>
                <br/>
            </Typography>
            <Divider/>
            <Typography paragraph>
                <br/>
                <MobileDatePicker
                    label="Next Refill"
                    inputFormat="MM/dd/yyyy"
                    value={nextFillDate}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                 />
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
                    defaultValue={props.medication.userNotes}
                />
                <br/>
                <br/>
            </Typography>
        </div>
    );
};

export default MedicationCardEditDetails;

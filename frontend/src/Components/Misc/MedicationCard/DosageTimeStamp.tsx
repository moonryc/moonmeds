import React, {useEffect, useState} from 'react';
import {Delete, MoreVert} from "@mui/icons-material";
import {Divider, Grid, IconButton, TextField} from "@mui/material";
import TimePickerComponent from "../TimePickerComponent";
import {IDosagesDetails} from "./MedicationCard";


interface IDosageTimeStampProps {
    index: number,
    dosageDetails:IDosagesDetails,
    deleteDosage(dosageIndex: number): void,
    getDosage(dosage: number, index: number): void,
    getDosageTime(time: Date, index: number): void,

}

{/*TODO(Spotexx): theming*/}
const DosageTimeStamp = (props: IDosageTimeStampProps) => {

    const [dose, setDose] = useState<number>(props.dosageDetails.amount);
    const [time, setTime] = useState(props.dosageDetails.time);


    ///This passes data back to the
    /// MedicationCardAddDosages components
    /// to log the information below
    /// it is kept up to date by using useEffect
    //TODO(Moon) fix typescript
    const handleDoseOnChange = (e: any) => {
        setDose(e.target.value)
    }

    const handleTimeOnChange = (time: Date) => {
        setTime(time)
    }

    useEffect(() => {
        props.getDosage(dose, props.index)
        props.getDosageTime(time, props.index)
    }, [time, dose])

    return (
        <div>
            <br/>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <TextField size={"small"} onChange={(e) => handleDoseOnChange(e)} id="outlined-number"
                               label={"Dosage"}
                               type="number" InputLabelProps={{shrink: true,}}
                    defaultValue={props.dosageDetails.amount}
                    />
                    <br/>
                    <br/>
                    <TimePickerComponent handleTimeOnChange={handleTimeOnChange} initialTime={props.dosageDetails.time} label={"Time of Dosage"}/>
                </Grid>
                <Grid item xs={4}>
                    <IconButton onClick={() => props.deleteDosage(props.index)}>
                        <Delete/>
                    </IconButton>
                    <br/>
                    <br/>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </Grid>
            </Grid>
            <br/>
            <Divider/>
        </div>
    );
};

export default DosageTimeStamp;

import React, {useEffect, useState} from 'react';
import {Delete, MoreVert} from "@mui/icons-material";
import {Checkbox, Collapse, Divider, Grid, IconButton, Switch, TextField} from "@mui/material";
import TimePickerComponent from "../TimePickerComponent";
import {ICustomDays, IDosagesDetails} from "../../../../../Types/MedicationType";



interface IDosageTimeStampProps{
    index: number,
    dosageDetails: IDosagesDetails,
    isNewCard: boolean

    deleteDosage(dosageIndex: number): void,
    getDosage(dosage: number, index: number): void,
    getDosageTime(time: Date, index: number): void,
    getDosageDetails(details: ICustomDays, index: number): void

}


{/*TODO(Spotexx): theming*/
}
const DosageTimeStamp = (props: IDosageTimeStampProps) => {

    const [dose, setDose] = useState<number>(props.dosageDetails.amount);
    const [time, setTime] = useState(props.dosageDetails.time);
    const [medicationDays, setMedicationDays] = useState<ICustomDays>(props.dosageDetails.customDays);
    const [options, setOptions] = useState(props.isNewCard);

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

    const handleMoreVertClick = () => {
        setOptions(!options);
    }

    const handleCheckbox = (day: string, everyday: boolean) => {
        let tempMedicationDay = {...medicationDays}
        if (!everyday) {
            switch (day) {
                case "monday":
                    tempMedicationDay.monday = !medicationDays.monday
                    setMedicationDays(tempMedicationDay);
                    break;
                case "tuesday":
                    tempMedicationDay.tuesday = !medicationDays.tuesday
                    setMedicationDays(tempMedicationDay);
                    break;
                case "wednesday":
                    tempMedicationDay.wednesday = !medicationDays.wednesday
                    setMedicationDays(tempMedicationDay);
                    break;
                case "thursday":
                    tempMedicationDay.thursday = !medicationDays.thursday
                    setMedicationDays(tempMedicationDay);
                    break;
                case "friday":
                    tempMedicationDay.friday = !medicationDays.friday
                    setMedicationDays(tempMedicationDay);
                    break;
                case "saturday":
                    tempMedicationDay.saturday = !medicationDays.saturday
                    setMedicationDays(tempMedicationDay);
                    break;
                case "sunday":
                    tempMedicationDay.sunday = !medicationDays.sunday
                    setMedicationDays(tempMedicationDay);
                    break;
            }
        } else {

        }
    }

    useEffect(() => {
        props.getDosage(dose, props.index)
        props.getDosageTime(time, props.index)
        props.getDosageDetails(medicationDays, props.index)
    }, [time, dose, medicationDays])

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
                    <TimePickerComponent handleTimeOnChange={handleTimeOnChange} initialTime={props.dosageDetails.time}
                                         label={"Time of Dosage"}/>
                </Grid>
                <Grid item xs={4}>


                    {props.isNewCard ? <>
                            <IconButton onClick={() => props.deleteDosage(props.index)}>
                                <Delete/>
                            </IconButton>
                        </> :
                        <>
                            <br/>
                            <br/>
                            <IconButton onClick={() => props.deleteDosage(props.index)}>
                                <Delete/>
                            </IconButton>
                            <IconButton onClick={() => handleMoreVertClick()}>
                                <MoreVert/>
                            </IconButton>
                        </>}
                </Grid>
            </Grid>
            <Collapse in={options}>
                <br/>
                <Grid container spacing={2}>
                    {/*TODO*/}
                    {/*<Grid item xs={3}>Daily</Grid>*/}
                    {/*<Grid item xs={3}>Weekly</Grid>*/}
                    {/*<Grid item xs={3}>Monthly</Grid>*/}
                    {/*<Grid item xs={3}>Custom</Grid>*/}
                    {/*<Grid item xs={3}> <Switch /> </Grid>*/}
                    {/*<Grid item xs={3}> <Switch/> </Grid>*/}
                    {/*<Grid item xs={3}> <Switch/> </Grid>*/}
                    {/*<Grid item xs={3}> <Switch/> </Grid>*/}

                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        Monday:
                        <br/>
                        <br/>
                        Tuesday:
                        <br/>
                        <br/>
                        Wednesday:
                        <br/>
                        <br/>
                        Thursday:
                        <br/>
                        <br/>
                        Friday:
                        <br/>
                        <br/>
                        Saturday:
                        <br/>
                        <br/>
                        Sunday:
                    </Grid>
                    <Grid item xs={4}>
                        <Checkbox checked={medicationDays.monday} onClick={() => handleCheckbox("monday", false)}/>
                        <br/>
                        <Checkbox checked={medicationDays.tuesday} onClick={() => handleCheckbox("tuesday", false)}/>
                        <br/>
                        <Checkbox checked={medicationDays.wednesday}
                                  onClick={() => handleCheckbox("wednesday", false)}/>
                        <br/>
                        <Checkbox checked={medicationDays.thursday} onClick={() => handleCheckbox("thursday", false)}/>
                        <br/>
                        <Checkbox checked={medicationDays.friday} onClick={() => handleCheckbox("friday", false)}/>
                        <br/>
                        <Checkbox checked={medicationDays.saturday} onClick={() => handleCheckbox("saturday", false)}/>
                        <br/>
                        <Checkbox checked={medicationDays.sunday} onClick={() => handleCheckbox("sunday", false)}/>
                    </Grid>
                    <Grid item xs={4}>

                    </Grid>
                </Grid>
            </Collapse>
            <br/>
            <Divider/>
        </div>
    );
};

export default DosageTimeStamp;

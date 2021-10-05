import React, {useEffect, useState} from 'react';
import {Delete, MoreVert} from "@mui/icons-material";
import {Checkbox, Collapse, Divider, Grid, IconButton, Switch, TextField} from "@mui/material";
import TimePickerComponent from "../TimePickerComponent";
import {ICustomDays, IDosagesDetails} from "../../../../../Types/MedicationType";
import MobileDatePicker from "@mui/lab/MobileDatePicker";


interface IDosageTimeStampProps {
    index: number,
    dosageDetails: IDosagesDetails,
    isNewCard: boolean

    deleteDosage(dosageIndex: number): void,

    getDosage(dosage: number, index: number): void,

    getDosageTime(time: Date, index: number): void,

    getDosageDetails(details: IDosagesDetails, index: number): void

}


{/*TODO(Spotexx): theming*/
}
const DosageTimeStamp = (props: IDosageTimeStampProps) => {

    const [dosageDetails, setDosageDetails] = useState(props.dosageDetails);

    const [medicationDays, setMedicationDays] = useState<ICustomDays>(props.dosageDetails.customDays);
    const [options, setOptions] = useState<boolean>(props.isNewCard);


    const [startDate, setStartDate] = useState<Date>(props.dosageDetails.customDays.startDate);
    const [endDate, setEndDate] = useState<Date>(props.dosageDetails.customDays.endDate);

    const handleDailyToggle = () => {

        let temp = {...dosageDetails}
        temp.isDaily = !temp.isDaily
        temp.isWeekly = false
        temp.isMonthly = false
        temp.isCustom = false
        setDosageDetails(temp)

    }

    const handleWeeklyToggle = () => {
        let temp = {...dosageDetails}
        temp.isDaily = false
        temp.isWeekly = !temp.isWeekly
        temp.isMonthly = false
        temp.isCustom = false
        setDosageDetails(temp)
    }

    const handleMonthlyToggle = () => {
        let temp = {...dosageDetails}
        temp.isDaily = false
        temp.isWeekly = false
        temp.isMonthly = !temp.isMonthly
        temp.isCustom = false
        setDosageDetails(temp)
    }

    const handleCustomToggle = () => {
        let temp = {...dosageDetails}
        temp.isDaily = false
        temp.isWeekly = false
        temp.isMonthly = false
        temp.isCustom = !temp.isCustom
        setDosageDetails(temp)
    }

    ///This passes data back to the
    /// MedicationCardAddDosages components
    /// to log the information below
    /// it is kept up to date by using useEffect
    //TODO(Moon) fix typescript
    const handleDoseOnChange = (e: any) => {
        let temp = {...dosageDetails}
        temp.amount = e.target.value
        setDosageDetails(temp)

        // setDose(e.target.value)
    }
    const handleTimeOnChange = (time: Date) => {
        let temp = {...dosageDetails}
        temp.time = time
        setDosageDetails(temp)
        // setTime(time)
    }

    const handleMoreVertClick = () => {
        setOptions(!options);
    }

    //This handels changing the checkboxes and updating the Dosage Details
    const handleCheckbox = (day: string, everyday: boolean) => {
        let tempMedicationDay = {...medicationDays}
        tempMedicationDay.sunday = false;
        tempMedicationDay.monday = false;
        tempMedicationDay.tuesday = false;
        tempMedicationDay.wednesday = false;
        tempMedicationDay.thursday = false;
        tempMedicationDay.friday = false;
        tempMedicationDay.saturday = false;
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

    const handleDateChange = (newValue: Date|null) => {
        if(newValue == null){
            let temp = {...dosageDetails}
            temp.selectedMonthly = new Date()
            setDosageDetails(temp)
        }else{
            let temp = {...dosageDetails}
            temp.selectedMonthly = newValue
            setDosageDetails(temp)
        }
    };


    useEffect(() => {
        props.getDosage(dosageDetails.amount, props.index)
        props.getDosageTime(dosageDetails.time, props.index)
        props.getDosageDetails(dosageDetails, props.index)
    }, [medicationDays, dosageDetails])

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

                    <Grid item xs={3}>Daily</Grid>
                    <Grid item xs={3}>Weekly</Grid>
                    <Grid item xs={3}>Monthly</Grid>
                    <Grid item xs={3}>Custom</Grid>
                    <Grid item xs={3}> <Switch checked={dosageDetails.isDaily} onClick={() => handleDailyToggle()}/>
                    </Grid>
                    <Grid item xs={3}> <Switch checked={dosageDetails.isWeekly} onClick={() => handleWeeklyToggle()}/>
                    </Grid>
                    <Grid item xs={3}> <Switch checked={dosageDetails.isMonthly} onClick={() => handleMonthlyToggle()}/>
                    </Grid>
                    <Grid item xs={3}> <Switch checked={dosageDetails.isCustom} onClick={() => handleCustomToggle()}/>
                    </Grid>

                </Grid>
                <Collapse in={dosageDetails.isWeekly}>
                    <Grid container spacing={2}>
                        <br/>
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
                            <Switch checked={medicationDays.monday} onClick={() => handleCheckbox("monday", false)}/>
                            <br/>
                            <Switch checked={medicationDays.tuesday} onClick={() => handleCheckbox("tuesday", false)}/>
                            <br/>
                            <Switch checked={medicationDays.wednesday}
                                    onClick={() => handleCheckbox("wednesday", false)}/>
                            <br/>
                            <Switch checked={medicationDays.thursday}
                                    onClick={() => handleCheckbox("thursday", false)}/>
                            <br/>
                            <Switch checked={medicationDays.friday} onClick={() => handleCheckbox("friday", false)}/>
                            <br/>
                            <Switch checked={medicationDays.saturday}
                                    onClick={() => handleCheckbox("saturday", false)}/>
                            <br/>
                            <Switch checked={medicationDays.sunday} onClick={() => handleCheckbox("sunday", false)}/>
                        </Grid>
                        <Grid item xs={4}>

                        </Grid>
                    </Grid>
                </Collapse>
                <Collapse in={dosageDetails.isMonthly}>
                        <br/>

                    <Grid container spacing={0}>
                        <Grid item>
                        <MobileDatePicker
                            label="Start Date"
                            inputFormat="MM/dd/yyyy"
                            value={dosageDetails.selectedMonthly}
                            onChange={handleDateChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        </Grid>
                    </Grid>
                </Collapse>
            </Collapse>
            <br/>
            <Divider/>
        </div>
    );
};

export default DosageTimeStamp;

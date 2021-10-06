import React, {useEffect, useState} from 'react';
import {Delete, MoreVert} from "@mui/icons-material";
import {
    Collapse,
    Divider,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    IconButton,
    Switch,
    TextField, Typography
} from "@mui/material";
import TimePickerComponent from "../TimePickerComponent";
import {IDosagesDetails} from "../../../../../Types/MedicationType";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme?: any) => ({
    switch: {
        width: '28px',
        height: '16px',
        padding: '0px',
        display: 'flex',
        '&:active': {
        '& .MuiSwitch-thumb': {
            width: '15',
        },
        '& .MuiSwitch-switchBase.Mui-checked': {
            transform: 'translateX(9px)',
        },
    },

    '& .MuiSwitch-switchBase': {
        padding: 2,
            '&.Mui-checked': {
            transform: 'translateX(12px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                opacity: 1,
                    backgroundColor: theme.palette.secondary.main,
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
            width: '12px',
            height: '12px',
            borderRadius: '6px',
            transition: theme.transitions.create(['width'], {
            duration: 700,
        }),
    },
    '& .MuiSwitch-track': {
        borderRadius: 16 / 2,
            opacity: 1,
            backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
            boxSizing: 'border-box',
    },
    },
    center: {
        justifyContent: "center",
        alignSelf: "center",
    }
}));


interface IDosageTimeStampProps {
    index: number,
    dosageDetails: IDosagesDetails,
    isNewCard: boolean

    deleteDosage(dosageIndex: number): void,

    getDosage(dosage: number, index: number): void,

    getDosageTime(time: Date, index: number): void,

    getDosageDetails(details: IDosagesDetails, index: number): void

}


//TODO(Spotexx): theming

const DosageTimeStamp = (props: IDosageTimeStampProps) => {

    const [state, setState] = React.useState({
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };





    const [dosageDetails, setDosageDetails] = useState(props.dosageDetails);


    const [options, setOptions] = useState<boolean>(props.isNewCard);


    //const [startDate, setStartDate] = useState<Date>(props.dosageDetails.customDays.startDate);
    //const [endDate, setEndDate] = useState<Date>(props.dosageDetails.customDays.endDate);

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
    const handleCheckbox = (day: string) => {
        let tempMedicationDetails:IDosagesDetails = {...dosageDetails}
        tempMedicationDetails.customDays.sunday = false;
        tempMedicationDetails.customDays.monday = false;
        tempMedicationDetails.customDays.tuesday = false;
        tempMedicationDetails.customDays.wednesday = false;
        tempMedicationDetails.customDays.thursday = false;
        tempMedicationDetails.customDays.friday = false;
        tempMedicationDetails.customDays.saturday = false;

        switch (day) {
            case "monday":
                tempMedicationDetails.customDays.monday = !dosageDetails.customDays.monday
                setDosageDetails(tempMedicationDetails);
                break;
            case "tuesday":
                tempMedicationDetails.customDays.tuesday = !dosageDetails.customDays.tuesday
                setDosageDetails(tempMedicationDetails);
                break;
            case "wednesday":
                tempMedicationDetails.customDays.wednesday = !dosageDetails.customDays.wednesday
                setDosageDetails(tempMedicationDetails);
                break;
            case "thursday":
                tempMedicationDetails.customDays.thursday = !dosageDetails.customDays.thursday
                setDosageDetails(tempMedicationDetails);
                break;
            case "friday":
                tempMedicationDetails.customDays.friday =!dosageDetails.customDays.friday
                setDosageDetails(tempMedicationDetails);
                break;
            case "saturday":
                tempMedicationDetails.customDays.saturday = !dosageDetails.customDays.saturday
                setDosageDetails(tempMedicationDetails);
                break;
            case "sunday":
                tempMedicationDetails.customDays.sunday = !dosageDetails.customDays.sunday
                setDosageDetails(tempMedicationDetails);
                break;
        }

    }

    const handleDateChange = (newValue: Date | null) => {
        if (newValue == null) {
            let temp = {...dosageDetails}
            temp.selectedMonthly = new Date()
            setDosageDetails(temp)
        } else {
            let temp = {...dosageDetails}
            temp.selectedMonthly = newValue
            setDosageDetails(temp)
        }
    };


    useEffect(() => {
        props.getDosage(dosageDetails.amount, props.index)
        props.getDosageTime(dosageDetails.time, props.index)
        props.getDosageDetails(dosageDetails, props.index)
    }, [dosageDetails])  // eslint-disable-line react-hooks/exhaustive-deps
    const classes = useStyles();
    return (
        <div >
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
                <Grid container spacing={2} className={classes.center}   alignItems="center"
                      justifyContent="center">

                    <Grid item xs={3} ><Typography>Daily</Typography></Grid>
                    <Grid item xs={3}>Weekly</Grid>
                    <Grid item xs={3}>Monthly</Grid>
                    <Grid item xs={3}>Custom</Grid>
                    <Grid item xs={3} > <Switch className={classes.switch} checked={dosageDetails.isDaily} onClick={() => handleDailyToggle()}/>
                    </Grid>
                    <Grid item xs={3}> <Switch className={classes.switch} checked={dosageDetails.isWeekly} onClick={() => handleWeeklyToggle()}/>
                    </Grid>
                    <Grid item xs={3}> <Switch className={classes.switch} checked={dosageDetails.isMonthly} onClick={() => handleMonthlyToggle()}/>
                    </Grid>
                    <Grid item xs={3}> <Switch className={classes.switch} checked={dosageDetails.isCustom} onClick={() => handleCustomToggle()}/>
                    </Grid>

                </Grid>
                <Collapse in={dosageDetails.isWeekly}>
                    <FormControl component="fieldset" variant="standard">
                        <FormGroup style={{paddingLeft:'15px'}}>
                            <br/>
                            <FormControlLabel
                                control={
                                    <Switch className={classes.switch} checked={state.monday} onChange={handleChange} name="monday" />
                                }
                                label="Monday"
                            /><br/>
                            <FormControlLabel
                                control={
                                    <Switch className={classes.switch} checked={state.tuesday} onChange={handleChange} name="tuesday" />
                                }
                                label="Tuesday"
                            /><br/>
                            <FormControlLabel
                                control={
                                    <Switch className={classes.switch} checked={state.wednesday} onChange={handleChange} name="wednesday" />
                                }
                                label="Wednesday"
                            /><br/>
                            <FormControlLabel
                                control={
                                    <Switch className={classes.switch} checked={state.thursday} onChange={handleChange} name="thursday" />
                                }
                                label="Thursday"
                            /><br/>
                            <FormControlLabel
                                control={
                                    <Switch className={classes.switch} checked={state.friday} onChange={handleChange} name="friday" />
                                }
                                label="Friday"
                            /><br/>
                            <FormControlLabel
                                control={
                                    <Switch className={classes.switch} checked={state.saturday} onChange={handleChange} name="saturday" />
                                }
                                label="Saturday"
                            /><br/>
                            <FormControlLabel
                                control={
                                    <Switch className={classes.switch} checked={state.sunday} onChange={handleChange} name="sunday" />
                                }
                                label="Sunday"
                            />
                        </FormGroup>
                    </FormControl>
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

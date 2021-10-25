import React, {useEffect, useState} from 'react';
import {Delete, MoreVert} from "@mui/icons-material";
import {
    Collapse,
    Divider,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    IconButton,
    Switch,
    TextField,
    Typography
} from "@mui/material";
import TimePickerComponent from "../TimePickerComponent";
import {IDosagesDetails} from "../../../../../Types/MedicationTypes";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import {makeStyles} from "@mui/styles";
import {centeredTextStyle, switchStyle} from "../../../Styles";

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

}));

/**
 *
 * @property index - number,
 * @property dosageDetails - IDosagesDetails,
 * @property isNewCard - boolean
 * @property deleteDosage(dosageIndex: number) - void,
 * @property getDosage(dosage:number,index:number) - void,
 * @property getDosageTime(time:Date,index:number) - void,
 * @property getDosageDetails(details:IDosagesDetails,index:number) - void
 */
interface IDosageTimeStampProps {
    index: number,
    dosageDetails: IDosagesDetails,
    isNewCard: boolean

    deleteDosage(dosageIndex: number): void,

    getDosageDetails(details: IDosagesDetails, index: number): void

}


//TODO(Spotexx): theming
/**
 * Used to set the time of a medication dosage
 * @param props - {index - number,dosageDetails: IDosagesDetails,isNewCard: boolean,
 * deleteDosage(dosageIndex: number): void,getDosage(dosage:number,index:number): void,
 * getDosageTime(time:Date,index:number): void,getDosageDetails(details:IDosagesDetails,index:number): void}
 * @constructor
 */
const DosageTimeStamp = (props: IDosageTimeStampProps) => {

    const classes = useStyles();

    //region useState

    /**
     * The dosage details for one specific dosage in a medication
     */
    const [dosageDetails, setDosageDetails] = useState<IDosagesDetails>(props.dosageDetails);
    //const [startDate, setStartDate] = useState<Date>(props.dosageDetails.customWeekDays.startDate);
    //const [endDate, setEndDate] = useState<Date>(props.dosageDetails.customWeekDays.endDate);

    //endregion

    //region Callback functions

    /**
     *  used for selecting the time of the day in the time picker
     * @param time - Date
     */
    const handleTimeOnChange = (time: Date) => {
        let temp = {...dosageDetails}
        temp.time = time
        setDosageDetails(temp)
    }

    /**
     *  use for selecting the date in the day of the month picker for a monthly scheduled medication
     * @param newValue - Date
     */
    const handleDateChange = (newValue: Date | null) => {
        if (newValue == null) {
            let temp = {...dosageDetails}
            temp.customOnceAMonthDate = new Date()
            setDosageDetails(temp)
        } else {
            let temp = {...dosageDetails}
            temp.customOnceAMonthDate = newValue
            setDosageDetails(temp)
        }
    };

    //endregion

    //region functions

    /**
     * updates the dosageDetails |
     * toggles the daily option on/off and turns off weekly, monthly, and custom
     */
    const handleDailyToggle = () => {

        let temp = {...dosageDetails}
        temp.isDaily = !temp.isDaily
        temp.isWeekly = false
        temp.isOnceAMonth = false
        setDosageDetails(temp)

    }

    /**
     * updates the dosageDetails |
     * toggles the weekly option on/off and turns off daily, monthly, and custom
     */
    const handleWeeklyToggle = () => {
        let temp = {...dosageDetails}
        temp.isDaily = false
        temp.isWeekly = !temp.isWeekly
        temp.isOnceAMonth = false
        setDosageDetails(temp)
    }

    /**
     * updates the dosageDetails |
     * toggles the monthly option on/off and turns off weekly, daily, and custom
     */
    const handleMonthlyToggle = () => {
        let temp = {...dosageDetails}
        temp.isDaily = false
        temp.isWeekly = false
        temp.isOnceAMonth = !temp.isOnceAMonth
        setDosageDetails(temp)
    }




    //TODO(Moon) fix typescript
    /**
     * updates the dosageDetails |
     * updates the change in dosage as the user types
     * @param e - any
     */
    const handleDoseOnChange = (e: any) => {
        let temp = {...dosageDetails}
        temp.amount = e.target.value
        setDosageDetails(temp)
    }


    /**
     * Update the dosageDetails to reflect what day of the week has been toggled on or off
     * @param day - string of the day of the week
     */
    const handleCheckbox = (day: string) => {
        let tempMedicationDetails: IDosagesDetails = {...dosageDetails}

        switch (day) {
            case "monday":
                tempMedicationDetails.customWeekDays.monday = !dosageDetails.customWeekDays.monday
                setDosageDetails(tempMedicationDetails);
                break;
            case "tuesday":
                tempMedicationDetails.customWeekDays.tuesday = !dosageDetails.customWeekDays.tuesday
                setDosageDetails(tempMedicationDetails);
                break;
            case "wednesday":
                tempMedicationDetails.customWeekDays.wednesday = !dosageDetails.customWeekDays.wednesday
                setDosageDetails(tempMedicationDetails);
                break;
            case "thursday":
                tempMedicationDetails.customWeekDays.thursday = !dosageDetails.customWeekDays.thursday
                setDosageDetails(tempMedicationDetails);
                break;
            case "friday":
                tempMedicationDetails.customWeekDays.friday = !dosageDetails.customWeekDays.friday
                setDosageDetails(tempMedicationDetails);
                break;
            case "saturday":
                tempMedicationDetails.customWeekDays.saturday = !dosageDetails.customWeekDays.saturday
                setDosageDetails(tempMedicationDetails);
                break;
            case "sunday":
                tempMedicationDetails.customWeekDays.sunday = !dosageDetails.customWeekDays.sunday
                setDosageDetails(tempMedicationDetails);
                break;
        }

    }

    //endregion

    //region useEffect

    /**
     * updates the medicationDetails property in the MedicationCard component whenever a dosage detail changes
     */
    useEffect(() => {
        props.getDosageDetails(dosageDetails, props.index)
    }, [dosageDetails])  // eslint-disable-line react-hooks/exhaustive-deps

    //endregion

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


                    <IconButton onClick={() => props.deleteDosage(props.index)}>
                        <Delete/>
                    </IconButton>

                </Grid>
            </Grid>
            <br/>
            <Grid container spacing={2}  alignItems="center"
                  >

                <Grid  item xs={3}><Typography sx={{centeredTextStyle}}>Daily</Typography></Grid>
                <Grid item xs={3}><Typography sx={centeredTextStyle}>Weekly</Typography></Grid>
                <Grid item xs={3}><Typography sx={centeredTextStyle}>Monthly</Typography></Grid>
                <Grid item xs={3}><Typography sx={centeredTextStyle}>Custom</Typography></Grid>
                <Grid item xs={3}> <Switch sx={switchStyle} checked={dosageDetails.isDaily}
                                           onClick={() => handleDailyToggle()}/>
                </Grid>
                <Grid item xs={3}> <Switch sx={switchStyle} checked={dosageDetails.isWeekly}
                                           onClick={() => handleWeeklyToggle()}/>
                </Grid>
                <Grid item xs={3}> <Switch sx={switchStyle} checked={dosageDetails.isOnceAMonth}
                                           onClick={() => handleMonthlyToggle()}/>
                </Grid>

            </Grid>
            <Collapse in={dosageDetails.isWeekly}>
                <FormControl component="fieldset" variant="standard">
                    <FormGroup style={{paddingLeft: '15px'}}>
                        <br/>
                        <FormControlLabel
                            control={
                                <Switch sx={switchStyle} checked={dosageDetails.customWeekDays.monday}
                                        onChange={() => handleCheckbox("monday")} name="monday"/>
                            }
                            label="Monday"
                        /><br/>
                        <FormControlLabel
                            control={
                                <Switch sx={switchStyle} checked={dosageDetails.customWeekDays.tuesday}
                                        onClick={() => handleCheckbox("tuesday")} name="tuesday"/>
                            }
                            label="Tuesday"
                        /><br/>
                        <FormControlLabel
                            control={
                                <Switch sx={switchStyle} checked={dosageDetails.customWeekDays.wednesday}
                                        onClick={() => handleCheckbox("wednesday")} name="wednesday"/>
                            }
                            label="Wednesday"
                        /><br/>
                        <FormControlLabel
                            control={
                                <Switch sx={switchStyle} checked={dosageDetails.customWeekDays.thursday}
                                        onClick={() => handleCheckbox("thursday")} name="thursday"/>
                            }
                            label="Thursday"
                        /><br/>
                        <FormControlLabel
                            control={
                                <Switch sx={switchStyle} checked={dosageDetails.customWeekDays.friday}
                                        onClick={() => handleCheckbox("friday")} name="friday"/>
                            }
                            label="Friday"
                        /><br/>
                        <FormControlLabel
                            control={
                                <Switch sx={switchStyle} checked={dosageDetails.customWeekDays.saturday}
                                        onClick={() => handleCheckbox("saturday")} name="saturday"/>
                            }
                            label="Saturday"
                        /><br/>
                        <FormControlLabel
                            control={
                                <Switch sx={switchStyle} checked={dosageDetails.customWeekDays.sunday}
                                        onClick={() => handleCheckbox("sunday")} name="sunday"/>
                            }
                            label="Sunday"
                        />
                    </FormGroup>
                </FormControl>
            </Collapse>
            <Collapse in={dosageDetails.isOnceAMonth}>
                <br/>

                <Grid container spacing={0}>
                    <Grid item>
                        <MobileDatePicker
                            label="Start Date"
                            inputFormat="MM/dd/yyyy"
                            value={dosageDetails.customOnceAMonthDate}
                            onChange={handleDateChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Grid>
                </Grid>
            </Collapse>
            <br/>
            <Divider/>
        </div>
    );
};

export default DosageTimeStamp;

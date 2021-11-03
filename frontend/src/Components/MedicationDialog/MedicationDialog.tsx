import {ToggleButton, ToggleButtonGroup} from "@mui/lab";
import {
    Box,
    Button,
    ButtonGroup,
    Collapse,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider, FormControl, InputLabel, MenuItem,
    Paper, Select,
    TextField
} from "@mui/material";
import React, {useCallback, useContext, useEffect, useState} from "react";
import {
    IDosagesDetails,
    IMedicationBase
} from "../../../../Types/MedicationTypes";
import {ApiContext} from "../../Context/ApiContext";
import {makeMedication} from "../../typeConstructors";
import DatePickerForDialog from "./DatePickerForDialog";
import MedicationCardOwner from "./MedicationCardOwner";
import MedicationDialogDosages from "./MedicationDialogDosages";


/**
 * @param isOpen - true is the dialog box is open
 * @param isNewMedication - true if creating a new medication, false otherwise
 * @param isNewMedication - a blank IMedicationBase object if new medication or an existing medicaitonObject
 * to fill in the fields
 * @function closeDialog - a function to close this dialog
 */
interface IMedicationDialog {
    isOpen: boolean;
    isNewMedication: boolean;
    medication: IMedicationBase;

    closeDialog(medicationObject: IMedicationBase): void;
}

/**
 * Displays a dialog to create a new medication or edit an existing one
 * @param props
 * @constructor
 */
const MedicationDialog: React.FC<IMedicationDialog> = ({isOpen, isNewMedication, medication, closeDialog}) => {
    let medicationTemplate = makeMedication()

    const {putNewMedication, putUpdateExistingMedication} = useContext(ApiContext);

    const [medicationObject, setMedicationObject] = useState(medication);
    const [errorDontSubmit, setErrorDontSubmit] = useState(false);


    useEffect(() => {
        setMedicationObject({...medication})
    }, [medication]);



    /**
     * A callback function to update medication dosages
     * @param listOfDosages - the desired modified list of dosages
     */
    const updateMedicationDosages = (listOfDosages: IDosagesDetails[]) => {
        let tempMedication = {...medicationObject};
        tempMedication.dosages = listOfDosages;
        setMedicationObject(tempMedication);
    };

    /**
     * A callback function to update the desired end date
     * @param endDate - the deired end date
     */
    const getEndDate = (endDate: Date) => {
        let tempMedication = {...medicationObject};
        tempMedication.endDate = endDate;
        setMedicationObject(tempMedication);
    };

    /**
     * A callback function to update the desired refillDate
     * @param refillDate - desired refill date
     */
    const getRefillDate = (refillDate: Date) => {
        let tempMedication = {...medicationObject};
        tempMedication.nextFillDay = refillDate;
        setMedicationObject(tempMedication);
    };

    /**
     * Sends post request to create a new medication
     */
    const submitMedication = async () => {
        await putNewMedication(medicationObject).then((response) =>
            closeDialog(medicationTemplate)
        );
    };

    /**
     * Sends put request to update existing medication
     */
    const updateMedication = async () => {
        await putUpdateExistingMedication(medicationObject).then((response) =>
            closeDialog(medicationTemplate)
        );
    };

    const getMedicationOwner = useCallback((name: string, color: string) => {
        setMedicationObject(temp => {
            temp.medicationOwner.name = name;
            temp.medicationOwner.color = color;
            return {...temp};
        });
    }, [])


    /**
     * prevents you from submitting a medication with empty fields
     */
    useEffect(() => {
        if(medicationObject.prescriptionName === ""){
            return setErrorDontSubmit(true);
        }
        else if(medicationObject.medicationOwner.name === ""){
            return setErrorDontSubmit(true)
        }
        else if(medicationObject.nextFillDay === undefined){
            return setErrorDontSubmit(true)
        }
        else if(!medicationObject.inDefinite && medicationObject.endDate === undefined){
            return setErrorDontSubmit(true)
        }


        for(let dose of medicationObject.dosages){
            if(dose.amountDosageType === "") {
                return setErrorDontSubmit(true)
            }else if(dose.time === undefined){
                return setErrorDontSubmit(true)
            }
            if(dose.isWeekly){
                let numberOfTrueDays = 0;
                for(const [day,value] of Object.entries(dose.customWeekDays)){
                    if(value === true){
                        numberOfTrueDays++;
                    }
                }
                if (numberOfTrueDays === 0) {
                    return setErrorDontSubmit(true)
                }
            }
        }

        return setErrorDontSubmit(false)

    }, [medicationObject]);
    

    return (
        <>
            <Dialog
                open={isOpen}
                onBackdropClick={() => closeDialog(medicationObject)}
            >
                <DialogTitle sx={{textAlign: "center"}}>
                    {isNewMedication ? (
                        <>New Medication</>
                    ) : (
                        <>{medication.prescriptionName}</>
                    )}
                </DialogTitle>

                <DialogContent>
                    <br/>
                    <TextField
                        variant={"outlined"}
                        fullWidth
                        label={"Prescription Name"}
                        type={"string"}
                        value={medicationObject.prescriptionName}
                        onChange={(e) =>
                            setMedicationObject((prevState) => ({
                                ...prevState,
                                prescriptionName: e.target.value,
                            }))
                        }
                    />
                    <br/>
                    <br/>

                    <MedicationCardOwner
                        getMedicationOwner={getMedicationOwner}
                        medicationOwner={medicationObject.medicationOwner}
                    />

                    <br/>
                    <br/>


                    <TextField
                        sx={{width: "60%"}}
                        variant={"outlined"}
                        label={"Dosage"}
                        placeholder={"Dosage"}
                        type={"number"}
                        value={medicationObject.prescriptionDosage}
                        onChange={(e) =>
                            setMedicationObject((prevState) => ({
                                ...prevState,
                                prescriptionDosage: parseFloat(e.target.value),
                            }))
                        }
                    />


                    <FormControl sx={{width: "35%"}}>
                        <InputLabel id="demo-simple-select-label">Dosage Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={medicationObject.prescriptionDosageType}
                            label="Dosage Type"
                            onChange={(e) =>
                                setMedicationObject((prevState) => ({
                                    ...prevState,
                                    prescriptionDosageType: e.target.value,
                                }))
                            }
                        >
                            <MenuItem value={"Milligram"}>Milligram</MenuItem>
                            <MenuItem value={"Gram"}>Gram</MenuItem>
                            <MenuItem value={"Milliliter"}>Milliliter</MenuItem>
                            <MenuItem value={"Liter"}>Liter</MenuItem>
                            <MenuItem value={"Drop"}>Drop</MenuItem>
                            <MenuItem value={"Tablet"}>Tablet</MenuItem>


                        </Select>
                    </FormControl>


                    <br/>
                    <br/>

                    <DatePickerForDialog
                        getEndDate={() => {
                        }}
                        getMonthlyDate={() => {
                        }}
                        isGetEndDate={false}
                        disable={false}
                        label={"Next Refill Date"}
                        isMonthly={false}
                        index={0}
                        getRefillDate={getRefillDate}
                        isRefill={true}
                     datePassed={medicationObject.nextFillDay}/>
                    <br/>
                    <br/>

                    <DialogContentText>Stop taking this medication:</DialogContentText>
                    <Paper>
                        <ToggleButtonGroup fullWidth exclusive>
                            {/*disabled={medicationObject.inDefinite}*/}
                            <ToggleButton
                                value={"Never"}
                                selected={medicationObject.inDefinite}
                                onClick={() =>
                                    setMedicationObject((prevState) => ({
                                        ...prevState,
                                        inDefinite: true,
                                    }))
                                }
                            >
                                Never
                            </ToggleButton>
                            {/*disabled={!medicationObject.inDefinite}*/}
                            <ToggleButton
                                value={"Some Date"}
                                selected={!medicationObject.inDefinite}
                                onClick={() =>
                                    setMedicationObject((prevState) => ({
                                        ...prevState,
                                        inDefinite: false,
                                    }))
                                }
                            >
                                Specific Day
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Paper>
                    <br/>
                    <br/>
                    <Collapse in={!medicationObject.inDefinite}>
                        <DatePickerForDialog
                            getEndDate={getEndDate}
                            getMonthlyDate={() => {
                            }}
                            isGetEndDate={true}
                            disable={medicationObject.inDefinite}
                            label={"Stop taking medication on"}
                            isMonthly={false}
                            index={0}
                            getRefillDate={() => {
                            }}
                            isRefill={false}
                         datePassed={medicationObject.endDate}/>
                        {/* TODO: don't use break elements, use styles instead */}
                        <br/>
                        <br/>
                        <br/>
                    </Collapse>

                    <TextField
                        variant={"outlined"}
                        label={"Notes"}
                        value={medicationObject.userNotes}
                        fullWidth
                        multiline
                        onChange={(e) =>
                            setMedicationObject((prevState) => ({
                                ...prevState,
                                userNotes: e.target.value,
                            }))
                        }
                    />
                    <br/>
                    <br/>
                    <Divider/>

                    <br/>

                    <MedicationDialogDosages
                        updateMedicationDosages={updateMedicationDosages}
                        medicationDosages={medicationObject.dosages}
                    />
                    <Divider/>
                </DialogContent>

                <DialogActions>
                    <ButtonGroup fullWidth>
                        {isNewMedication ? (
                            <Button disabled={errorDontSubmit} variant={"contained"} onClick={() => submitMedication()}>
                                Create Medication
                            </Button>
                        ) : (
                            <Button disabled={errorDontSubmit} variant={"contained"} onClick={() => updateMedication()}>
                                Update Medication
                            </Button>
                        )}

                        <Button
                            variant={"contained"}
                            onClick={() => closeDialog(medicationTemplate)}
                        >
                            Cancel
                        </Button>
                    </ButtonGroup>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default MedicationDialog;

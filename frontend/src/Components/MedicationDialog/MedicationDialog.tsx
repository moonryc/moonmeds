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
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField
} from "@mui/material";
import React, {useCallback, useContext, useEffect, useState} from "react";
import {IDosagesDetails, IMedicationBase} from "../../../../Types/MedicationTypes";
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
        const [errorLocations, setErrorLocations] = useState({
            prescriptionNameError: false,
            ownerError: false,
            prescriptionDosageError: false,
        });

        /**
         * @param newMedicationObject - the new medication object to be created
         */
        useEffect(() => {
            setMedicationObject({...medication})
        }, [medication]);

        /**
         * if an error is present , the user cannot submit the form
         */
        useEffect(() => {

            for (let [key, value] of Object.entries(errorLocations)) {
                if (value) {
                    return setErrorDontSubmit(true)
                }
            }
            setErrorDontSubmit(false)
        }, [errorLocations])

        /**
         * Updates the errorLocations object
         */
        useEffect(() => {
            if(medicationObject.medicationOwner.name === ""){
                setErrorLocations({...errorLocations, ownerError: true})
            }else{
                setErrorLocations({...errorLocations, ownerError: false})
            }
        }, [medicationObject.medicationOwner.name])

        //region Functions
        /**
         * A callback function to update medication dosages
         * @param listOfDosages - the desired modified list of dosages
         */
        const updateMedicationDosages = useCallback(
            (listOfDosages: IDosagesDetails[]) => {
                let tempMedication = {...medicationObject};
                tempMedication.dosages = listOfDosages;
                setMedicationObject(tempMedication);
            },
            []
        );

        /**
         * A callback function to update the desired end date
         * @param endDate - the deired end date
         */
        const getEndDate = useCallback(
            (endDate: Date) => {
                let tempMedication = {...medicationObject};
                tempMedication.endDate = endDate;
                setMedicationObject(tempMedication);
            },
            []
        );

        /**
         * A callback function to update the desired refillDate
         * @param refillDate - desired refill date
         */
        const getRefillDate = useCallback(
            (refillDate: Date) => {
                let tempMedication = {...medicationObject};
                tempMedication.nextFillDay = refillDate;
                setMedicationObject(tempMedication);
            },
            []
        );

        const getMedicationOwner = useCallback(
            (name: string, color: string) => {
                setMedicationObject(temp => {
                    temp.medicationOwner.name = name;
                    temp.medicationOwner.color = color;
                    return {...temp};
                });
            },
            [])

        /**
         * Sends post request to create a new medication
         */
        const submitMedication = async () => {
            if(medicationObject.prescriptionName === ""){
                setErrorLocations({...errorLocations, prescriptionNameError: true})
            }else{
                await putNewMedication(medicationObject).then((response) =>
                    closeDialog(medicationTemplate)
                );
            }

        };

        /**
         * Sends put request to update existing medication
         */
        const updateMedication = async () => {
            await putUpdateExistingMedication(medicationObject).then((response) =>
                closeDialog(medicationTemplate)
            );
        };

        //endregion


        return (
            <Box >
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
                            fullWidth
                            variant={"outlined"}
                            label={"Prescription Name"}
                            type={"string"}
                            error={errorLocations.prescriptionNameError}
                            value={medicationObject.prescriptionName}
                            onChange={(e) => {
                                setMedicationObject((prevState) =>
                                    ({
                                        ...prevState,
                                        prescriptionName: e.target.value,
                                    }))
                                if (e.target.value === "") {
                                    setErrorLocations(prevState => ({
                                        ...prevState,
                                        prescriptionNameError: true
                                    }))
                                } else {
                                    setErrorLocations(prevState => ({
                                        ...prevState,
                                        prescriptionNameError: false
                                    }))
                                }
                            }
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
                            label={"Prescription Dosage"}
                            placeholder={"Prescription Dosage"}
                            error={errorLocations.prescriptionDosageError}
                            type={"number"}
                            value={medicationObject.prescriptionDosage}
                            onChange={(e) => {
                                setMedicationObject((prevState) => ({
                                    ...prevState,
                                    prescriptionDosage: parseFloat(e.target.value),
                                }))
                                if(parseFloat(e.target.value) === 0){
                                    setErrorLocations(prevState => ({
                                        ...prevState,
                                        prescriptionDosageError: true
                                    }))
                                } else {
                                    setErrorLocations(prevState => ({
                                        ...prevState,
                                        prescriptionDosageError: false
                                    }))
                                }
                            }
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
            </Box>
        );
    }
;

export default MedicationDialog;

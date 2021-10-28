import React, {useContext, useEffect, useState} from 'react';
import {
    Button,
    ButtonGroup,
    Dialog,
    DialogActions,
    DialogContent, DialogContentText,
    DialogTitle,
    Divider, Paper,
    TextField
} from "@mui/material";
import medication from "../../../../routes/medication";
import {IDosagesDetails, IMedicationBase, IWeekdays} from "../../../../Types/MedicationTypes";
import MedicationCardOwner from "../Misc/MedicationCard/MedicationCardOwner";
import DatePickerForDialog from "./DatePickerForDialog";
import MedicationDialogDosages from "./MedicationDialogDosages";
import {ToggleButton, ToggleButtonGroup} from "@mui/lab";
import {ApiContext} from "../../Context/ApiContext";

interface IMedicationDialog {
    isOpen: boolean
    isNewMedication: boolean
    medication: IMedicationBase
    closeDialog(medicationObject:IMedicationBase):void
}

const MedicationDialog = (props: IMedicationDialog) => {

    let medicationTemplate = {
        medicationId: "",
        userId: "",
        prescriptionName: "",
        medicationOwner: "",
        prescriptionDosage: 0,
        nextFillDay: new Date(),
        inDefinite: true,
        endDate: new Date(),
        userNotes: "",
        dosages: [
            {
                amount: 0,
                time: new Date(),
                isDaily: true,
                isWeekly: false,
                isOnceAMonth: false,
                customOnceAMonthDate: new Date(),
                customWeekDays: {
                    monday: false,
                    tuesday: false,
                    wednesday: false,
                    thursday: false,
                    friday: false,
                    saturday: false,
                    sunday: false
                }
            }
        ]
    }

    const {putNewMedication,putUpdateExistingMedication} = useContext(ApiContext);

    const [medicationObject, setMedicationObject] = useState(props.medication);

    const updateMedicationDosages = (listOfDosages: IDosagesDetails[]) => {
        let tempMedication = {...medicationObject}
        tempMedication.dosages = listOfDosages
        setMedicationObject(tempMedication)
    }

    const getEndDate = (endDate:Date) => {
        let tempMedication = {...medicationObject}
        tempMedication.endDate = endDate
        setMedicationObject(tempMedication)
    }

    const getRefillDate = (endDate:Date) => {
        let tempMedication = {...medicationObject}
        tempMedication.nextFillDay = endDate
        setMedicationObject(tempMedication)
    }

    useEffect(() => {
        console.log(medicationObject)
    }, [medicationObject]);



    const submitMedication = async () => {
        await putNewMedication(medicationObject)
            .then(response=>
                props.closeDialog(medicationTemplate))

    }

    const updateMedication = async () => {
        await putUpdateExistingMedication(medicationObject)
            .then(response=>
                props.closeDialog(medicationTemplate))

    }

    return (
        <>
            <Dialog
                open={props.isOpen}
                onBackdropClick={()=>props.closeDialog(medicationObject)}
            >
                <DialogTitle> {props.isNewMedication ? <>New
                    Medication</> : <>{props.medication.prescriptionName}</>} </DialogTitle>

                <DialogContent>

                    <TextField
                        variant={"outlined"}
                        fullWidth
                        type={"string"}
                        value={medicationObject.prescriptionName}
                        onChange={(e) => setMedicationObject(prevState => ({
                            ...prevState,
                            prescriptionName: e.target.value
                        }))}
                    />
                    <br/>
                    <br/>
                    {/*todo slim this down*/}
                    <MedicationCardOwner getMedicationOwner={(name:string)=>{
                        setMedicationObject(prevState => ({...prevState,medicationOwner:name}))
                    }} medicationOwner={medicationObject.medicationOwner}/>


                    <br/>
                    <TextField
                        variant={"outlined"}
                        label={"Dosage"}
                        placeholder={"Dosage"}
                        fullWidth
                        type={"number"}
                        value={medicationObject.prescriptionDosage}
                        onChange={(e) => setMedicationObject(prevState => ({
                            ...prevState,
                            prescriptionDosage: parseFloat(e.target.value)
                        }))}
                    />
                    <br/>
                    <br/>

                    <DatePickerForDialog
                        getEndDate={()=>{}}
                        getMonthlyDate={()=>{}}
                        isGetEndDate={false}
                        disable={false}
                        label={"Next Refill Date"}
                        isMonthly={false}
                        index={0}
                        getRefillDate={getRefillDate}
                        isRefill={true}/>
                    <br/>
                    <br/>

                    <DialogContentText>
                        Stop taking this medication:
                    </DialogContentText>
                    <Paper>
                        <ToggleButtonGroup fullWidth exclusive>
                            {/*disabled={medicationObject.inDefinite}*/}
                            <ToggleButton value={"Never"}
                                          selected={medicationObject.inDefinite}
                                          onClick={() => setMedicationObject(prevState => ({
                                              ...prevState,
                                              inDefinite: true
                                          }))}> Never</ToggleButton>
                            {/*disabled={!medicationObject.inDefinite}*/}
                            <ToggleButton value={"Some Date"}
                                          selected={!medicationObject.inDefinite}
                                          onClick={() => setMedicationObject(prevState => ({
                                              ...prevState,
                                              inDefinite: false
                                          }))}>
                                Specific Day
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Paper>
                    <br/>
                    <br/>

                    <DatePickerForDialog
                        getEndDate={getEndDate}
                        getMonthlyDate={()=>{}}
                        isGetEndDate={true}
                        disable={medicationObject.inDefinite}
                        label={"Stop taking medication on"}
                        isMonthly={false} index={0} getRefillDate={()=>{}} isRefill={false}/>
                    <br/>
                    <br/>



                    <TextField
                        variant={"outlined"}
                        label={"Notes"}
                        fullWidth
                        multiline
                        onChange={(e) => setMedicationObject(prevState => ({
                            ...prevState,
                            userNotes: e.target.value
                        }))}/>
                    <br/><br/>
                    <Divider/>

                    <br/>

                    <MedicationDialogDosages
                        isNewCard={true}
                        updateMedicationDosages={updateMedicationDosages}
                        medicationDosages={medicationObject.dosages}/>
                    <Divider/>

                </DialogContent>


                <DialogActions>
                    <ButtonGroup fullWidth>
                        {props.isNewMedication ? <Button variant={"contained"} onClick={() => submitMedication()}>Create Medication</Button>
                        :<Button variant={"contained"} onClick={()=>updateMedication()}>Update Medication</Button>}

                        <Button variant={"contained"} onClick={()=>props.closeDialog(medicationTemplate)}>Cancel</Button>
                    </ButtonGroup>
                </DialogActions>

            </Dialog>

        </>
    );
};

export default MedicationDialog;

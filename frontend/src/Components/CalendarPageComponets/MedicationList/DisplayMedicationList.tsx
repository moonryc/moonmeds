import React, {useContext, useEffect, useState} from 'react';
import Card from "@mui/material/Card";
import {
    Box,
    Button,
    ButtonGroup,
    CardContent,
    CardHeader,
    Checkbox,
    Chip,
    Dialog, DialogActions, DialogContent, DialogTitle,
    Grid,
    Paper,
    Typography
} from "@mui/material";
import {IMedicationBase} from "../../../../../Types/MedicationTypes";
import {MedicationContext} from "../../../Context/MedicationContext";
import {ApiContext} from "../../../Context/ApiContext";
import {Skeleton} from "@mui/material";
import {UserContext} from "../../../Context/UserContext";
import MedicationDialog from "../../MedicationDialog/MedicationDialog";
import medication from "../../../../../routes/medication";


/**
 * This component handels all logic for rendering the list of medications associated with the users account
 * @constructor
 */
const DisplayMedicationList = () => {



    const {loadingBar, putDeleteSelectedMedications} = useContext(ApiContext);
    const {userMedications} = useContext(MedicationContext);

    const [isInDeleteMode, setIsInDeleteMode] = useState(false);

    const [selectedMedication, setSelectedMedication] = useState<IMedicationBase>({
        medicationId: "",
        userId: "",
        prescriptionName: "",
        medicationOwner: {name:"",color:"secondary"},
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
    });
    const [openMedication, setOpenMedication] = useState(false);
    const [editMedication, setEditMedication] = useState(false);

    useEffect(()=>{
        console.log(selectedMedication)
    },[selectedMedication])

    //region ReactFunctions

    /**
     * Renders a single medication item in the Medications list
     * @param medication
     * @param index
     * @constructor
     */
    const SingleMedication = (medication: IMedicationBase, index: number) => {

        medication = {...medication}

        return (
            <>
                <Paper>
                    <Card variant={"outlined"}>
                        <CardContent>
                            <Box sx={{display: "flex"} }>
                                <Box sx={{maxWidth: "75%"}}>
                                    <Typography component={"span"} key={Math.random()}>
                                        {medication.prescriptionName + " | "}
                                    </Typography>
                                    <br/>
                                    <Chip label={medication.medicationOwner.name}
                                          sx={{backgroundColor: medication.medicationOwner.color}}/>
                                </Box>
                                <Box key={Math.random()} sx={{alignContent: "right"}}>

                                    <ButtonGroup orientation={"vertical"}>
                                        <Button variant={"contained"} onClick={() => {
                                            setSelectedMedication({...medication})
                                            setOpenMedication(true)
                                        }}>Open</Button>
                                        <Button key={Math.random()} variant={"contained"} onClick={() => {
                                            setSelectedMedication({...medication})
                                            setEditMedication(true)
                                        }}>Edit</Button>
                                    </ButtonGroup>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Paper>


            </>)
    }

    /**
     * Creates the grid of medications and the logic for deleting medications
     * TODO FINISH LOGIC SO THAT YOU CAN ACTUALLY DELETE MEDICATIONS
     * @constructor
     */
    const MedicationList = () => {

        return (
            <>
                {isInDeleteMode ? <ButtonGroup fullWidth>
                        <Button variant={"contained"} onClick={() => setIsInDeleteMode(false)}>Cancel</Button>
                        <Button variant={"contained"}> Delete Medications and Medication history</Button>
                        <Button variant={"contained"}> Delete Medications and keep Medication history</Button>
                    </ButtonGroup>
                    : <Button variant={"contained"} onClick={() => setIsInDeleteMode(true)}>Delete
                        Medications</Button>}

                <Box sx={{flexGrow: 1}} key={Math.random()}>
                    <Grid container spacing={2} sx={{padding: "1vh"}}>
                        {userMedications.map((medication: IMedicationBase, index: number) => {
                            return <>
                                <Grid item xs={12} sm={6} md={6} lg={3} xl={3} sx={{padding: "1vh"}} key={index}>
                                    <Grid container spacing={1}>
                                        {isInDeleteMode ? <Grid item>
                                            <Checkbox/>
                                        </Grid> : <></>}
                                        <Grid item>
                                            {SingleMedication(medication, index)}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </>
                        })}
                    </Grid>
                </Box>
                <MedicationDialog
                    isOpen={editMedication}
                    isNewMedication={false}
                    medication={selectedMedication}
                    closeDialog={() => setEditMedication(false)}/>
            </>

        )
    }







    //endregion

    return (
        <>
            {loadingBar ? <Skeleton/> : MedicationList()}

            <Dialog
                open={openMedication}
                onBackdropClick={()=>setOpenMedication(false)}
            >
                <DialogTitle>{selectedMedication.prescriptionName}</DialogTitle>
                <Chip label={selectedMedication.medicationOwner.name}
                      sx={{backgroundColor: selectedMedication.medicationOwner.color}}/>




                <DialogContent>
                    {"Bottle dosage: " + selectedMedication.prescriptionDosage}<br/>
                    {"Next Refill Date: " + selectedMedication.nextFillDay}<br/>
                    {"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAStop taking this medication: " + selectedMedication.prescriptionName}<br/>
                    {"Notes: " + selectedMedication.prescriptionName}<br/>
                    {selectedMedication.dosages.map(dose=>{
                        return(
                            <>
                                {"Take " + dose.amount + " at " + dose.time}
                            </>
                        )
                    })}
                </DialogContent>
                <DialogActions>
                    <Button variant={"contained"} fullWidth onClick={()=>setOpenMedication(false)}>Close</Button>
                </DialogActions>
            </Dialog>


        </>
    );
};

export default DisplayMedicationList;

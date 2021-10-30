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
import MedicationCard from "../../Misc/MedicationCard/MedicationCard";
import {IMedicationBase} from "../../../../../Types/MedicationTypes";
import {MedicationContext} from "../../../Context/MedicationContext";
import {ApiContext} from "../../../Context/ApiContext";
import {Skeleton} from "@mui/material";
import {UserContext} from "../../../Context/UserContext";
import MedicationDialog from "../../MedicationDialog/MedicationDialog";


/**
 * This Component displays a list of MedicationCards, if the user has no medications tied to their account a prompt to create one will appear
 * if the user has medications the ability to delete selected medications will be avalible
 * @param props - handleTabsChangeIndex(index: number): void
 * @constructor
 */
const DisplayMedicationList = () => {


    //region Context
    /**
     * Medication Context to get the array of the users medication
     * Api Context to get the loadingBar and to deleteSelectedMedications
     */
    const {userMedications} = useContext(MedicationContext);
    const {loadingBar, putDeleteSelectedMedications} = useContext(ApiContext);
    const {usersPeople} = useContext(UserContext);

    const [isInDeleteMode, setIsInDeleteMode] = useState(false);

    const [selectedMedication, setSelectedMedication] = useState<IMedicationBase>({
        medicationId: "",
        userId: "",
        prescriptionName: "",
        medicationOwner: {name:"",color:""},
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


    const getColor = (name: string) => {
        for (let person of usersPeople) {
            if (person.name == name) {
                return person.color
            }
        }
        return "secondary"
    }

    //region ReactFunctions

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

                <Box sx={{flexGrow: 1}}>
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
            </>
        )
    }



    const SingleMedication = (medication: IMedicationBase, index: number) => {
        const [openMedication, setOpenMedication] = useState(false);
        const [editMedication, setEditMedication] = useState(false);
        console.log("----------------")
        console.log(medication)
        console.log("----------------")
        return (
            <>
                <Paper>
                    <Card variant={"outlined"}>
                        <CardContent>
                            <Box sx={{display: "flex"}}>
                                <Box sx={{maxWidth: "75%"}}>
                                    <Typography component={"span"}>
                                        {medication.prescriptionName + " | "}
                                    </Typography>
                                    <br/>
                                    <Chip label={medication.medicationOwner.name}
                                          sx={{backgroundColor: medication.medicationOwner.color}}/>
                                </Box>
                                <Box sx={{alignContent: "right"}}>

                                    <ButtonGroup orientation={"vertical"}>
                                        <Button variant={"contained"} onClick={() => {
                                            setSelectedMedication(medication)
                                            setOpenMedication(true)
                                        }}>Open</Button>
                                        <Button variant={"contained"} onClick={() => {
                                            setSelectedMedication(medication)
                                            setEditMedication(true)
                                        }}>Edit</Button>
                                    </ButtonGroup>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Paper>
                <MedicationDialog
                    isOpen={editMedication}
                    isNewMedication={false}
                    medication={userMedications[index]}
                    closeDialog={() => setEditMedication(false)}/>
                <Dialog
                    open={openMedication}
                    onBackdropClick={()=>setOpenMedication(false)}
                >
                    <DialogTitle>{medication.prescriptionName}</DialogTitle>
                    <Chip label={medication.medicationOwner.name}
                          sx={{backgroundColor: medication.medicationOwner.color}}/>
                    <DialogContent>
                        {"Bottle dosage: " + medication.prescriptionDosage}<br/>
                        {"Next Refill Date: " + medication.nextFillDay}<br/>
                        {"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAStop taking this medication: " + medication.prescriptionName}<br/>
                        {"Notes: " + medication.prescriptionName}<br/>
                        {medication.dosages.map(dose=>{
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
            </>)
    }

    //endregion

    return (
        <>
            {loadingBar ? <Skeleton/> : MedicationList()}

        </>
    );
};

export default DisplayMedicationList;

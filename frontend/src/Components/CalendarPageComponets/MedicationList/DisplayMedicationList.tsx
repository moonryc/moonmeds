import {
    Box,
    Button,
    ButtonGroup,
    CardContent, Checkbox,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Paper, Skeleton, Typography
} from "@mui/material";
import Card from "@mui/material/Card";
import React, {useContext, useEffect, useState} from "react";
import {IMedicationBase} from "../../../../../Types/MedicationTypes";
import {ApiContext} from "../../../Context/ApiContext";
import {MedicationContext} from "../../../Context/MedicationContext";
import MedicationDialog from "../../MedicationDialog/MedicationDialog";
import {makeMedication} from "../../../typeConstructors";


interface IDisplayMedicationList {
    isDialogOpen:boolean,
    closeListOfMedications():void,
}


/**
 * This component handels all logic for rendering the list of medications associated with the users account
 * @constructor
 */
const DisplayMedicationList:React.FC<IDisplayMedicationList> = ({isDialogOpen,closeListOfMedications}) => {
    const {loadingBar, putDeleteSelectedMedications} = useContext(ApiContext);
    const {userMedications} = useContext(MedicationContext);

    const [isInDeleteMode, setIsInDeleteMode] = useState(false);
    const [medicationIdDeleteArray, setMedicationIdDeleteArray] = useState<string[]>([]);


    const [selectedMedication, setSelectedMedication] = useState<IMedicationBase>(makeMedication());

    const [openMedication, setOpenMedication] = useState(false);
    const [editMedication, setEditMedication] = useState(false);


    //region ReactFunctions

    interface ISingleMedicationProps{
        medication:IMedicationBase,
        index:number,
    }

    /**
     * Renders a single medication item in the Medications list
     * @param medication
     * @param index
     * @constructor
     */
    const SingleMedication:React.FC<ISingleMedicationProps> = ({medication,index}) => {
        medication = {...medication};

        return (
            <>
                <Paper key={Math.random()}>
                    <Card sx={{minWidth: "100%"}} variant={"outlined"} key={Math.random()}>
                        <CardContent key={Math.random()}>
                            <Box sx={{display: "flex"}} key={Math.random()}>
                                <Box sx={{maxWidth: "100%"}} key={Math.random()}>
                                    <Typography component={"span"} key={Math.random()}>
                                        {medication.prescriptionName + " | "}
                                    </Typography>
                                    <br/>
                                    <Chip key={Math.random()}
                                        label={medication.medicationOwner.name}
                                        sx={{backgroundColor: medication.medicationOwner.color}}
                                    />
                                </Box>
                                <Box key={Math.random()} sx={{alignContent: "right"}}>
                                    <ButtonGroup orientation={"vertical"} key={Math.random()}>
                                        <Button
                                            key={Math.random()}
                                            variant={"contained"}
                                            onClick={() => {
                                                setSelectedMedication({...medication});
                                                setOpenMedication(true);
                                            }}
                                        >
                                            Open
                                        </Button>
                                        <Button
                                            key={Math.random()}
                                            variant={"contained"}
                                            onClick={() => {
                                                setSelectedMedication({...medication});
                                                setEditMedication(true);
                                                console.log({...medication})
                                            }}
                                        >
                                            Edit
                                        </Button>
                                    </ButtonGroup>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                </Paper>
            </>
        );
    };

    const deleteSelectedMedicationsKeepHistory = () => {
      putDeleteSelectedMedications(medicationIdDeleteArray, false).then(r=>r);
    }

    const deleteSelectedMedicationsEraseHistory = () => {
        putDeleteSelectedMedications(medicationIdDeleteArray, true).then(r=>r);
    }

    /**
     * Creates the grid of medications and the logic for deleting medications
     * TODO FINISH LOGIC SO THAT YOU CAN ACTUALLY DELETE MEDICATIONS
     * @constructor
     */
    const MedicationList = () => {
        return (
            <>
                {isInDeleteMode ? (
                        <ButtonGroup fullWidth>
                            <Button
                                variant={"contained"}
                                onClick={() => setIsInDeleteMode(false)}
                            >
                                Cancel
                            </Button>
                            <Button variant={"contained"} onClick={()=>deleteSelectedMedicationsEraseHistory()}>
                                Delete Medications and Medication history
                            </Button>
                            <Button variant={"contained"} onClick={()=>deleteSelectedMedicationsKeepHistory()}>
                                Delete Medications and keep Medication history
                            </Button>
                        </ButtonGroup>) :
                    (<Button variant={"contained"} onClick={() => setIsInDeleteMode(true)}>
                        Delete Medications
                    </Button>)}


                {userMedications.map(
                    (medication: IMedicationBase, index: number) => {
                        return (

                            <Grid key={Math.random()}>
                                <Grid container spacing={1} key={Math.random()}>
                                    {isInDeleteMode ? (
                                        <Grid item key={Math.random()}>
                                            <Checkbox key={Math.random()} onChange={()=>{
                                                setMedicationIdDeleteArray(prevState => {
                                                    if (prevState.includes(medication.medicationId)) {
                                                        return prevState.filter(id => id !== medication.medicationId);
                                                    } else {
                                                        return [...prevState, medication.medicationId];
                                                    }
                                                })
                                            }}/>
                                        </Grid>
                                    ) : (
                                        <div key={Math.random()}></div>
                                    )}
                                    <Grid item key={Math.random()}>
                                        <SingleMedication index={index} medication={medication}/>
                                    </Grid>
                                </Grid>
                            </Grid>
                        );
                    }
                )}


            </>
        );
    };

    //endregion


    const MedicationOverViewDialog = () => {
        return (
            <Dialog
            open={openMedication}
            onBackdropClick={() => setOpenMedication(false)}
        >
            <DialogTitle>{selectedMedication.prescriptionName}</DialogTitle>
            <Chip
                label={selectedMedication.medicationOwner.name}
                sx={{backgroundColor: selectedMedication.medicationOwner.color}}
            />

            <DialogContent>
                {"Bottle dosage: " + selectedMedication.prescriptionDosage}
                <br/>
                {"Next Refill Date: " + selectedMedication.nextFillDay}
                <br/>
                {"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAStop taking this medication: " +
                selectedMedication.prescriptionName}
                <br/>
                {"Notes: " + selectedMedication.prescriptionName}
                <br/>
                {selectedMedication.dosages.map((dose) => {
                    return <>{"Take " + dose.amount + " at " + dose.time}</>;
                })}
            </DialogContent>
            <DialogActions>
                <Button
                    variant={"contained"}
                    fullWidth
                    onClick={() => setOpenMedication(false)}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>)
    }


    return (
        <>
            {/*List of Medications Dialog*/}
            <Dialog open={isDialogOpen} maxWidth={"xs"} fullWidth>
                <DialogTitle>Medications</DialogTitle>
                {loadingBar ? <Skeleton/> : <MedicationList/>}
                <DialogActions>
                        <Button
                            variant={"contained"}
                            fullWidth
                            onClick={()=>closeListOfMedications()}
                        >
                            Close
                        </Button>
                </DialogActions>
            </Dialog>


            {/*Display Dialog of a selected Medication as a general overview*/}
            <MedicationOverViewDialog/>

            {/*Display Edit medication dialog of selected medication*/}
            <MedicationDialog
                isOpen={editMedication}
                isNewMedication={false}
                medication={selectedMedication}
                closeDialog={() => setEditMedication(false)}/>


        </>
    );
};

export default DisplayMedicationList;

import {
    Box,
    Button,
    ButtonGroup,
    Checkbox,
    Dialog,
    DialogActions,
    DialogTitle,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from "@mui/material";
import React, {useCallback, useContext, useState} from "react";
import {IMedicationBase} from "../../../../../Types/MedicationTypes";
import {ApiContext} from "../../../Context/ApiContext";
import {MedicationContext} from "../../../Context/MedicationContext";
import MedicationDialog from "../../MedicationDialog/MedicationDialog";
import {makeMedication} from "../../../typeConstructors";
import MedicationOverViewDialog from "../DateDetails/MedicationOverViewDialog";
import {Medication} from "@mui/icons-material";


interface IDisplayMedicationList {
    isDialogOpen: boolean,

    closeListOfMedications(): void,
}


/**
 * This component handels all logic for rendering the list of medications associated with the users account
 * @constructor
 */
const DisplayMedicationList: React.FC<IDisplayMedicationList> = ({isDialogOpen, closeListOfMedications}) => {
    const {loadingBar, putDeleteSelectedMedications} = useContext(ApiContext);
    const {userMedications} = useContext(MedicationContext);

    const [isInDeleteMode, setIsInDeleteMode] = useState(false);
    const [medicationIdDeleteArray, setMedicationIdDeleteArray] = useState<string[]>([]);


    const [selectedMedication, setSelectedMedication] = useState<IMedicationBase>(makeMedication());

    const [openMedication, setOpenMedication] = useState<boolean>(false);
    const [editMedication, setEditMedication] = useState<boolean>(false);


    const deleteSelectedMedicationsKeepHistory = () => {
        putDeleteSelectedMedications(medicationIdDeleteArray, false).then(r => r);
    }

    const deleteSelectedMedicationsEraseHistory = () => {
        putDeleteSelectedMedications(medicationIdDeleteArray, true).then(r => r);
    }

    const setCloseOverViewDialog = useCallback((value: boolean) => {
            setOpenMedication(value);
        },
        [],
    );

    const setOpenEditDialog = useCallback((value: boolean) => {
            setEditMedication(value);
        },
        [],
    );

    const setCloseEditDialog = useCallback((medicationObject: IMedicationBase) => {
            setEditMedication(false);
        },
        [],
    );


    return (
        <>
            {/*List of Medications Dialog*/}
            <Dialog open={isDialogOpen} fullWidth maxWidth={"xs"}>
                <Box>
                    <DialogTitle sx={{textAlign: "center"}}>Medications</DialogTitle>
                    <List>
                        {
                            userMedications.map(medication => {
                                return (
                                    <div key={medication.medicationId}>
                                        <Divider/>
                                        <ListItem
                                            disablePadding
                                        >
                                            {isInDeleteMode ? <Checkbox onChange={() => {
                                                setMedicationIdDeleteArray(prevState => {
                                                    if (prevState.includes(medication.medicationId)) {
                                                        return prevState.filter(id => id !== medication.medicationId);
                                                    } else {
                                                        return [...prevState, medication.medicationId];
                                                    }
                                                });
                                            }}
                                            /> : <></>}
                                            <ListItemButton
                                                sx={{
                                                    '&:hover': {bgcolor: 'secondary.main', opacity: 0.5},
                                                    '& .MuiButtonBase-root': {opacity: 1}
                                                }}
                                                disabled={isInDeleteMode}
                                                onClick={() => {
                                                    setSelectedMedication({...medication});
                                                    setOpenMedication(true)
                                                }}
                                            >
                                                <ListItemIcon>
                                                    <Medication
                                                        sx={{color: medication.medicationOwner.color}}/>
                                                </ListItemIcon>
                                                <ListItemText
                                                    primary={medication.prescriptionName}/>
                                            </ListItemButton>
                                        </ListItem>

                                    </div>
                                )
                            })
                        }
                        <Divider/>
                    </List>

                    <DialogActions>
                        {isInDeleteMode ? (
                                <ButtonGroup orientation='vertical' fullWidth sx={{pb: '1vw'}}>
                                    <Button
                                        variant={"contained"}
                                        onClick={() => setIsInDeleteMode(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button variant={"contained"} onClick={() => deleteSelectedMedicationsEraseHistory()}>
                                        Delete Medications and Medication history
                                    </Button>
                                    <Button variant={"contained"} onClick={() => deleteSelectedMedicationsKeepHistory()}>
                                        Delete Medications and keep Medication history
                                    </Button>
                                </ButtonGroup>) :
                            <Box sx={{display: 'flex', width: '100%'}}>
                                <ButtonGroup fullWidth orientation={"vertical"}>
                                    <Button
                                        variant={"contained"}
                                        fullWidth
                                        onClick={() => closeListOfMedications()}
                                    >
                                        Close
                                    </Button>
                                    <Button variant={"contained"} onClick={() => setIsInDeleteMode(true)} sx={{}}
                                            fullWidth>
                                        Delete Medications
                                    </Button>
                                </ButtonGroup>
                            </Box>}
                    </DialogActions>
                </Box>
            </Dialog>


            {/*Display Dialog of a selected Medication as a general overview*/}
            <MedicationOverViewDialog
                openMedication={openMedication}
                selectedMedication={{...selectedMedication}}
                setOpenMedication={setCloseOverViewDialog} setEditMedication={setOpenEditDialog}/>

            {/*Display Edit medication dialog of selected medication*/}
            <MedicationDialog
                isOpen={editMedication}
                isNewMedication={false}
                medication={{...selectedMedication}}
                closeDialog={setCloseEditDialog}/>


        </>
    );
};

export default DisplayMedicationList;

import {
    Box,
    Button,
    ButtonGroup,
    CardContent,
    Checkbox,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Paper,
    Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Typography
} from "@mui/material";
import Card from "@mui/material/Card";
import React, {useCallback, useContext, useState} from "react";
import {IMedicationBase} from "../../../../../Types/MedicationTypes";
import {ApiContext} from "../../../Context/ApiContext";
import {MedicationContext} from "../../../Context/MedicationContext";
import MedicationDialog from "../../MedicationDialog/MedicationDialog";
import {makeMedication} from "../../../typeConstructors";
import MedicationOverViewDialog from "../DateDetails/MedicationOverViewDialog";
import {backgroundStyle, centeredTextStyle} from "../../../Styles";
import {Face} from "@mui/icons-material";


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

    const [openMedication, setOpenMedication] = useState(false);
    const [editMedication, setEditMedication] = useState(false);


    //region ReactFunctions

    interface ISingleMedicationProps {
        medication: IMedicationBase,
        index: number,

        getSetSelectedMedication(medication: IMedicationBase): void
    }


    /**
     * Renders a single medication item in the Medications list
     * @param medication
     * @param index
     * @param setSelectedMedication
     * @constructor
     */
    const SingleMedication: React.FC<ISingleMedicationProps> = ({medication, index, getSetSelectedMedication}) => {
        medication = {...medication};

        return (
            <>
                <Card  sx={{width:'100%'}} variant={"outlined"} key={Math.random()}>
                    <CardContent key={Math.random()} >
                        <Box sx={{display: "flex"}} key={Math.random()}>
                            <Box sx={{width: "100%"}} key={Math.random()}>
                                <Typography component={"span"} key={Math.random()}>
                                    {medication.prescriptionName + " | "}
                                </Typography>
                                <br/>
                                <Chip key={Math.random()}
                                      label={medication.medicationOwner.name}
                                      sx={{backgroundColor: medication.medicationOwner.color}}
                                />
                            </Box>
                            <Box sx={{alignContent: "right"}}>
                                <ButtonGroup orientation={"vertical"} key={Math.random()}>
                                    <Button
                                        variant={"contained"}
                                        onClick={() => {
                                            getSetSelectedMedication({...medication});
                                            setOpenMedication(true);
                                        }}
                                    >
                                        Open
                                    </Button>
                                    <Button
                                        variant={"contained"}
                                        onClick={() => {
                                            getSetSelectedMedication({...medication});
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


            </>
        );
    };

    interface IMedicationList {
        getSetSelectedMedication(medication: IMedicationBase): void
    }

    /**
     * Creates the grid of medications and the logic for deleting medications
     * @constructor
     */
    const MedicationList: React.FC<IMedicationList> = ({getSetSelectedMedication}) => {
        return (
            <>
                {isInDeleteMode ? (
                        <ButtonGroup orientation='vertical' fullWidth sx={{pb:'1vw'}}>
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
                    (<Button variant={"contained"} onClick={() => setIsInDeleteMode(true)} sx={{mb:'1vw'}} fullWidth>
                        Delete Medications
                    </Button>)}


                {userMedications.map(
                    (medication: IMedicationBase, index: number) => {
                        return (

                            <Box  key={"Grid" + index}>
                                <Grid container spacing={12} key={Math.random()}>
                                    {isInDeleteMode ? (
                                        <><Grid sx={{display:'flex'}} item xs={12} key={Math.random()}>
                                            <Checkbox onChange={() => {
                                                setMedicationIdDeleteArray(prevState => {
                                                    if (prevState.includes(medication.medicationId)) {
                                                        return prevState.filter(id => id !== medication.medicationId);
                                                    } else {
                                                        return [...prevState, medication.medicationId];
                                                    }
                                                })
                                            }}/>


                                                <SingleMedication
                                                    index={index} medication={medication}
                                                    getSetSelectedMedication={getSetSelectedMedication}/>
                                            </Grid></>
                                    ) : (
                                        <>
                                            {/*TODO: SPOTEXX CENTER THIS*/}
                                            <Grid item xs={12}>
                                                <SingleMedication
                                                    index={index} medication={medication}
                                                    getSetSelectedMedication={getSetSelectedMedication}/>
                                            </Grid>
                                        </>

                                    )}
                                </Grid>
                            </Box>
                        );
                    }
                )}


            </>
        );
    };

    //endregion


    const deleteSelectedMedicationsKeepHistory = () => {
        putDeleteSelectedMedications(medicationIdDeleteArray, false).then(r => r);
    }

    const deleteSelectedMedicationsEraseHistory = () => {
        putDeleteSelectedMedications(medicationIdDeleteArray, true).then(r => r);
    }

    const setCloseOverViewDialog= useCallback((value:boolean) => {
            setOpenMedication(value);
        },
        [],
    );

    const columns = [
        { id: "med", label: "Medication", minWidth: 60 },
        { id: "owner", label: "Owner", minWidth: 60 },
        { id: "edit", label: "Edit", minWidth: 60 },
        { id: "delete", label: "Delete", minWidth: 60 },
    ];
    const rows = userMedications.map((medication:IMedicationBase, ) => {
        return {
            med: <Chip sx={{ bgcolor: medication.medicationOwner.color }}
                       icon={<Face />}
                       label={medication.prescriptionName.length > 15 ? medication.prescriptionName.slice(0,15)+'...' : medication.prescriptionName}
                       title={medication.prescriptionName}
                       onClick={() => {setOpenMedication(true)}}
                        />,
            owner: <Chip sx={{ bgcolor: medication.medicationOwner.color }}
                         icon={<Face />}
                         label={medication.medicationOwner.name.length > 10? medication.medicationOwner.name.slice(0,15)+'...' : medication.medicationOwner.name}
                         title={medication.medicationOwner.name}
                         onClick={() => {setOpenMedication(true);}}
                    />,
            edit: <Button>Edit</Button>,//TODO mooon set these two buttons up please
            delete:<Button>Delete</Button>

        };
    });

    return (
        <>
            {/*List of Medications Dialog*/}
            <Dialog open={isDialogOpen}  fullWidth >
                <Box sx={{p:'1vw'}}>
                <DialogTitle>Medications</DialogTitle>
                {/*{loadingBar ?*/}
                {/*    <>*/}
                {/*        <Skeleton/>*/}
                {/*        <Skeleton/>*/}
                {/*        <Skeleton/>*/}
                {/*        <Skeleton/>*/}
                {/*        <Skeleton/>*/}
                {/*        <Skeleton/>*/}
                {/*        <Skeleton/>*/}
                {/*        <Skeleton/>*/}
                {/*        <Skeleton/>*/}
                {/*        <Skeleton/>*/}
                {/*        <Skeleton/>*/}
                {/*    </> :*/}
                {/*     <MedicationList getSetSelectedMedication={(medication: IMedicationBase) => {*/}
                {/*         setSelectedMedication(medication)}}/>}*/}
                    <TableContainer sx={{ maxHeight: 440 }}>
                        <Table aria-label="sticky table">
                            <TableHead>
                                <TableRow sx={{bgcolor:'background.paper'}}>
                                    {columns.map((column) => (
                                        <TableCell sx={{textAlign:'center'}}
                                            key={column.id}
                                            //align={column.align}
                                            style={{ top: 57, minWidth: column.minWidth }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows
                                    .map((row) => {
                                        return (

                                            <TableRow
                                                hover
                                                role="checkbox"
                                                tabIndex={-1}
                                                key={Math.random()}
                                            >
                                                {columns.map((column) => {//@ts-ignore
                                                    const value = row[column.id];
                                                    return (//@ts-ignore
                                                        <TableCell key={column.id} align={'center'}>
                                                            {/*//@ts-ignore*/}
                                                            {column.format && typeof value === "number"
                                                                // @ts-ignore
                                                                ? column.format(value)
                                                                : value}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>

                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                <DialogActions>
                    <Button
                        variant={"contained"}
                        fullWidth
                        onClick={() => closeListOfMedications()}
                    >
                        Close
                    </Button>
                </DialogActions>
                </Box>
            </Dialog>


            {/*Display Dialog of a selected Medication as a general overview*/}
            <MedicationOverViewDialog
                openMedication={openMedication}
                selectedMedication={selectedMedication}
                setOpenMedication={setCloseOverViewDialog}/>

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

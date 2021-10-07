import React, {useContext, useEffect, useState} from 'react';
import Card from "@mui/material/Card";
import {Box, Button, Checkbox, Grid} from "@mui/material";
import MedicationCard from "../../Misc/MedicationCard/MedicationCard";
import {IMedicationFrontEnd} from "../../../../../Types/MedicationType";
import {MedicationContext} from "../../../Context/MedicationContext";
import {ApiContext} from "../../../Context/ApiContext";
import {Skeleton} from "@mui/lab";


interface IDisplayMedicationList {
    handleTabsChangeIndex(index: number): void,
}


const DisplayMedicationList = (props: IDisplayMedicationList) => {

    // const {userMedications,putDeleteSelectedMedications,fetchUserMedications} = useContext(UserContext);
    const {userMedications} = useContext(MedicationContext);
    const {loadingBar} = useContext(ApiContext);
    const {putDeleteSelectedMedications, fetchUserMedications, fetchUserMedicationsDosages} = useContext(ApiContext);

    const [medicationsArray, setMedicationsArray] = useState<IMedicationFrontEnd[] | []>(userMedications);


    const [deleteArray, setDeleteArray] = useState<IMedicationFrontEnd[]>([]);
    const [isDeletionEnabled, setIsDeletionEnabled] = useState<boolean>(false);
    const toggleDeletion = () => {
        setIsDeletionEnabled(!isDeletionEnabled)
    }


    const handleCheckBoxClick = (medication: IMedicationFrontEnd) => {

        let tempArray: IMedicationFrontEnd[] = [...deleteArray];

        if (tempArray.includes(medication)) {
            tempArray.splice(tempArray.indexOf(medication), 1)
        } else {
            tempArray.push(medication)
        }
        setDeleteArray(tempArray)
    }

    const handleDeleteMedicationsAction = async () => {

        await putDeleteSelectedMedications(deleteArray)
        await fetchUserMedications()
        await fetchUserMedicationsDosages()

    }

    //TODO is this needed?
    useEffect(() => {
        setMedicationsArray(userMedications)
    }, [medicationsArray, userMedications])


    return (

        <Box sx={{maxHeight: '70vh', overflow: 'auto'}}>

            <Card>
                {loadingBar ? <><Skeleton variant="rectangular"/><br/><Skeleton variant="rectangular"/><br/><Skeleton
                    variant="rectangular"/><br/><Skeleton variant="rectangular"/><br/><Skeleton
                    variant="rectangular"/><br/><Skeleton variant="rectangular"/><br/><Skeleton
                    variant="rectangular"/><br/><Skeleton variant="rectangular"/><br/></> : <>

                <br/>
                {medicationsArray?.length == 0 || medicationsArray == null ?
                    <Button onClick={() => props.handleTabsChangeIndex(2)}>New Medication</Button> :
                    <>
                        <Grid container>
                            <Grid item xs={6}>
                                <Button sx={{bgcolor: 'primary.light', color: 'text.primary'}}
                                        onClick={() => toggleDeletion()}>
                                    {isDeletionEnabled ? "Cancel" : "Delete medication"}
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                {isDeletionEnabled ? <Button sx={{bgcolor: 'primary.light', color: 'text.primary'}}
                                                             onClick={() => handleDeleteMedicationsAction()}>Delete
                                    Medications</Button> : <></>}
                            </Grid>
                        </Grid>
                        {medicationsArray.map((medication: IMedicationFrontEnd) =>
                            <>
                                <Grid container>
                                    {/*//TODO(TRAVIS) FLEXBOX FUCKER*/}
                                    {isDeletionEnabled ? <Grid item>
                                        <Checkbox key={medication._id}
                                                  onClick={() => handleCheckBoxClick(medication)}/>
                                    </Grid> : <></>
                                    }
                                    <Grid item>
                                        <MedicationCard
                                            isNewCard={false}
                                            _id={medication._id}
                                            prescriptionName={medication.prescriptionName}
                                            prescriptionDosage={medication.prescriptionDosage}
                                            startDay={medication.startDay}
                                            nextFillDay={medication.nextFillDay}
                                            dosages={medication.dosages}
                                            userNotes={medication.userNotes} handleTabsChangeIndex={() => {
                                        }}/>
                                    </Grid>
                                </Grid>
                                <br/>
                            </>)}
                    </>
                }
                </>}
            </Card>
        </Box>
    );
};

export default DisplayMedicationList;

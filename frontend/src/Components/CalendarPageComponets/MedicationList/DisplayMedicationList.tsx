import React, {useContext, useEffect, useState} from 'react';
import Card from "@mui/material/Card";
import {Box, Button, Checkbox, Dialog, Grid} from "@mui/material";
import MedicationCard from "../../Misc/MedicationCard/MedicationCard";
import {IMedicationBase} from "../../../../../Types/MedicationTypes";
import {MedicationContext} from "../../../Context/MedicationContext";
import {ApiContext} from "../../../Context/ApiContext";
import {Skeleton} from "@mui/material";

/**
 * @property handleTabsChangeIndex(index: number): void
 */
interface IDisplayMedicationList {
    handleTabsChangeIndex(index: number): void,
}

/**
 * This Component displays a list of MedicationCards, if the user has no medications tied to their account a prompt to create one will appear
 * if the user has medications the ability to delete selected medications will be avalible
 * @param props - handleTabsChangeIndex(index: number): void
 * @constructor
 */
const DisplayMedicationList = (props: IDisplayMedicationList) => {


    //region Context
    /**
     * Medication Context to get the array of the users medication
     * Api Context to get the loadingBar and to deleteSelectedMedications
     */
    const {userMedications} = useContext(MedicationContext);
    const {loadingBar, putDeleteSelectedMedications} = useContext(ApiContext);

    //endregion

    //region useState

    /**
     * An array of medications Ids that are selected that the user wishes to be deleted
     */
    const [deleteArray, setDeleteArray] = useState<string[]>([]);
    /**
     * Is the user wishing to delete a medication from the medication list
     */
    const [isDeletionEnabled, setIsDeletionEnabled] = useState<boolean>(false);

    //endregion

    //region functions

    /**
     * Toggles isDeletionEnabled between true and false
     */
    const toggleDeletion = () => {
        setIsDeletionEnabled(!isDeletionEnabled)
    }

    /**
     * if the checkbox is selected it will add the medication to the deleteArray,
     * if it is then unselected it will then be removed from the list
     * @param medication - IMedicationBase
     */
    const handleCheckBoxClick = (medication: IMedicationBase) => {

        let tempArray: string[] = [...deleteArray];

        if (tempArray.includes(medication.medicationId)) {
            tempArray.splice(tempArray.indexOf(medication.medicationId), 1)
        } else {
            tempArray.push(medication.medicationId)
        }
        setDeleteArray(tempArray)
    }

    //endregion

    //region ApiCalls

    /**
     * sends delete request and updates the dosages and medications and sets the deleteArray back to []
     */
    const handleDeleteMedicationsAction = async () => {
        //TODO make false not always false
        await putDeleteSelectedMedications(deleteArray,false)
        setDeleteArray([])
    }

    //endregion

    const displaySkeletonLoading = () => {
        return (
            <>
                <Skeleton variant="rectangular"/><br/><Skeleton variant="rectangular"/><br/><Skeleton
                variant="rectangular"/><br/><Skeleton variant="rectangular"/><br/><Skeleton
                variant="rectangular"/><br/><Skeleton variant="rectangular"/><br/><Skeleton
                variant="rectangular"/><br/><Skeleton variant="rectangular"/><br/>
            </>
        )
    }

    const deleteMedicationButtons = () => {
        return (
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
        )
    }

    return (

        <Box sx={{maxHeight: '70vh', overflow: 'auto'}}>


            <Card>
                {loadingBar ? displaySkeletonLoading() : <>

                    <br/>
                    {deleteMedicationButtons()}
                    {userMedications?.length == 0 || userMedications == null ?
                        <Button onClick={() => {}}>New Medication</Button> :
                        <>

                            {userMedications.map((medication: IMedicationBase) =>
                                <>
                                    <Grid container>
                                        {/*//TODO(TRAVIS) FLEXBOX FUCKER*/}
                                        {isDeletionEnabled ? <Grid item>
                                            <Checkbox key={medication.medicationId}
                                                      onClick={() => handleCheckBoxClick(medication)}/>
                                        </Grid> : <></>
                                        }
                                        <Grid item>
                                            {/*handleTabsChangeIndex is  a blank function because it is uneeded here but is needed when creating a new medication*/}
                                            <MedicationCard
                                                isNewCard={false}
                                                userId={medication.userId}
                                                medicationId={medication.medicationId}
                                                endDate={medication.endDate}
                                                inDefinite={medication.inDefinite}
                                                prescriptionName={medication.prescriptionName}
                                                prescriptionDosage={medication.prescriptionDosage}
                                                nextFillDay={medication.nextFillDay}
                                                dosages={medication.dosages}
                                                userNotes={medication.userNotes}
                                                medicationOwner={medication.medicationOwner}
                                            />
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

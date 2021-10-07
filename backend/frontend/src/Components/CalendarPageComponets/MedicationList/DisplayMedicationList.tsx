import React, {useContext, useEffect, useState} from 'react';
import Card from "@mui/material/Card";
import {Button, Checkbox, Grid, LinearProgress} from "@mui/material";
import {UserContext} from "../../../Context/UserContext";
import MedicationCard from "../../Misc/MedicationCard/MedicationCard";
import {IMedicationFrontEnd} from "../../../../../Types/MedicationType";
import {MedicationContext} from "../../../Context/MedicationContext";
import {fetchUserMedications, putDeleteSelectedMedications} from "../../../Services/ApiCalls";


interface IDisplayMedicationList {
    handleTabsChangeIndex(index: number): void,
}


const DisplayMedicationList = (props: IDisplayMedicationList) => {


    // const {userMedications,putDeleteSelectedMedications,fetchUserMedications} = useContext(UserContext);
    const {userMedications,setUpdateBar} = useContext(MedicationContext);

    const [medicationsArray, setMedicationsArray] = useState<IMedicationFrontEnd[] | []>(userMedications);


    const [deleteArray, setDeleteArray] = useState<IMedicationFrontEnd[]>([]);
    const [isDeletionEnabled, setIsDeletionEnabled] = useState<boolean>(false);
    const toggleDeletion = () => {
        setIsDeletionEnabled(!isDeletionEnabled)
    }


    const handleCheckBoxClick = (medication:IMedicationFrontEnd) => {

        let tempArray: IMedicationFrontEnd[] = [...deleteArray];

        if (tempArray.includes(medication)) {
            tempArray.splice(tempArray.indexOf(medication), 1)
        } else {
            tempArray.push(medication)
        }
        setDeleteArray(tempArray)
    }

    const handleDeleteMedicationsAction = () => {
        setUpdateBar(true)
        putDeleteSelectedMedications(deleteArray).then((response)=>{
            if(response.error){
                //TODO
            }else{

            }
        })
        fetchUserMedications().then((response)=>{
            if(response.error){
                //TODO
            }else{

            }
        })
        setTimeout(()=>{setUpdateBar(false)},1000)
    }

    useEffect(() => {
        setMedicationsArray(userMedications)
     }, [medicationsArray, userMedications])


    return (
        <div>
            <Card>
                <br/>
                {medicationsArray?.length == 0 || medicationsArray == null ?
                    <Button onClick={() => props.handleTabsChangeIndex(2)}>New Medication</Button> :
                    <>
                        <Grid container>
                            <Grid item xs={6}>
                        <Button onClick={() => toggleDeletion()}>
                            {isDeletionEnabled ? "Cancel" : "Delete medication"}
                        </Button>
                            </Grid>
                            <Grid item xs={6}>
                        {isDeletionEnabled? <Button onClick={()=>handleDeleteMedicationsAction()}>Delete Medications</Button> : <></>}
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
            </Card>
        </div>
    );
};

export default DisplayMedicationList;

import React, {useContext, useEffect, useState} from 'react';
import Card from "@mui/material/Card";
import {Button, Checkbox, Grid} from "@mui/material";
import {UserContext} from "../../Misc/UserContext";
import MedicationCard from "../../Misc/MedicationCard/MedicationCard";
import {IMedicationFrontEnd} from "../../../../../Types/MedicationType";


interface IDisplayMedicationList {
    handleTabsChangeIndex(index: number): void,
}


const DisplayMedicationList = (props: IDisplayMedicationList) => {


    const {userMedications} = useContext(UserContext);

    const [medicationsArray, setMedicationsArray] = useState<IMedicationFrontEnd[] | [] | null>(userMedications);
    //TRAVIS DONT DELETE THIS
    const [deleteArray, setDeleteArray] = useState<string[]>([]);

    const [isDeletionEnabled, setIsDeletionEnabled] = useState<boolean>(false);
    const toggleDeletion = () => {
        setIsDeletionEnabled(!isDeletionEnabled)
    }


    useEffect(() => {
        setMedicationsArray(userMedications)
        console.log(medicationsArray)
    }, [medicationsArray, userMedications])



    return (
        <div>
            <Card>
                <br/>
                {medicationsArray?.length == 0 || medicationsArray == null ?
                    <Button onClick={() => props.handleTabsChangeIndex(2)}>New Medication</Button> :
                    <>
                        <Button onClick={() => toggleDeletion()}>Delete medication</Button>
                        {medicationsArray.map((medication: IMedicationFrontEnd) =>
                            <>
                                <Grid container>
                                    {/*//TODO(TRAVIS) FLEXBOX FUCKER*/}
                                    {isDeletionEnabled ? <Grid item>
                                        <Checkbox/>
                                    </Grid>:<></>
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

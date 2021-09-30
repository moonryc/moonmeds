import React, {useContext, useEffect, useState} from 'react';
import Card from "@mui/material/Card";
import {Button} from "@mui/material";
import {UserContext} from "../../Misc/UserContext";
import MedicationCard, {IMedicationCardProps} from "../../Misc/MedicationCard/MedicationCard";

const DisplayMedicationList = () => {

    const [medicationsArray, setMedicationsArray] = useState<[]>();

    const {userId} = useContext(UserContext);

    useEffect(()=>{
        console.log(medicationsArray)
    },[medicationsArray])

    const getListOfMedications = async () => {
            let url='/medication/userMedications';
            // Default options are marked with *
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${userId}`
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                method: 'GET', // or 'PUT'
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setMedicationsArray(data);
                })
                .catch((error) => {
                    console.error('Error: ', error);
                });
            return response;
    }
    
    
    
    
    return (
        <div>
            <Card>
                <Button onClick={()=>getListOfMedications()}>Load Medications</Button>
                {medicationsArray ? medicationsArray.map((medication: IMedicationCardProps) =>
                    <><MedicationCard
                        medicationId={medication.medicationId}
                        prescriptionName={medication.prescriptionName}
                        prescriptionDosage={medication.prescriptionDosage}
                        remainingDosages={medication.remainingDosages}
                        nextFillDay={medication.nextFillDay}
                        dosages={medication.dosages}
                        userNotes={medication.userNotes} isNewCard={false}/><br/>
                    </>): <></>}


            </Card>

        </div>
    );
};

export default DisplayMedicationList;

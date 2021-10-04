import React, {useContext, useEffect, useState} from 'react';
import Card from "@mui/material/Card";
import {Button} from "@mui/material";
import {UserContext} from "../../Misc/UserContext";
import MedicationCard, {IMedicationCardProps} from "../../Misc/MedicationCard/MedicationCard";
import {IMedicationFrontEnd} from "../../../Types/MedicationType";


interface IDisplayMedicationList {
    medicationsArray:IMedicationFrontEnd[]|null,
}


const DisplayMedicationList = (props:IDisplayMedicationList) => {

    const [medicationsArray, setMedicationsArray] = useState<IMedicationFrontEnd[]|null>(props.medicationsArray);

    const {userId} = useContext(UserContext);

    //TODO need to update the emdications array when the add new medication button is clicked
    useEffect(()=>{
    },[medicationsArray])

    // const getListOfMedications = async () => {
    //         let url='/medication/userMedications';
    //         // Default options are marked with *
    //         const response = await fetch(url, {
    //             headers: {
    //                 'Authorization': `Bearer ${userId}`
    //                 // 'Content-Type': 'application/x-www-form-urlencoded',
    //             },
    //             method: 'GET', // or 'PUT'
    //         })
    //             .then(response => response.json())
    //             .then(data => {
    //                 console.log(data)
    //                 setMedicationsArray(data);
    //             })
    //             .catch((error) => {
    //                 console.error('Error: ', error);
    //             });
    //         return response;
    // }
    // getListOfMedications()

    return (
        <div>
            <Card>
                <br/>

                {medicationsArray==null ? <>Click the "Add A Medication" to add a new medication</>:
                    medicationsArray.map((medication: IMedicationFrontEnd) =>
                    <>
                        <MedicationCard
                            isNewCard={false}
                            _id={medication._id}
                            prescriptionName={medication.prescriptionName}
                            prescriptionDosage={medication.prescriptionDosage}
                            remainingDosages={medication.remainingDosages}
                            nextFillDay={medication.nextFillDay}
                            dosages={medication.dosages}
                            userNotes={medication.userNotes} />
                        <br/>
                    </>)}


            </Card>

        </div>
    );
};

export default DisplayMedicationList;

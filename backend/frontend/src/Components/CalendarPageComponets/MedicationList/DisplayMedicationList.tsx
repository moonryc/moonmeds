import React, {useState} from 'react';
import Card from "@mui/material/Card";
import MedicationCard from "../../Misc/MedicationCard/MedicationCard";
import {IMedicationFrontEnd} from "../../../../../Types/MedicationType";


interface IDisplayMedicationList {
    medicationsArray:IMedicationFrontEnd[]|null,
}


const DisplayMedicationList = (props:IDisplayMedicationList) => {

    const [medicationsArray] = useState<IMedicationFrontEnd[]|null>(props.medicationsArray);

    //TODO need to update the emdications array when the add new medication button is clicked




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

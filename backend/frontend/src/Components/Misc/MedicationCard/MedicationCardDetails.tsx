import React from 'react';
import {Typography} from "@mui/material";
import {IMedication} from "../../../../../Types/MedicationType";

interface IMedicationCardDetailsProps {
    medication: IMedication,
}

{/*TODO(Spotexx): theming*/}
//This component is for rendering the quick view details of the selected medication
const MedicationCardDetails = (props: IMedicationCardDetailsProps) => {

    return (
        <div>
            <Typography variant="body2" color="text.secondary">
                <span>Prescription Dosage: {props.medication.prescriptionDosage}</span><br/>
                <span>Next Refill Date: {props.medication.nextFillDay}</span><br/>
                <span>Notes: {props.medication.userNotes}</span><br/>
            </Typography>
                {/*Maps through the dosage timestamps*/}
                {/*//TODO(Moon): Fix the timestamp below*/}
                <span>
                    {props.medication.dosages.map(doses =>
                            <li key={props.medication.dosages.indexOf(doses)}>
                                Take {doses.amount} at {doses.time}
                            </li>
                    )}
                </span>
        </div>
    );
};

export default MedicationCardDetails;

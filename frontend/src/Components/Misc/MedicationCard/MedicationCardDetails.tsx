import React from 'react';
import {IMedicationDetails} from "./MedicationCard";
import {Typography} from "@mui/material";

export interface IMedicationCardDetailsProp {
    medicationDetails: IMedicationDetails
}

{/*TODO(Spotexx): theming*/}
//This component is for rendering the quick view details of the selected medication
const MedicationCardDetails = (props: IMedicationCardDetailsProp) => {

    return (
        <div>
            <Typography variant="body2" color="text.secondary">
                <span>Prescription Dosage: {props.medicationDetails.prescriptionDosage}</span><br/>
                <span>Remaining Dosages: {props.medicationDetails.remainingDosages}</span><br/>
                <span>Next Refill Date: {props.medicationDetails.nextFillDay}</span><br/>
            </Typography>
                {/*Maps through the dosage timestamps*/}
                {/*//TODO(Moon): Fix the timestamp below*/}
                <span>
                    {props.medicationDetails.dosages.map(doses =>
                            <li key={props.medicationDetails.dosages.indexOf(doses)}>
                                Take {doses.amount} at {doses.time}
                            </li>
                    )}
                </span>
            <Typography variant="body2" color="text.secondary">
                <span>Notes: {props.medicationDetails.userNotes}</span><br/>
                </Typography>
        </div>
    );
};

export default MedicationCardDetails;

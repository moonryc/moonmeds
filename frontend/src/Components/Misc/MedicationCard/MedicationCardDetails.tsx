import React from 'react';
import {Typography} from "@mui/material";
import {IDosagesDetails, IMedicationBase} from "../../../../../Types/MedicationTypes";

/**
 * and object that contains an object with the watered down information of a medication
 * @property medication - {medication:IMedicationBase}
 */
interface IMedicationCardDetailsProps {
    medication: IMedicationBase,
}

///*TODO(Spotexx): theming*/}
/**
 * THis componet display a watered down version of the provide medication information for general view, no editing is involved
 * @param props - {medication: IMedicationBase}
 * @constructor
 */
const MedicationCardDetails = (props: IMedicationCardDetailsProps) => {

    return (
        <div>
            <Typography variant="body2" color="text.secondary">
                <span>Prescription Dosage: {props.medication.prescriptionDosage}</span><br/>
                <span>Next Refill Date: {props.medication.nextFillDay.toString()}</span><br/>
                <span>Notes: {props.medication.userNotes}</span><br/>
            </Typography>
            {/*Maps through the dosage timestamps*/}
            <span>
                    {props.medication.dosages.map((doses: IDosagesDetails) =>
                            <li key={props.medication.dosages.indexOf(doses)}>
                                Take {doses.amount} at {doses.time.toString()}
                            </li>
                    )}
                </span>
        </div>
    );
};

export default MedicationCardDetails;

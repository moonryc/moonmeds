import React, {useEffect, useState} from 'react';
import DosageTimeStamp from "./DosageTimeStamp";
import {Button, Typography} from "@mui/material";
import {IDosagesDetails, IMedicationBase} from "../../../../../Types/MedicationTypes";


/**
 * @property medication - IMedicationBase
 * @property isNewCard - boolean,
 * @property updateMedicationDosages(listOfDosages: IDosagesDetails[]) - void
 */
export interface IMedicationCardAddDosagesProps {
    medication: IMedicationBase
    isNewCard:boolean,
    updateMedicationDosages(listOfDosages: IDosagesDetails[]): void
}

///*TODO(Spotexx): theming*/
/**
 * Creates and deletes medication dosages, this component is only displayed when the medication is being edited/isNewCard is true
 * @param props - {medication: IMedicationBase, isNewCard:boolean,updateMedicationDosages(listOfDosages:IDosagesDetails[]):void}
 * @constructor
 */
const MedicationCardAddDosages = (props: IMedicationCardAddDosagesProps) => {

    //region useState

    const [dosages, setDosages] = useState<IDosagesDetails[]>(props.medication.dosages);

    //endregion

    //region Callback functions

    /**
     * Callback function |
     *  updates the dosage info for the give dosage at the given  in the dosages array index
     * @param details
     * @param index
     */
    const getDosageDetails = (details: IDosagesDetails, index: number) => {
        let tempDosages = [...dosages];
        tempDosages[index] = details
        setDosages(tempDosages);
    }

    //endregion

    //region functions

    /**
     * Adds a new blank IDosageDetails object at the end of the dosages array
     */
    const newDosage = () => {
        setDosages(dosages => [...dosages, {
            amount: 0,
            time: new Date(),
            isDaily: false,
            isWeekly: false,
            isOnceAMonth: false,
            customOnceAMonthDate:new Date(),
            customWeekDays: {
                monday: false,
                tuesday: false,
                wednesday: false,
                thursday: false,
                friday: false,
                saturday: false,
                sunday: false,
            }
        }])
    }

    /**
     * Removes a dosage from the array of dosages at the given index
     * @param dosageIndex - number
     */
    const deleteDosage = (dosageIndex: number) => {
        let tempDosages = [...dosages];
        tempDosages.splice(dosageIndex, 1)
        setDosages(tempDosages)
    }

    //endregion

    //region useEffect

    /**
     * updates the medicationDetails property in MedicationCard component when the dosages changes
     */
    useEffect(() => {
        props.updateMedicationDosages(dosages);
    }, [dosages]) // eslint-disable-line react-hooks/exhaustive-deps

    //endregion

    return (
        <div>
            <Typography>

                {dosages.map(dose =>
                    < DosageTimeStamp
                        index={dosages.indexOf(dose)}
                        dosageDetails={dose}
                        isNewCard={props.isNewCard}
                        deleteDosage={deleteDosage}
                     getDosageDetails={getDosageDetails}/>)
                }
                <br/>
                <Button onClick={newDosage} size={"small"} variant="contained">Add a Dosage</Button>
            </Typography>
            <br/>
        </div>
    );
};

export default MedicationCardAddDosages;

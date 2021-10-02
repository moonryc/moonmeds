import React, {useEffect, useState} from 'react';
import DosageTimeStamp from "./DosageTimeStamp";
import {Button, Typography} from "@mui/material";
import {ICustomDays, IDosagesDetails, IMedication} from "../../../Types/MedicationType";

export interface IMedicationCardAddDosagesProps {
    medication: IMedication
    isNewCard:boolean,
    updateMedicationDosages(listOfDosages: IDosagesDetails[]): void
}



{/*TODO(Spotexx): theming*/
}
const MedicationCardAddDosages = (props: IMedicationCardAddDosagesProps) => {

    const [dosages, setDosages] = useState<IDosagesDetails[]>(props.medication.dosages);


    const newDosage = () => {
        setDosages(dosages => [...dosages, {
            amount: 0,
            time: new Date(),
            isDaily: false,
            isWeekly: false,
            isMonthly: false,
            isCustom: false,
            customDays: {
                startDate: new Date(),
                endDate: new Date(),
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
    const deleteDosage = (dosageIndex: number) => {
        let tempDosages = [...dosages];
        tempDosages.splice(dosageIndex, 1)
        setDosages(tempDosages)
    }
    const getDosage = (dosage: number, index: number) => {
        let tempDosages = [...dosages];
        tempDosages[index].amount = dosage;
        setDosages(tempDosages)
    }
    const getDosageTime = (time: Date, index: number) => {
        let tempDosages = [...dosages];
        tempDosages[index].time = time;
        setDosages(tempDosages)
    }
    const getDosageDetails = (details: ICustomDays, index: number) => {
        let tempDosages = [...dosages];
        tempDosages[index].customDays = details
        setDosages(tempDosages);
    }

    useEffect(() => {
        props.updateMedicationDosages(dosages);
    }, [dosages])


    return (
        <div>
            <Typography>

                {dosages.map(dose =>
                    < DosageTimeStamp
                        index={dosages.indexOf(dose)}
                        dosageDetails={dose}
                        isNewCard={props.isNewCard}
                        deleteDosage={deleteDosage}
                        getDosage={getDosage}
                        getDosageTime={getDosageTime}
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

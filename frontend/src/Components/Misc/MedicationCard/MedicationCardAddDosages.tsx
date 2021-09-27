import React, {useEffect, useState} from 'react';
import DosageTimeStamp from "./DosageTimeStamp";
import {Button, Typography} from "@mui/material";
import {IDosagesDetails, IMedicationDays} from "./MedicationCard";

export interface IMedicationCardAddDosagesProps {
    dosageDetails: IDosagesDetails[],

    updateMedicationDosages(listOfDosages: IDosagesDetails[]): void
}

{/*TODO(Spotexx): theming*/
}
const MedicationCardAddDosages = (props: IMedicationCardAddDosagesProps) => {

    const [dosages, setDosages] = useState<IDosagesDetails[]>(props.dosageDetails);


    const newDosage = () => {
        setDosages(dosages => [...dosages, {
            amount: 0, time: new Date(), medicationDays: {
                everyMonday: false,
                monday: false,
                everyTuesday: false,
                tuesday: false,
                everyWednesday: false,
                wednesday: false,
                everyThursday: false,
                thursday: false,
                everyFriday: false,
                friday: false,
                everySaturday: false,
                saturday: false,
                everySunday: false,
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

    const getDosageDetails = (details: IMedicationDays, index: number) => {
        let tempDosages = [...dosages];
        tempDosages[index].medicationDays = details
        setDosages(tempDosages);
    }

    //TODO(Moon) this function is not yet finished
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

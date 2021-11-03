import {Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import React from "react";
import {IMedicationBase} from "../../../../../Types/MedicationTypes";

interface IMedicationOverViewDialog {
    selectedMedication: IMedicationBase;
    openMedication: boolean

    setOpenMedication(value: boolean): void
}


const MedicationOverViewDialog: React.FC<IMedicationOverViewDialog> = ({
                                                                           selectedMedication,
                                                                           openMedication,
                                                                           setOpenMedication
                                                                       }) => {


    const TakeDoseAtTime = () => {
        return (
            <>
                {selectedMedication.dosages.map((dose, index: number) => {
                    return (
                        <>
                                <p> Take {dose.amount} {dose.amountDosageType} of {selectedMedication.prescriptionName} at {dose.time}</p> : <></>
                        </>)
                })}
            </>
        )
    }


    return (
        <Dialog
            open={openMedication}
            onBackdropClick={() => setOpenMedication(false)}
        >
            <DialogTitle>{selectedMedication.prescriptionName}</DialogTitle>
            <Chip
                label={selectedMedication.medicationOwner.name}
                sx={{backgroundColor: selectedMedication.medicationOwner.color}}
            />

            <DialogContent>
                {"Bottle dosage: " + selectedMedication.prescriptionDosage}
                <br/>
                {"Next Refill Date: " + selectedMedication.nextFillDay}
                <br/>
                <TakeDoseAtTime/>
                <br/>
                {"Notes: " + selectedMedication.prescriptionName}
                <br/>
                {selectedMedication.dosages.map((dose, index: number) => {
                    return <p key={index}>{"Take " + dose.amount + " at " + dose.time}</p>;
                })}
            </DialogContent>
            <DialogActions>
                <Button
                    variant={"contained"}
                    fullWidth
                    onClick={() => setOpenMedication(false)}
                >
                    Close
                </Button>
            </DialogActions>
        </Dialog>)
}

export default MedicationOverViewDialog;
import {Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import React from "react";
import {IMedicationBase} from "../../../../../Types/MedicationTypes";
import {format, formatISO9075, getHours, getMinutes, getTime} from "date-fns";

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
                            <p key={index}> Take {dose.amount} {dose.amountDosageType} of {selectedMedication.prescriptionName} at {format(new Date(dose.time),'h:mm aa')}</p>
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
                <p>Bottle dosage: {selectedMedication.prescriptionDosage} {selectedMedication.prescriptionDosageType}</p>
                <p>Next Refill Date: {format(new Date(selectedMedication.nextFillDay),"dd/mm/yyyy")}</p>
                <p>Notes: {selectedMedication.prescriptionName}</p>
                <TakeDoseAtTime/>
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
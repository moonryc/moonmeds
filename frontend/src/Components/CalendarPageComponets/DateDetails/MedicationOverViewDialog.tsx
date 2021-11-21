import {Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import React from "react";
import {IMedicationBase} from "../../../../../Types/MedicationTypes";
import {format, formatISO9075, getHours, getMinutes, getTime} from "date-fns";
import {FaceOutlined} from "@mui/icons-material";

interface IMedicationOverViewDialog {
    selectedMedication: IMedicationBase;
    openMedication: boolean

    setOpenMedication(value: boolean): void
    setEditMedication(value: boolean): void
}


const MedicationOverViewDialog: React.FC<IMedicationOverViewDialog> = ({
                                                                           selectedMedication,
                                                                           openMedication,
                                                                           setOpenMedication,
                                                                           setEditMedication
                                                                       }) => {


    const TakeDoseAtTime = () => {
        return (
            <>
                {selectedMedication.dosages.map((dose, index: number) => {
                    return (
                        <div key={index}>
                            <p> Take {dose.amount} {dose.amountDosageType} of {selectedMedication.prescriptionName} at {format(new Date(dose.time),'h:mm aa')}</p>
                        </div>)
                })}
            </>
        )
    }


    return (
        <Dialog
            open={openMedication}
            onBackdropClick={() => setOpenMedication(false)}
            maxWidth={'xs'}
            fullWidth
        >
            <DialogTitle sx={{textAlign:"center"}}>
                {selectedMedication.prescriptionName}
            </DialogTitle>
            <Box maxWidth={"sx"} sx={{textAlign:"center"}}>
            <Chip
                icon={<FaceOutlined/>}
                label={selectedMedication.medicationOwner.name}
                sx={{backgroundColor: selectedMedication.medicationOwner.color, maxWidth: "sx"}}
            />
            </Box>

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
                    onClick={() => {
                        setEditMedication(true)
                        setOpenMedication(false)
                    }}
                >
                    Edit
                </Button>

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
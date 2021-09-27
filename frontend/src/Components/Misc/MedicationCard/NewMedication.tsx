import React, {useContext, useEffect, useState} from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import {Button, Divider} from "@mui/material";
import MedicationCardEditDetails from "./MedicationCardEditDetails";
import MedicationCardAddDosages from "./MedicationCardAddDosages";
import {IDosagesDetails, IMedicationDetails} from "./MedicationCard";
import {UserContext} from "../UserContext";

const NewMedication = () => {

    const {userId} = useContext(UserContext);

    //region UI Variables
    const [isEditing, setIsEditing] = useState(false);
    const [expandedEdit, setExpandedEdit] = React.useState(false);
    const [expandedDetails, setExpandedDetails] = React.useState(false);
    const handleEditExpandClick = () => {
        setExpandedEdit(!expandedEdit);
        setIsEditing(!isEditing);
        setExpandedDetails(false);
    };

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleContextClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleContextClose = () => {
        setAnchorEl(null);
    };
    useEffect(() => {
        if (isEditing) {
            setExpandedDetails(false)
        }
    }, [isEditing])
    //endregion

    //TODO(Moon): connect this to the backend to update and or create a new medication
    const submitUpdatedMedication = async () => {

        const {prescriptionName, prescriptionDosage, remainingDosages, nextFillDay, userNotes, dosages} = medicationDetails

        let url = "/medication/addnewmedication"
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${userId}`
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            // redirect: 'follow', // manual, *follow, error
            // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify({
                medicationDetails: {
                    prescriptionName:prescriptionName,
                    prescriptionDosage:prescriptionDosage,
                    remainingDosages:remainingDosages,
                    nextFillDay:nextFillDay,
                    userNotes:userNotes},
                dosageDetails: dosages
            }) // body data type must match "Content-Type" header
        }).then(response => response);
        return response.json(); // parses JSON response into native JavaScript objects
    };

    //This is the Medication object aka the nervous system of the medication card
    const [medicationDetails, setMedicationDetails] = useState<IMedicationDetails>({
            prescriptionName: "",
            prescriptionDosage: 0,
            remainingDosages: 0,
            nextFillDay: new Date(),
            userNotes: "",
            dosages: [
                {
                    amount: 0,
                    time: new Date(),
                    medicationDays: {
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
                }
            ],
        }
    );

    //This updates dosages
    const updateMedicationDosages = (listOfDosages: IDosagesDetails[]) => {
        const tempMedicationDetails = medicationDetails
        tempMedicationDetails.dosages = listOfDosages
        setMedicationDetails(tempMedicationDetails);
        console.log(medicationDetails)
    }
    //This updates the medication details
    const updateMedicationDetails = (prescriptionName: string, remainingDosages: number, userNotes: string, prescriptionDosage: number) => {
        const tempMedicationDetails = medicationDetails
        tempMedicationDetails.prescriptionName = prescriptionName
        tempMedicationDetails.remainingDosages = remainingDosages
        tempMedicationDetails.prescriptionDosage = prescriptionDosage
        tempMedicationDetails.userNotes = userNotes
        setMedicationDetails(tempMedicationDetails);
        console.log(medicationDetails)
    }


    return (
        <div>
            <Card sx={{maxWidth: 345}}>
                {/*//region Edit medication*/}
                <CardContent>
                    <MedicationCardEditDetails
                        remainingDosages={medicationDetails.remainingDosages}
                        userNotes={medicationDetails.userNotes}
                        updateMedicationDetails={updateMedicationDetails}
                        prescriptionDosage={medicationDetails.prescriptionDosage}
                        name={medicationDetails.prescriptionName}/>
                    <Divider/>
                    <MedicationCardAddDosages updateMedicationDosages={updateMedicationDosages}
                                              dosageDetails={medicationDetails.dosages}/>
                    <Divider/>
                    <br/>
                    <Button onClick={submitUpdatedMedication} variant="contained"> Save Medication</Button>
                    <br/>
                </CardContent>

                {/*//endregion*/}


            </Card>
        </div>
    );
};

export default NewMedication;

import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import Collapse from '@mui/material/Collapse';
import {BottomNavigation, BottomNavigationAction, Divider} from "@mui/material";
import {DeleteForever} from "@mui/icons-material";
import MedicationCardAddDosages from "./MedicationCardAddDosages";
import EditIcon from "@mui/icons-material/Edit";
import MedicationCardDetails from "./MedicationCardDetails";
import MedicationCardEditDetails from "./MedicationCardEditDetails";
import {UserContext} from "../UserContext";
import MedicationCardHeader from "./MedicationCardHeader";
import {IDosagesDetails, IMedicationFrontEnd} from "../../../../../Types/MedicationType";



export interface IMedicationCardProps extends IMedicationFrontEnd {
    isNewCard: boolean
}


//TODO(Moon): fix the numerous isses being logged into the console
const MedicationCard = (props: IMedicationCardProps) => {

    //user jwt token
    const {userId} = useContext(UserContext);


    const [isShowingDetails, setIsShowingDetails] = useState(false);
    const [isEditing, setIsEditing] = useState(props.isNewCard);

    //region Medication Card details callback functions

    //Toggles showing the details
    const handleIsShowingDetailsClick = () => {
      setIsShowingDetails(!isShowingDetails)
    }
    //Toggles the editing menu
    const handleIsEditingClick = () => {
      setIsEditing(!isEditing);
    }
    //Discards the changed medication values
    const handleDiscardClick = () => {
        setMedicationDetails({
            _id: props._id,
            prescriptionName: props.prescriptionName,
            prescriptionDosage: props.prescriptionDosage,
            remainingDosages: props.remainingDosages,
            nextFillDay: props.nextFillDay,
            dosages: props.dosages,
            userNotes: props.userNotes
        })
        setIsEditing(false);
    }

    //This is the Medication object that will get updated as the user updates it
    const [medicationDetails, setMedicationDetails] = useState<IMedicationFrontEnd>({
        _id: props._id,
        prescriptionName: props.prescriptionName,
            prescriptionDosage: props.prescriptionDosage,
            remainingDosages: props.remainingDosages,
            nextFillDay: props.nextFillDay,
            dosages: props.dosages,
            userNotes: props.userNotes
        }
    );

    //This updates dosages
    const updateMedicationDosages = (listOfDosages: IDosagesDetails[]) => {
        const tempMedicationDetails = medicationDetails
        tempMedicationDetails.dosages = listOfDosages
        setMedicationDetails(tempMedicationDetails);
    }
    // //This updates the medication details
    const updateMedicationDetails = (prescriptionName: string, remainingDosages: number, userNotes: string, prescriptionDosage: number) => {
        const tempMedicationDetails = medicationDetails
        tempMedicationDetails.prescriptionName = prescriptionName
        tempMedicationDetails.remainingDosages = remainingDosages
        tempMedicationDetails.prescriptionDosage = prescriptionDosage
        tempMedicationDetails.userNotes = userNotes
        setMedicationDetails(tempMedicationDetails);
    }

    //useEffect to hide the details menu while editing
    useEffect(() => {
        if(isEditing){
            setIsShowingDetails(false)
        }
    }, [isEditing]);

    const [value, setValue] = React.useState('recents');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    //creates a new medication
    const submitNewMedication = async () => {

        //const {prescriptionName, prescriptionDosage, remainingDosages, nextFillDay, userNotes, dosages} = medicationDetails TODO (moon) check if you need these

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
            body: JSON.stringify(medicationDetails) // body data type must match "Content-Type" header
        }).then(response => response);
        return console.log(response.json()); // parses JSON response into native JavaScript objects
    };
    //updates medication
    const submitUpdatedMedication = async () => {
        setIsEditing(false)

        const {
            prescriptionName,
            prescriptionDosage,
            remainingDosages,
            nextFillDay,
            userNotes,
            dosages
        } = medicationDetails

        let url = "/medication/updatemedication"
        const response = await fetch(url, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
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
                medicationId: props._id,
                medicationDetails: {
                    prescriptionName: prescriptionName,
                    prescriptionDosage: prescriptionDosage,
                    remainingDosages: remainingDosages,
                    nextFillDay: nextFillDay,
                    userNotes: userNotes
                },
                dosageDetails: dosages
            }) // body data type must match "Content-Type" header
        }).then(response => response);
        return response.json(); // parses JSON response into native JavaScript objects
    };

    return (
        <div>
            <Card sx={{maxWidth: "100%"}}>

                {/*The header is only displayed if the card is not a new card*/}
                <MedicationCardHeader
                    isNewCard={props.isNewCard}
                    medication={medicationDetails}
                    handleIsShowingDetailsClick={handleIsShowingDetailsClick}
                    isEditing={isEditing}/>

                {/*Quick details of the medication*/}
                <Collapse in={isShowingDetails} timeout={"auto"} unmountOnExit>
                    <MedicationCardDetails  medication={medicationDetails}/>
                    <BottomNavigation sx={{ width: "100%" }} value={value} onChange={handleChange}>
                        <BottomNavigationAction
                            onClick={()=>handleIsEditingClick()}
                            label={"Edit Medication"}
                            icon={<EditIcon/>}/>
                        <BottomNavigationAction label={"Delete Medication"} icon={<DeleteForever/>}/>
                    </BottomNavigation>
                </Collapse>

                {/*The editing of the medicaiton*/}
                <Collapse in={isEditing} timeout={"auto"} unmountOnExit>
                    <MedicationCardEditDetails
                        medication={medicationDetails}
                        updateMedicationDetails={updateMedicationDetails}/>
                    <Divider/>
                    <MedicationCardAddDosages
                        medication={medicationDetails}
                        updateMedicationDosages={updateMedicationDosages} isNewCard={props.isNewCard}/>
                <Divider/>
                {props.isNewCard ?
                    <BottomNavigation sx={{ width: "100%" }} value={value} onChange={handleChange}>
                        <BottomNavigationAction label={"Add Medication"} icon={<EditIcon/>} onClick={()=>submitNewMedication()}/>
                    </BottomNavigation> :
                    <BottomNavigation sx={{ width: "100%" }} value={value} onChange={handleChange}>
                        <BottomNavigationAction label={"Update Card"} icon={<EditIcon onClick={()=>submitUpdatedMedication()}/>}/>
                        <BottomNavigationAction onClick={()=>handleDiscardClick()} label={"Discard Changed"} icon={<DeleteForever/>}/>
                    </BottomNavigation>
                }
                </Collapse>

            </Card>
        </div>
    );
};

export default MedicationCard;

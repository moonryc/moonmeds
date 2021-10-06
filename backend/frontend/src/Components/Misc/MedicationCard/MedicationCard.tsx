import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import Collapse from '@mui/material/Collapse';
import {alpha, BottomNavigation, BottomNavigationAction, Divider} from "@mui/material";
import {DeleteForever} from "@mui/icons-material";
import MedicationCardAddDosages from "./MedicationCardAddDosages";
import EditIcon from "@mui/icons-material/Edit";
import MedicationCardDetails from "./MedicationCardDetails";
import MedicationCardEditDetails from "./MedicationCardEditDetails";
import {UserContext} from "../UserContext";
import MedicationCardHeader from "./MedicationCardHeader";
import {IDosagesDetails, IMedicationFrontEnd} from "../../../../../Types/MedicationType";
import {makeStyles} from "@mui/styles";
import SendIcon from '@mui/icons-material/Send';

const useStyles = makeStyles((theme?: any) => ({
    container: {
        maxHeight: '10vh'
    }
}));

const style = {
    backgroundColor: alpha('#ffffff', 0.5)
}

export interface IMedicationCardProps extends IMedicationFrontEnd {
    isNewCard: boolean,
    handleTabsChangeIndex(index:number):void
}


//TODO(Moon): fix the numerous isses being logged into the console
const MedicationCard = (props: IMedicationCardProps) => {

    //user jwt token
    const {userId,submitUpdatedMedication,postNewMedication,fetchUserMedications} = useContext(UserContext);


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
            startDay: props.startDay,
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
            startDay: props.startDay,
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
    const updateMedicationDetails = (prescriptionName: string, nextFilledDate: Date, userNotes: string, prescriptionDosage: number) => {
        const tempMedicationDetails = medicationDetails
        tempMedicationDetails.prescriptionName = prescriptionName
        tempMedicationDetails.nextFillDay = nextFilledDate
        tempMedicationDetails.prescriptionDosage = prescriptionDosage
        tempMedicationDetails.userNotes = userNotes
        setMedicationDetails(tempMedicationDetails);
    }

    //useEffect to hide the details menu while editing
    useEffect(() => {
        if (isEditing) {
            setIsShowingDetails(false)
        }
    }, [isEditing]);

    const [value, setValue] = React.useState('recents');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    //creates a new medication
    const submitNewMedication = async () => {
        postNewMedication(medicationDetails)
        fetchUserMedications()
        props.handleTabsChangeIndex(1)
    };
    //updates medication
    const updatedMedication = async (medicationDetails:IMedicationFrontEnd) => {
        setIsEditing(false)
        submitUpdatedMedication(medicationDetails)

    };
    const classes= useStyles();
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
                    <MedicationCardDetails medication={medicationDetails}/>
                    <BottomNavigation showLabels sx={{width: "100%"}} value={value} onChange={handleChange}>
                        <BottomNavigationAction
                            onClick={() => handleIsEditingClick()}
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
                        <BottomNavigation showLabels  sx={{width: "100%"}} value={value} onChange={handleChange}>
                            <BottomNavigationAction label={"Add Medication"} icon={<SendIcon/>}
                                                    onClick={() => submitNewMedication()}/>
                        </BottomNavigation> :
                        <BottomNavigation showLabels   sx={{width: "100%"}}  onChange={handleChange}>
                            <BottomNavigationAction label={"Update Card"} onClick={() => updatedMedication(medicationDetails)}
                                                    title={'Update Card'} icon={<EditIcon />}/>
                            <BottomNavigationAction   onClick={() => handleDiscardClick()} label={"Discard Changes"} title={'Discard Changes'}
                                                    icon={<DeleteForever/>}/>
                        </BottomNavigation>
                    }
                </Collapse>

            </Card>
        </div>
    );
};

export default MedicationCard;

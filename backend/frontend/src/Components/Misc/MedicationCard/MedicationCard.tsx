import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import Collapse from '@mui/material/Collapse';
import {BottomNavigation, BottomNavigationAction, Box, Divider} from "@mui/material";
import {DeleteForever} from "@mui/icons-material";
import MedicationCardAddDosages from "./MedicationCardAddDosages";
import EditIcon from "@mui/icons-material/Edit";
import MedicationCardDetails from "./MedicationCardDetails";
import MedicationCardEditDetails from "./MedicationCardEditDetails";
import MedicationCardHeader from "./MedicationCardHeader";
import {IDosagesDetails, IMedicationFrontEnd} from "../../../../../Types/MedicationType";
import SendIcon from '@mui/icons-material/Send';
import {ApiContext} from "../../../Context/ApiContext";
import {NotificationsContext} from "../../../Context/NotificationsContext";

/**
 * @property isNewCard - boolean,
 * @property handleTabsChangeIndex(index: number) - void
 * @property _id - string
 * @property prescriptionName - string,
 * @property prescriptionDosage - number,
 * @property startDay - Date,
 * @property nextFillDay - Date,
 * @property dosages - IDosagesDetails[],
 * @property userNotes - string,
 */
export interface IMedicationCardProps extends IMedicationFrontEnd {
    isNewCard: boolean,

}


//TODO(Moon): fix the numerous isses being logged into the console

/**
 * Is used for displaying a single user medication or for creating a new one. If creating a new one isNewCard must be set to true and by default _id must be set to ""
 * @param props - {isNewCard: boolean,handleTabsChangeIndex(index: number): void, _id : string,prescriptionName : string,prescriptionDosage : number,startDay : Date,nextFillDay : Date,dosages : IDosagesDetails[],userNotes : string,}
 * @constructor
 */
const MedicationCard = (props: IMedicationCardProps) => {

    //region Context
    /**
     * Api context for creating and updating medications
     * Notification context for creating a new notification
     */
    const {postNewMedication, submitUpdatedMedication} = useContext(ApiContext);
    const {newNotification} = useContext(NotificationsContext);
    //endregion

    //region useState

    /**
     * Are the details being shown?
     */
    const [isShowingDetails, setIsShowingDetails] = useState<boolean>(false);
    /**
     * Is the medication being edited
     */
    const [isEditing, setIsEditing] = useState<boolean>(props.isNewCard);
    /**
     * The text representing the bottom navigation bars
     */
    const [bottomNavigationValue, setBottomNavigationValue] = useState<string>('');

    /**
     * medicationDetails is where everything in medication card originates from, displaying the medication details, dosages, etc.
     * this property is changed when editing, but if handleDiscardClick() is used it will revert to its original state
     * This property is submitted whole when updating or submitting a new medication
     */
    const [medicationDetails, setMedicationDetails] = useState<IMedicationFrontEnd>({
            _id: props._id,
            prescriptionName: props.prescriptionName,
            prescriptionDosage: props.prescriptionDosage,
            startDay: props.startDay,
            medicationOwner:props.medicationOwner,
            nextFillDay: props.nextFillDay,
            dosages: props.dosages,
            userNotes: props.userNotes
        }
    );

    //endregion

    //region Callback Functions

    /**
     * Callback Function|
     * Used for updating the medication details property "dosages", a function passed into one of the child components
     * @param listOfDosages - IDosagesDetails[]
     */
    const updateMedicationDosages = (listOfDosages: IDosagesDetails[]) => {
        const tempMedicationDetails = medicationDetails
        tempMedicationDetails.dosages = listOfDosages
        setMedicationDetails(tempMedicationDetails);
    }
    /**
     * Callback function|
     * Used for updating the medication details using the parameters passed in to the function, a function passed into one of the child componets
     * @param prescriptionName - string
     * @param nextFilledDate - Date
     * @param userNotes - string
     * @param prescriptionDosage - number
     * @param medicationOwner
     */
    const updateMedicationDetails = (prescriptionName: string, nextFilledDate: Date,userNotes: string, prescriptionDosage: number,medicationOwner:string) => {
        const tempMedicationDetails = medicationDetails
        tempMedicationDetails.prescriptionName = prescriptionName
        tempMedicationDetails.nextFillDay = nextFilledDate
        tempMedicationDetails.prescriptionDosage = prescriptionDosage
        tempMedicationDetails.medicationOwner = medicationOwner
        tempMedicationDetails.userNotes = userNotes
        setMedicationDetails(tempMedicationDetails);
    }


    //endregion

    //region functions

    /**
     * toggles displaying details on and off
     */
    const handleIsShowingDetailsClick = (): void => {
        setIsShowingDetails(!isShowingDetails)
    }

    /**
     * toggles editing on and off
     */
    const handleIsEditingClick = (): void => {
        setIsEditing(!isEditing);
    }

    /**
     * Sets the medicationDetails back to the original values and turns editing off
     */
    const handleDiscardClick = () => {
        setMedicationDetails({
            _id: props._id,
            prescriptionName: props.prescriptionName,
            prescriptionDosage: props.prescriptionDosage,
            medicationOwner: props.medicationOwner,
            startDay: props.startDay,
            nextFillDay: props.nextFillDay,
            dosages: props.dosages,
            userNotes: props.userNotes
        })
        setIsEditing(false);
    }

    const handleBottomNavigationChange = (event: React.SyntheticEvent, newValue: string) => {
        setBottomNavigationValue(newValue);
    };

    /**
     * checks if the user is attempting to send empty data, if so it generates a notification based on the location of the null information
     * @return boolean - returns true if a null value was found, false if all values were not null
     */
    const handleNullChecker = (): boolean => {

        let isNullPresent = false

        console.log(medicationDetails.prescriptionName)
        if (medicationDetails.prescriptionName == null || medicationDetails.prescriptionName === "") {
            newNotification("Please fill out the Prescription Name", "info")
            isNullPresent = true
        }

        if (medicationDetails.prescriptionDosage == null) {
            newNotification("Please fill out the Prescription Dosage", "info")
            isNullPresent = true
        }

        if (medicationDetails.nextFillDay == null) {
            newNotification("Please select the refill date of this medication", "info")
            isNullPresent = true
        }

        if (medicationDetails.dosages == null || medicationDetails.dosages === []) {
            newNotification("Please add at least one dosage", "info")
            isNullPresent = true
        }
        return isNullPresent
    }

    //endregion

    //region APICalls

    /**
     * Creates a new medication as long as the nothing was left as null is null
     */
    const submitNewMedication = async () => {

        if (!handleNullChecker()) {
            await postNewMedication(medicationDetails)

        }
    };

    /**
     * Updates the selected medication as long as nothing was left null
     * @param medicationDetails
     */
    const updatedMedication = async (medicationDetails: IMedicationFrontEnd) => {
        if (!handleNullChecker()) {
            setIsEditing(false)
            await submitUpdatedMedication(medicationDetails)
        }
    };

    //endregion

    //region useEffect

    /**
     * Hide the details component if editing by listening to the isEditing property
     */
    useEffect(() => {
        if (isEditing) {
            setIsShowingDetails(false)
        }
    }, [isEditing]);

    //endregion

    return (
        <Box sx={props.isNewCard ? {maxHeight: '70vh', overflow: 'auto'} : {}}>
            <Card sx={{maxWidth: "100%",}}>

                {/*The header is only displayed if the card is not a new card*/}
                <MedicationCardHeader
                    isNewCard={props.isNewCard}
                    medication={medicationDetails}
                    handleIsShowingDetailsClick={handleIsShowingDetailsClick}
                    isEditing={isEditing}/>

                {/*Quick details of the medication*/}
                <Collapse in={isShowingDetails} timeout={"auto"} unmountOnExit>
                    <MedicationCardDetails medication={medicationDetails}/>
                    <BottomNavigation showLabels sx={{width: "100%"}} value={bottomNavigationValue}
                                      onChange={handleBottomNavigationChange}>
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
                        <BottomNavigation showLabels sx={{width: "100%"}} value={bottomNavigationValue}
                                          onChange={handleBottomNavigationChange}>
                            <BottomNavigationAction label={"Add Medication"} icon={<SendIcon/>}
                                                    onClick={() => submitNewMedication()}/>
                        </BottomNavigation> :
                        <BottomNavigation showLabels sx={{width: "100%"}} onChange={handleBottomNavigationChange}>
                            <BottomNavigationAction label={"Update Card"}
                                                    onClick={() => updatedMedication(medicationDetails)}
                                                    title={'Update Card'} icon={<EditIcon/>}/>
                            <BottomNavigationAction onClick={() => handleDiscardClick()} label={"Discard Changes"}
                                                    title={'Discard Changes'}
                                                    icon={<DeleteForever/>}/>
                        </BottomNavigation>
                    }
                </Collapse>

            </Card>
        </Box>
    );
};

export default MedicationCard;
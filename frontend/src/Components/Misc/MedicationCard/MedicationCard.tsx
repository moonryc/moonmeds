import * as React from 'react';
import {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import {red} from '@mui/material/colors';
import {Button, Divider} from "@mui/material";
import {Delete, MoreVert, Visibility, VisibilityOff} from "@mui/icons-material";
import MedicationCardAddDosages from "./MedicationCardAddDosages";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import EditIcon from "@mui/icons-material/Edit";
import MedicationCardDetails from "./MedicationCardDetails";
import MedicationCardEditDetails from "./MedicationCardEditDetails";


export interface IDosagesDetails {
    amount: number,
    time: Date
}

export interface IMedicationDetails {
    prescriptionName: string,
    prescriptionDosage: number,
    remainingDosages: number,
    nextFillDay: Date,
    dosages: IDosagesDetails[],
    userNotes: string,
}

{/*TODO(Spotexx): theming*/
}
//TODO(Moon): fix the numerous isses being logged into the console
//TODO(Moon): props any should be fixed later
const MedicationCard = (props: any) => {

    //region UI Variables
    const [isEditing, setIsEditing] = useState(false);
    const [expandedEdit, setExpandedEdit] = React.useState(false);
    const [expandedDetails, setExpandedDetails] = React.useState(false);
    const handleEditExpandClick = () => {
        setExpandedEdit(!expandedEdit);
        setIsEditing(!isEditing);
        setExpandedDetails(false);
    };
    const handleDetailsExpandClick = () => {
        setExpandedDetails(!expandedDetails);
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
    const submitUpdatedMedication = () => {
        handleEditExpandClick()
        //Add fetch
        console.log(medicationDetails)
    };

    //This is the Medication object aka the nervous system of the medication card
    const [medicationDetails, setMedicationDetails] = useState<IMedicationDetails>({
            prescriptionName: "Temp name",
            prescriptionDosage: 5,
            remainingDosages: 2,
            nextFillDay: new Date(),
            dosages: [
                {amount: 0, time: new Date()}
            ],
            userNotes: "This is a test note"
        }
    );

    //This updates dosages
    const updateMedicationDosages = (listOfDosages: IDosagesDetails[]) => {
        const tempMedicationDetails = medicationDetails
        tempMedicationDetails.dosages = listOfDosages
        setMedicationDetails(tempMedicationDetails);
    }
    //This updates the medication details
    const updateMedicationDetails = (prescriptionName: string, remainingDosages: number, userNotes: string, prescriptionDosage: number) => {
        const tempMedicationDetails = medicationDetails
        tempMedicationDetails.prescriptionName = prescriptionName
        tempMedicationDetails.remainingDosages = remainingDosages
        tempMedicationDetails.prescriptionDosage = prescriptionDosage
        tempMedicationDetails.userNotes = userNotes
        setMedicationDetails(tempMedicationDetails);
    }


    return (
        <div>
            <Card sx={{maxWidth: 345}}>
                <CardHeader avatar={
                    <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                        {medicationDetails.prescriptionName[0]}
                    </Avatar>
                }
                            action={
                                <div>
                                    <IconButton onClick={handleContextClick} size="small" sx={{ml: 2}}>
                                        <MoreVert/>
                                    </IconButton>

                                    {/*//region Context menu*/}
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleContextClose}
                                        onClick={handleContextClose}
                                        PaperProps={{
                                            elevation: 0,
                                            sx: {
                                                overflow: 'visible',
                                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                mt: 1.5,
                                                '& .MuiAvatar-root': {
                                                    width: 32,
                                                    height: 32,
                                                    ml: -0.5,
                                                    mr: 1,
                                                },
                                            },
                                        }}
                                        transformOrigin={{horizontal: 'right', vertical: 'top'}}
                                        anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                                    >
                                        {!isEditing ? [
                                                <MenuItem onClick={() => handleDetailsExpandClick()}>

                                                    {expandedDetails ? <div>
                                                        <ListItemIcon>
                                                            <VisibilityOff fontSize="small"/>
                                                        </ListItemIcon>
                                                        Close</div> : <div>
                                                        <ListItemIcon>
                                                            <Visibility fontSize="small"/>
                                                        </ListItemIcon>
                                                        View</div>
                                                    }
                                                </MenuItem>,
                                                <MenuItem onClick={() => handleEditExpandClick()}>
                                                    <ListItemIcon>
                                                        <EditIcon fontSize="small"/>
                                                    </ListItemIcon>
                                                    Edit
                                                </MenuItem>,
                                                <MenuItem>
                                                    <ListItemIcon>
                                                        <Delete fontSize="small"/>
                                                    </ListItemIcon>
                                                    Delete
                                                </MenuItem>,
                                            ] :
                                            [
                                                <MenuItem onClick={() => handleEditExpandClick()}>
                                                    <ListItemIcon>
                                                        <Visibility fontSize="small"/>
                                                    </ListItemIcon>
                                                    Discard Changes
                                                </MenuItem>,
                                                <MenuItem>
                                                    <ListItemIcon>
                                                        <Delete fontSize="small"/>
                                                    </ListItemIcon>
                                                    Delete
                                                </MenuItem>,
                                            ]
                                        }
                                    </Menu>
                                    {/*//endregion*/}
                                </div>
                            }
                            title={medicationDetails.prescriptionName}/>

                {/*//region Details*/}
                {!isEditing ?
                    <Collapse in={expandedDetails} timeout={"auto"} unmountOnExit>
                        {/*CARD CONTENT*/}
                        <CardContent>
                            <MedicationCardDetails medicationDetails={medicationDetails}/>
                        </CardContent>
                    </Collapse>
                    : <div>
                    </div>}
                {/*//endregion*/}

                {/*//region Edit medication*/}
                <Collapse in={expandedEdit} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Divider/>
                        <MedicationCardEditDetails name={medicationDetails.prescriptionName}
                                                   remainingDosages={medicationDetails.remainingDosages}
                                                   userNotes={medicationDetails.userNotes}
                                                   updateMedicationDetails={updateMedicationDetails}
                                                   prescriptionDosage={medicationDetails.prescriptionDosage}/>
                        <Divider/>
                        <MedicationCardAddDosages updateMedicationDosages={updateMedicationDosages}
                                                  dosageDetails={medicationDetails.dosages}/>
                        <Divider/>
                        <br/>
                        <Button onClick={submitUpdatedMedication} variant="contained"> Update Medication</Button>
                        <br/>
                    </CardContent>
                </Collapse>
                {/*//endregion*/}


            </Card>
        </div>
    );
};

export default MedicationCard;

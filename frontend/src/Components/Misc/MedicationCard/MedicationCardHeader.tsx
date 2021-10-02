import React from 'react';
import Avatar from "@mui/material/Avatar";
import {red} from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import {Info} from "@mui/icons-material";
import CardHeader from "@mui/material/CardHeader";
import {IMedication} from "../../../Types/MedicationType";

interface IMedicationCardHeaderProps {
    isNewCard: boolean
    isEditing: boolean,
    medication: IMedication
    handleIsShowingDetailsClick:()=>void
}

const MedicationCardHeader = (props:IMedicationCardHeaderProps) => {
    return (
        <div>
            {props.isNewCard ?<></>:
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                        {props.medication.prescriptionName[0]}
                    </Avatar>
                }
                action={
                    <div>
                        {props.isEditing ? <></>:<IconButton size="small" sx={{ml: 2}} onClick={()=>props.handleIsShowingDetailsClick()}>
                            <Info/>
                        </IconButton>}
                    </div>
                }
                title={props.medication.prescriptionName}/>
            }
        </div>
    );
};

export default MedicationCardHeader;

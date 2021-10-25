import React from 'react';
import Avatar from "@mui/material/Avatar";
import {red} from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardHeader from "@mui/material/CardHeader";
import {IMedication} from "../../../../../Types/MedicationType";
import {Chip} from "@mui/material";
import {Face} from "@mui/icons-material";

/**
 *
 * @property isNewCard - boolean
 * @property isEditing - boolean,
 * @property medication - IMedication
 * @property handleIsShowingDetailsClick - ()=>void
 */
interface IMedicationCardHeaderProps {
    isNewCard: boolean
    isEditing: boolean,
    medication: IMedication
    handleIsShowingDetailsClick:()=>void
}

/**
 *
 * @param props - {isNewCard: boolean, isEditing: boolean, medication: IMedication, handleIsShowingDetailsClick: ()=>void}
 * @constructor
 */
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
                            <MoreVertIcon/>
                        </IconButton>}
                    </div>
                }
                title={props.medication.prescriptionName}
                subheader={<Chip color={"secondary"} icon={<Face/>} label={props.medication.medicationOwner} />}
            />
            }
        </div>
    );
};

export default MedicationCardHeader;

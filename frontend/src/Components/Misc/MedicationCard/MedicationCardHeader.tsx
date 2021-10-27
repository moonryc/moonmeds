import React, {useContext, useEffect, useState} from 'react';
import Avatar from "@mui/material/Avatar";
import {red} from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CardHeader from "@mui/material/CardHeader";
import {IMedicationBase} from "../../../../../Types/MedicationTypes";
import {Chip} from "@mui/material";
import {Face} from "@mui/icons-material";
import {UserContext} from "../../../Context/UserContext";
import medication from "../../../../../routes/medication";
import {IPersonNameAndColor} from "../../../../../Types/UserTypes";

/**
 *
 * @property isNewCard - boolean
 * @property isEditing - boolean,
 * @property medication - IMedicationBase
 * @property handleIsShowingDetailsClick - ()=>void
 */
interface IMedicationCardHeaderProps {
    isNewCard: boolean
    isEditing: boolean,
    medication: IMedicationBase
    handleIsShowingDetailsClick:()=>void
}

/**
 *
 * @param props - {isNewCard: boolean, isEditing: boolean, medication: IMedicationBase, handleIsShowingDetailsClick: ()=>void}
 * @constructor
 */
const MedicationCardHeader = (props:IMedicationCardHeaderProps) => {

    const {usersPeople} = useContext<any>(UserContext);

    const [color, setColor] = useState<string>("secondary");

    useEffect(() => {
        getPersonColor()
        console.log(color)
    }, []);


    useEffect(()=> {
        getPersonColor()
    },[usersPeople])


    const getPersonColor = () => {
        for( let person of usersPeople){
            if(props.medication.medicationOwner == person.name){
                return setColor(person.color)
            }
        }
        return setColor("secondary")
    }



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
                //TODO:(TRAVIS) I cant get the color to work properly
                subheader={<Chip sx={{backgroundColor:color}} icon={<Face/>} label={props.medication.medicationOwner} />}
            />
            }
        </div>
    );
};

export default MedicationCardHeader;

import * as React from 'react';
import {useState} from 'react';
import {styled} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, {IconButtonProps} from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import FormInput from "./FormInput";
import {Divider} from "@mui/material";
import MedicationCardDosages from "./MedicationCardDosages";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

//TODO(Moon): props any shopld be fixed
const MedicationCard = (props:any) => {


    //This gets filled in with props
    const [medicationName, setMedicationName] = useState("Medication Name");
    const [remainingDosages, setRemainingDosages] = useState(null);
    const [dosage, setDosage] = useState(null);
    const [isEditing, setIsEditing] = useState(false);


    const [expanded, setExpanded] = React.useState(false);
    const [expandedDetails, setExpandedDetails] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
        setIsEditing(!isEditing);
        if (isEditing) {
            setExpandedDetails(false);
        }
    };

    const handleDetailsExpandClick = () => {
        setExpandedDetails(!expandedDetails);
    };

    //TODO(Moon): connect this to the backend to update and or create a new medication
    const submitUpdatedMedication = () => {
        handleExpandClick()

        //Add fetch

    };

    return (
        <div>
            <Card sx={{maxWidth: 345}}>


                <CardHeader
                    avatar={
                        <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                            {medicationName[0]}
                        </Avatar>
                    }
                    action={isEditing ? <></> :
                        <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded}
                                    aria-label="show more">
                            <EditIcon/>
                        </ExpandMore>
                    }
                    title={medicationName}
                />


                {/*//region Expand details button provided you are not editingg*/}
                {isEditing ? <></> :
                    <ExpandMore
                        expand={expandedDetails}
                        onClick={handleDetailsExpandClick}
                        aria-expanded={expandedDetails}
                        aria-label={"show more"}
                    >
                        <IconButton aria-label={"Details"}>
                            <ExpandMoreIcon/>
                        </IconButton>
                    </ExpandMore>
                }
                {/*//endregion*/}

                {/*//region Overview Details*/}
                <Collapse in={expandedDetails} timeout={"auto"} unmountOnExit>
                    {/*CARD CONTENT*/}
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {`Dosage: ${dosage}`}<br/>
                            {`Remaining Dosages: ${remainingDosages}`}<br/>
                            {`Next Fill Date: ${remainingDosages}`}<br/>
                        </Typography>
                    </CardContent>
                </Collapse>
                {/*//endregion*/}

                {/*//region Edit medication*/}
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Divider/>
                        <Typography paragraph>
                            Name:<br/>
                            <FormInput/>
                        </Typography>
                        <Divider/>
                        <Typography paragraph>
                            Dosage:<br/>
                            <FormInput/>
                        </Typography>
                        <Divider/>
                        <Typography paragraph>
                            Remaining dosages:<br/>
                            <FormInput/>
                        </Typography>
                        <Divider/>
                        <Typography>
                            <br/><MedicationCardDosages/><br/>
                        </Typography>
                        <Divider/>
                        <br/>
                        <button onClick={submitUpdatedMedication}>Update Medication</button>
                        <br/><br/>
                        <button onClick={handleExpandClick}>Discard Changes</button>
                    </CardContent>
                </Collapse>
                {/*//endregion*/}


            </Card>
        </div>
    );
};

export default MedicationCard;

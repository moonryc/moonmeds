import React, {useContext, useEffect, useState} from 'react';
import {
    Button,
    createFilterOptions,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from "@mui/material";
import {Autocomplete} from "@mui/lab";
import {UserContext} from "../../../Context/UserContext";
import {ApiContext} from "../../../Context/ApiContext";
import {IMedication} from "../../../../../Types/MedicationType";


interface IMedicationCardOwnerProps {
    medication: IMedication,

    updateMedicationDetails(prescriptionName: string, nextFilledDate: Date, userNotes: string, prescriptionDosage: number, medicationOwner: string): void
}

const filter = createFilterOptions<string>()

//TODO APPLY THE INTERFACE
const MedicationCardOwner = (props: IMedicationCardOwnerProps) => {

    const {usersPeople} = useContext(UserContext);
    const {postPerson, fetchPersons} = useContext(ApiContext);


    const [selectedUser, setSelectedUser] = useState<string | null>(props.medication.medicationOwner);

    const [isAddingAUserDialogOpen, setIsAddingAUserDialogOpen] = useState(false);

    const [newUserDialogValue, setNewUserDialogValue] = useState("");


    const handleSubmitNewUser = () => {
        let temp = usersPeople
        temp.push(newUserDialogValue)
        postPerson(temp)
        fetchPersons()
        handleCloseDialog()
    }

    /**
     * Closes Dialog for adding user and resets the dialog values to blank
     */
    const handleCloseDialog = () => {
        setIsAddingAUserDialogOpen(false)
        setNewUserDialogValue("")
    };


    const autoCompleteOnChange = (event: any, newValue: any) => {

        if (!usersPeople.includes(newValue) && newValue != null) {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
                setIsAddingAUserDialogOpen(true);
                setNewUserDialogValue("");
            });

        } else {
            setSelectedUser(newValue);
        }
    }

    const autoCompleteFilterOptions = (options: any, params: any) => {
        const filtered = filter(options, params);
        if (params !== '') {
            filtered.push(`Add "${params.inputValue}"`);
        }
        return filtered;
    }


    useEffect(() => {
        if (selectedUser == null) {
            props.updateMedicationDetails(props.medication.prescriptionName, props.medication.nextFillDay, props.medication.userNotes, props.medication.prescriptionDosage, "")
        } else {
            props.updateMedicationDetails(props.medication.prescriptionName, props.medication.nextFillDay, props.medication.userNotes, props.medication.prescriptionDosage, selectedUser)
        }
    }, [selectedUser]);


    return (
        <div>
            <Autocomplete
                value={selectedUser}
                options={usersPeople}
                clearOnBlur={true}
                selectOnFocus={true}
                handleHomeEndKeys={true}
                freeSolo={true}
                onChange={(event, newValue) => autoCompleteOnChange(event, newValue)}
                getOptionLabel={(option: string) => {
                    return option
                }}
                filterOptions={(options, params) => autoCompleteFilterOptions(options, params)}
                renderOption={(props, option) => <li {...props}>{option}</li>}
                renderInput={(params) => <TextField {...params} label="Select a User"/>}
            />
            <Dialog open={isAddingAUserDialogOpen}>

                <DialogTitle>Add a new User</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Who is taking this medication?
                    </DialogContentText>
                    <TextField
                        autoFocus={true}
                        value={newUserDialogValue}
                        onChange={(e) => setNewUserDialogValue(e.target.value)}
                        label={"Name"}
                        type={"text"}
                        variant={"standard"}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCloseDialog()}>Cancel</Button>
                    <Button onClick={() => handleSubmitNewUser()}>Add User</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


export default MedicationCardOwner;

import {Edit} from "@mui/icons-material";
import {
    Box,
    Button,
    Chip, Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select, TextField
} from "@mui/material";
import React, {useContext, useEffect, useState} from "react";
import {IPersonNameAndColor} from "../../../../Types/UserTypes";
import {ApiContext} from "../../Context/ApiContext";
import {UserContext} from "../../Context/UserContext";
import {makePersonNameAndColor} from "../../typeConstructors";

interface IMedicationCardOwnerProps {
    getMedicationOwner(name: string | null, color: string | null): void;

    medicationOwner: IPersonNameAndColor;
}

/**
 * This component handles selecting and adding a medication owner logic for the medication creation/edit dialog
 * @param props
 * @constructor
 */
const MedicationCardOwner: React.FC<IMedicationCardOwnerProps> = ({medicationOwner, getMedicationOwner}) => {
    const {usersPeople} = useContext(UserContext);
    const {putAddPerson} = useContext(ApiContext);

    const [selectedUser, setSelectedUser] = useState<IPersonNameAndColor>(medicationOwner);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [newUser, setNewUser] = useState<IPersonNameAndColor>(makePersonNameAndColor());

    /**
     * passes the selected medication owner up to the parent component MedicationDialog
     */
    useEffect(() => {
        if (selectedUser == null) {
            getMedicationOwner("Default User", "secondary");
        } else {
            getMedicationOwner(selectedUser.name, selectedUser.color);
        }
    }, [getMedicationOwner, selectedUser]);

    /**
     * clears the fields and closes out of the dialog
     */
    const handleSubmit = async () => {
        setSelectedUser(makePersonNameAndColor());
        console.log("submited")
        await putAddPerson({name: newUser.name, color: newUser.color}).then(
            (response) => {
                setDialogOpen(false);
                setNewUser(makePersonNameAndColor());
            }
        );
    };

    let colorOptions = [
        {label: "red"},
        {label: "green"},
        {label: "orange"},
        {label: "pink"},
        {label: "grey"},
        {label: "purple"},
        {label: "white"},
        {label: "yellow"},
        {label: "secondary"},
    ];


    const CreateNewMedicationOwnerDialog = () => {
        return (
            <Dialog open={dialogOpen}>
                <DialogTitle>Create a new Owner</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        variant={'outlined'}
                        type={"string"}
                        value={newUser.name}
                        onChange={(e) =>
                            setNewUser((prevValue) => ({
                                ...prevValue,
                                name: e.target.value,
                            }))
                        }
                    />
                    <br/>
                    <br/>

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Color</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={newUser.color}
                            label="Color"
                            onChange={(e) => {
                                setNewUser((prevValue) => ({
                                    ...prevValue,
                                    color: e.target.value,
                                }));

                            }}
                        >
                            {colorOptions.map((option: { label: string }) => {
                                    return (
                                        <MenuItem key={option.label} value={option.label}>
                                            {option.label}
                                        </MenuItem>)
                                }
                            )}
                        </Select>
                    </FormControl>

                </DialogContent>
                <DialogActions>
                    <Button variant={"contained"} onClick={(e) => handleSubmit()}>
                        Create Owner
                    </Button>
                    <Button variant={"contained"} onClick={() => setDialogOpen(false)}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }


    return (
        <>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Medication Owner</InputLabel>
                <Select
                    labelId="Medication Owner"
                    id="medication Owner"
                    value={JSON.stringify(selectedUser)}
                    label="Medication Owner"
                    renderValue={(selectedUser) => (
                        <Box sx={{display: "flex", flexWrap: "wrap", gap: 0.5}}>
                            {JSON.parse(selectedUser).name !== "" ? (
                                <Chip
                                    label={JSON.parse(selectedUser).name}
                                    sx={{backgroundColor: JSON.parse(selectedUser).color}}
                                />
                            ) : (
                                <></>
                            )}
                        </Box>
                    )}
                    onChange={(e) => {
                        let personParsed = JSON.parse(e.target.value.toString());
                        setSelectedUser({...personParsed});
                    }}
                    IconComponent={() => <></>}
                    input={
                        <OutlinedInput
                            id="select-multiple-chip"
                            label="Chip"
                            endAdornment={
                                <InputAdornment
                                    position={"end"}
                                    sx={{position: "absolute", right: 3}}
                                >
                                    <IconButton onClick={() => setDialogOpen(true)}>
                                        <Edit/>
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    }
                >

                    {usersPeople.map((person) => {
                        return (
                            <MenuItem value={JSON.stringify(person)} key={person.name}>
                                <Chip
                                    label={person.name}
                                    sx={{backgroundColor: person.color, cursor: 'pointer', minWidth: "75%"}}
                                />
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>

            <CreateNewMedicationOwnerDialog/>

        </>
    );
};

export default MedicationCardOwner;

import {Edit} from "@mui/icons-material";
import {
    Box,
    Button, ButtonGroup,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    TextField
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
    const [doesUserAlreadyExist, setDoesUserAlreadyExist] = useState(false);
    const [medicationOwnerEmpty, setMedicationOwnerEmpty] = useState(false);

    /**
     * passes the selected medication owner up to the parent component MedicationDialog
     */
    useEffect(() => {
        if (selectedUser === null || selectedUser.name === "" || selectedUser.color === "secondary") {
            // @ts-ignore
            getMedicationOwner([]);
        } else {
            getMedicationOwner(selectedUser.name, selectedUser.color);
        }
    }, [getMedicationOwner, selectedUser]);

    /**
     * clears the fields and closes out of the dialog
     */
    const handleSubmit = async () => {
        setSelectedUser(makePersonNameAndColor());
        await putAddPerson({name: newUser.name, color: newUser.color}).then(
            (response) => {
                setDialogOpen(false);
                setNewUser(makePersonNameAndColor());
            }
        );
    };

    /**
     * function to check if the name property in newUser is
     * already present in the usersPeople array as a name property
     */
    const checkDoesUserAlreadyExists = () => {

        // @ts-ignore
        if(usersPeople[0] !== "") {
            for (const user of usersPeople) {
                if (user.name.toLowerCase() === newUser.name.toLowerCase()) {
                    return setDoesUserAlreadyExist(true);
                }
            }
            setDoesUserAlreadyExist(false);
        }
    }

    let colorOptions = [
        {label: "red"},
        {label: "green"},
        {label: "orange"},
        {label: "pink"},
        {label: "purple"},
        {label: "yellow"},
    ];

    useEffect(() => {
        checkDoesUserAlreadyExists()
        // console.log(doesUserAlreadyExist)
    }, [newUser.name]);



    return (
        <>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Medication Owner</InputLabel>
                <Select
                    labelId="Medication Owner"
                    id="medication Owner"
                    value={JSON.stringify(selectedUser)}
                    label="Medication Owner"
                    error={medicationOwnerEmpty}
                    renderValue={(selectedUser) => (
                        <Box sx={{display: "flex", flexWrap: "wrap", gap: 0.5}}>
                            {JSON.parse(selectedUser) === null || JSON.parse(selectedUser).color !== undefined ? (
                                <Chip
                                    label={JSON.parse(selectedUser).name}
                                    sx={{backgroundColor: JSON.parse(selectedUser).color}}
                                />
                            ) : (
                                <></>
                            )}
                        </Box>)}
                    onChange={(e) => {
                        let personParsed = JSON.parse(e.target.value.toString());
                        setSelectedUser({...personParsed});
                        if(personParsed.name ===""){
                            setMedicationOwnerEmpty(true)
                        }else{
                            setMedicationOwnerEmpty(false)
                        }
                    }}
                    IconComponent={() => <></>}
                    input={
                        <OutlinedInput
                            notched={true}
                            id="select-multiple-chip"
                            label="Medication Owner"
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

            <Dialog open={dialogOpen}>
                <DialogTitle>Create a new Owner</DialogTitle>
                <DialogContent>

                    <TextField
                        fullWidth
                        id={"newUserName"}
                        key={"newUserName"}
                        variant={'outlined'}
                        error={doesUserAlreadyExist}
                        value={newUser.name}
                        onChange={(e) => {
                            setNewUser((prevValue) => ({
                                ...prevValue,
                                name: e.target.value,
                            }))
                        }}

                    />
                    <br/>
                    <br/>

                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Color</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={JSON.stringify(newUser)}
                            label="Color"
                            renderValue={(newUser) => (
                                <Box sx={{display: "flex", flexWrap: "wrap", gap: 0.5}}>
                                    {JSON.parse(newUser).name !== "" ? (
                                        <Chip
                                            label={JSON.parse(newUser).name}
                                            sx={{backgroundColor: JSON.parse(newUser).color}}
                                        />
                                    ) : (
                                        <></>
                                    )}
                                </Box>)}
                            input={
                                <OutlinedInput
                                    notched={true}
                                    id="select-multiple-chip"
                                    label="Color"
                                />
                            }
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
                                            <Chip
                                                label={newUser.name}
                                                sx={{backgroundColor: option.label, cursor: 'pointer', minWidth: "75%"}}
                                            />
                                        </MenuItem>)
                                }
                            )}
                        </Select>
                    </FormControl>

                </DialogContent>
                <DialogActions>
                    <ButtonGroup fullWidth>
                    <Button disabled={doesUserAlreadyExist} variant={"contained"} onClick={(e) => handleSubmit()}>
                        Create
                    </Button>
                    <Button variant={"contained"} onClick={() => {
                        setNewUser(makePersonNameAndColor)
                        setDialogOpen(false)
                    }}>
                        Cancel
                    </Button>
                    </ButtonGroup>
                </DialogActions>
            </Dialog>

        </>
    );
};

export default MedicationCardOwner;

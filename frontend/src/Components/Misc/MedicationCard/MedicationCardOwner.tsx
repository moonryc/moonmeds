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
import {IMedicationBase} from "../../../../../Types/MedicationTypes";
import {IPersonNameAndColor} from "../../../../../Types/UserTypes";


interface IMedicationCardOwnerProps {
    getMedicationOwner(name:string|null):void
    medicationOwner:string

}



interface IAutoFillPerson extends IPersonNameAndColor {
    inputValue?: string;
}
const filter = createFilterOptions<IAutoFillPerson>()

const MedicationCardOwner = (props: IMedicationCardOwnerProps) => {

    const {usersPeople} = useContext(UserContext);
    const {putAddPerson, fetchPersons} = useContext(ApiContext);

    const [people, setPeople] = useState<IAutoFillPerson[]>(usersPeople);

    const [selectedUser, setSelectedUser] = useState<string | null>(props.medicationOwner);


    useEffect(() => {
        if(selectedUser == null){
            props.getMedicationOwner("Defult User")
        }else{
            props.getMedicationOwner(selectedUser)
        }
    }, [selectedUser]);

    const [value, setValue] = React.useState<IAutoFillPerson | null>(null);
    const [open, toggleOpen] = React.useState(false);

    const handleClose = () => {
        setDialogValue({
            name: '',
            color: '',
        });
        toggleOpen(false);
    };

    const [dialogValue, setDialogValue] = React.useState({
        name: '',
        color: '',
    });

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setValue({
            name: dialogValue.name,
            color: dialogValue.color,
        });

        putAddPerson({name:dialogValue.name, color:dialogValue.color})
        handleClose();
    };

    return (
        <>
            <Autocomplete
                value={value}
                fullWidth={true}
                onChange={(event, newValue) => {
                    if (typeof newValue === 'string') {
                        // timeout to avoid instant validation of the dialog's form.
                        setTimeout(() => {
                            toggleOpen(true);
                            setDialogValue({
                                name: newValue,
                                color: '',
                            });
                        });
                    } else if (newValue && newValue.inputValue) {
                        toggleOpen(true);
                        setDialogValue({
                            name: newValue.inputValue,
                            color: '',
                        });
                    } else {
                        setValue(newValue);
                        if(newValue != null){

                        setSelectedUser(newValue.name)
                        }
                    }
                }}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    if (params.inputValue !== '' && people.filter(person=> params.inputValue == person.name).length<1) {
                        filtered.push({
                            color: "",
                            inputValue: params.inputValue,
                            name: `Add "${params.inputValue}"`
                        });
                    }

                    return filtered;
                }}
                id="free-solo-dialog-demo"
                options={people}
                getOptionLabel={(option) => {
                    // e.g value selected with enter, right from the input
                    if (typeof option === 'string') {
                        return option;
                    }
                    if (option.inputValue) {
                        return option.inputValue;
                    }
                    return option.name;
                }}
                selectOnFocus
                clearOnBlur
                handleHomeEndKeys
                renderOption={(props, option) => <li {...props}>{option.name}</li>}
                freeSolo
                renderInput={(params) => <TextField {...params} label="Medication Owner" />}
            />
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Add a Owner</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Add a new Medication Owner
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            value={dialogValue.name}
                            onChange={(event) =>
                                setDialogValue({
                                    ...dialogValue,
                                    name: event.target.value,
                                })
                            }
                            label="name"
                            type="text"
                            variant="standard"
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            value={dialogValue.color}
                            onChange={(event) =>
                                setDialogValue({
                                    ...dialogValue,
                                    color: event.target.value,
                                })
                            }
                            label="color"
                            type="string"
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant={"contained"} onClick={handleClose}>Cancel</Button>
                        <Button variant={"contained"} type="submit">Add</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}


export default MedicationCardOwner;

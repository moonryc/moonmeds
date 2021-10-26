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
    medication: IMedicationBase,

    updateMedicationDetails(prescriptionName: string, nextFilledDate: Date, userNotes: string, prescriptionDosage: number, medicationOwner: string,endDate:Date,inDefinite:boolean): void
}



interface IAutoFillPerson extends IPersonNameAndColor {
    inputValue?: string;
}
const filter = createFilterOptions<IAutoFillPerson>()

const MedicationCardOwner = (props: IMedicationCardOwnerProps) => {

    const {usersPeople} = useContext(UserContext);
    const {putAddPerson, fetchPersons} = useContext(ApiContext);

    const [people, setPeople] = useState<IAutoFillPerson[]>(usersPeople);

    const [selectedUser, setSelectedUser] = useState<string | null>(props.medication.medicationOwner);
    //
    // const [isAddingAUserDialogOpen, setIsAddingAUserDialogOpen] = useState(false);
    // const [newUserValue, setNewUserValue] = useState<IPersonNameAndColor>({
    //             name: '',
    //             color: '',
    //         });
    //
    //
    // const handleSubmitNewUser = () => {
    //     putAddPerson(newUserValue)
    //     handleCloseDialog()
    // }
    //
    // /**
    //  * Closes Dialog for adding user and resets the dialog values to blank
    //  */
    // const handleCloseDialog = () => {
    //     setNewUserValue({name:'',color:''})
    //     setIsAddingAUserDialogOpen(false)
    // };
    //
    //
    // const autoCompleteOnChange = (event: any, newValue: any) => {
    //
    //     if (!usersPeople.includes(newValue) && newValue != null) {
    //         // timeout to avoid instant validation of the dialog's form.
    //         setTimeout(() => {
    //             setIsAddingAUserDialogOpen(true);
    //             setNewUserValue({name:'',color:''});
    //         });
    //
    //     } else {
    //         setSelectedUser(newValue);
    //     }
    // }
    //
    // const autoCompleteFilterOptions = (options: any, params: any) => {
    //     const filtered = filter(options, params);
    //     if (params !== '') {
    //         filtered.push(`Add "${params.inputValue}"`);
    //     }
    //     return filtered;
    // }
    //
    //
    useEffect(() => {
        if (selectedUser == null) {
            props.updateMedicationDetails(props.medication.prescriptionName, props.medication.nextFillDay, props.medication.userNotes, props.medication.prescriptionDosage, "",props.medication.endDate,props.medication.inDefinite)
        } else {
            props.updateMedicationDetails(props.medication.prescriptionName, props.medication.nextFillDay, props.medication.userNotes, props.medication.prescriptionDosage, selectedUser,props.medication.endDate,props.medication.inDefinite)
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
        <div>
            <Autocomplete
                value={value}
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

                    if (params.inputValue !== '') {
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
                sx={{ width: 300 }}
                freeSolo
                renderInput={(params) => <TextField {...params} label="Free solo dialog" />}
            />
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Add a new film</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Did you miss any film in our list? Please, add it!
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
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Add</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}


export default MedicationCardOwner;

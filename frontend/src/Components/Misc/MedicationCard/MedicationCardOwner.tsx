import React, {useContext, useEffect, useState} from 'react';
import {
    Button,
    createFilterOptions,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, IconButton, InputAdornment,
    TextField
} from "@mui/material";
import {Autocomplete} from "@mui/lab";
import {UserContext} from "../../../Context/UserContext";
import {ApiContext} from "../../../Context/ApiContext";
import {IMedicationBase} from "../../../../../Types/MedicationTypes";
import {IPersonNameAndColor} from "../../../../../Types/UserTypes";
import {Edit} from "@mui/icons-material";


interface IMedicationCardOwnerProps {
    getMedicationOwner(name: string | null): void

    medicationOwner: IPersonNameAndColor

}


interface IAutoFillPerson extends IPersonNameAndColor {
    inputValue?: string;
}

const filter = createFilterOptions<IAutoFillPerson>()

const MedicationCardOwner = (props: IMedicationCardOwnerProps) => {

    const {usersPeople} = useContext(UserContext);
    const {putAddPerson, fetchPersons} = useContext(ApiContext);

    const [people, setPeople] = useState<IAutoFillPerson[]>(usersPeople);

    const [selectedUser, setSelectedUser] = useState<string | null>(props.medicationOwner.name);


    useEffect(() => {
        if (selectedUser == null) {
            props.getMedicationOwner("Default User")
        } else {
            props.getMedicationOwner(selectedUser)
        }
    }, [selectedUser]);

    const [value, setValue] = React.useState<IAutoFillPerson | null>({name: props.medicationOwner.name, color: ""});
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

        putAddPerson({name: dialogValue.name, color: dialogValue.color})
        handleClose();
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
    ]


    return (
        <>
            <>
            <Autocomplete
                value={value}
                fullWidth
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
                        if (newValue != null) {

                            setSelectedUser(newValue.name)
                        }
                    }
                }}
                filterOptions={(options, params) => {
                    return filter(options, params);
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
                openOnFocus
                clearOnBlur
                handleHomeEndKeys
                renderOption={(props, option) => <li {...props}>{option.name}</li>}
                forcePopupIcon={false}
                renderInput={(params) => <TextField
                    {...params}
                    InputProps={{...params.InputProps,endAdornment:(<React.Fragment><InputAdornment position={"end"}> <IconButton onClick={()=>toggleOpen(true)}><Edit/></IconButton> </InputAdornment></React.Fragment>)}}
                    label="Medication Owner"
                />}
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
                            fullWidth
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
                            variant="outlined"
                        />

                        <Autocomplete
                            disablePortal
                            fullWidth
                            id="colors"
                            options={colorOptions}
                            onChange={(event: any) => {

                                    setDialogValue({...dialogValue, color: event.target.value});

                            }}
                            renderInput={(params) => <TextField {...params} label="Color"/>}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant={"contained"} onClick={handleClose}>Cancel</Button>
                        <Button variant={"contained"} type="submit">Add</Button>
                    </DialogActions>
                </form>
            </Dialog>
            </>

            {/*<Autocomplete*/}

            {/*    id="combo-box-demo"*/}
            {/*    options={colorOptions}*/}
            {/*    fullWidth*/}
            {/*    renderInput={(params) => <TextField {...params} label="Movie"*/}
            {/*                                        */}
            {/*    />}*/}
            {/*/>*/}

            {/*<TextField fullWidth InputProps={{endAdornment:<IconButton><Edit/></IconButton>}}/>*/}
        </>
    );
}


export default MedicationCardOwner;

import { Edit } from "@mui/icons-material";
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
import React, { useContext, useEffect, useState } from "react";
import { IPersonNameAndColor } from "../../../../Types/UserTypes";
import { ApiContext } from "../../Context/ApiContext";
import { UserContext } from "../../Context/UserContext";

interface IMedicationCardOwnerProps {
  getMedicationOwner(name: string | null, color: string | null): void;

  medicationOwner: IPersonNameAndColor;
}

/**
 * This component handles selecting and adding a medication owner logic for the medication creation/edit dialog
 * @param props
 * @constructor
 */

//TODO: Make the rest like this
const MedicationCardOwner: React.FC<IMedicationCardOwnerProps> = ({ medicationOwner, getMedicationOwner }) => {
  const { usersPeople } = useContext(UserContext);
  const { putAddPerson } = useContext(ApiContext);

  const [selectedUser, setSelectedUser] = useState<IPersonNameAndColor>(
    medicationOwner
  );
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<IPersonNameAndColor>({
    name: "",
    color: "",
  });

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
    setSelectedUser({
      name: "",
      color: "",
    });

    await putAddPerson({ name: newUser.name, color: newUser.color }).then(
      (response) => {
        setDialogOpen(false);
        setNewUser({ name: "", color: "" });
      }
    );
  };

  let colorOptions = [
    { label: "red" },
    { label: "green" },
    { label: "orange" },
    { label: "pink" },
    { label: "grey" },
    { label: "purple" },
    { label: "white" },
    { label: "yellow" },
  ];

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Medication Owner</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedUser}
          label="Medication Owner"
          renderValue={(selectedUser) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selectedUser.name !== "" ? (
                <Chip
                  label={selectedUser.name}
                  sx={{ backgroundColor: selectedUser.color }}
                />
              ) : (
                <></>
              )}
            </Box>
          )}
          onChange={(e) => {
            let personParsed = JSON.parse(e.target.value.toString());
            setSelectedUser({ ...personParsed });
          }}
          IconComponent={() => <></>}
          input={
            <OutlinedInput
              id="select-multiple-chip"
              label="Chip"
              endAdornment={
                <InputAdornment
                  position={"end"}
                  sx={{ position: "absolute", right: 3 }}
                >
                  <IconButton onClick={() => setDialogOpen(true)}>
                    <Edit />
                  </IconButton>
                </InputAdornment>
              }
            />
          }
        >
          {usersPeople.map((person) => {
            return (
              <MenuItem value={JSON.stringify(person)} key={person.name}>
                {" "}
                <Chip
                  label={person.name}
                  sx={{ backgroundColor: person.color }}
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
            variant={"filled"}
            value={newUser.name}
            onChange={(e) => {
              setNewUser((prevValue) => ({
                ...prevValue,
                name: e.target.value,
              }));
            }}
          />
          <TextField
            variant={"filled"}
            value={newUser.color}
            onChange={(e) => {
              setNewUser((prevValue) => ({
                ...prevValue,
                color: e.target.value,
              }));
            }}
          />
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
    </>
  );
};

export default MedicationCardOwner;

import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogTitle,
  Fab,
  Grid,
  Paper, Typography
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { IMedicationBase } from "../../../Types/MedicationTypes";
import DisplayCalendar from "../Components/CalendarPageComponets/Calendar/DisplayCalendar";
import DisplayDateDetails from "../Components/CalendarPageComponets/DateDetails/DisplayDateDetails";
import DisplayMedicationList from "../Components/CalendarPageComponets/MedicationList/DisplayMedicationList";
import MedicationDialog from "../Components/MedicationDialog/MedicationDialog";
import AppbarTop from "../Components/Standalone/AppbarTop";
import { ApiContext } from "../Context/ApiContext";
import { CalendarContext } from "../Context/CalendarContext";
import { backgroundStyle, flex1ItemStyle, flexWrapperStyle } from "../Styles";
import { makeMedication } from "../typeConstructors";



const MainLoggedInPage = () => {
  const { fetchMedicationsAndDosagesAndPersons } = useContext(ApiContext);
  const { selectedDay } = useContext(CalendarContext);

  const [isMakingNewMedication, setIsMakingNewMedication] = useState(false);
  const [isListOfMedications, setIsListOfMedications] = useState(false);

  const [tempNewMedication, setTempNewMedication] = useState<IMedicationBase>(makeMedication());

  const newMedicationDialog = () => {
    return (
      <>
        <MedicationDialog
          isOpen={isMakingNewMedication}
          isNewMedication={true}
          medication={tempNewMedication}
          closeDialog={(medicationObject: IMedicationBase) => {
            setTempNewMedication({ ...medicationObject });
            setIsMakingNewMedication(false);
          }}
        />
      </>
    );
  };

  const listOfMedicationDialog = () => {
    return (
      <>
        <Dialog open={isListOfMedications} maxWidth={"xl"} fullWidth={true}>
          <DialogTitle>Medications</DialogTitle>
          <DisplayMedicationList />
          <DialogActions>
            <Button
              variant={"contained"}
              fullWidth
              onClick={() => setIsListOfMedications(!isListOfMedications)}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };

  useEffect(() => {
    fetchMedicationsAndDosagesAndPersons();
  }, [fetchMedicationsAndDosagesAndPersons]);

  return (
    <Box sx={flexWrapperStyle}>
      <AppbarTop />
      <Box sx={{ ...flex1ItemStyle, ...backgroundStyle,   display: "flex", flexDirection: ["column",,,'row'] }}>
        {newMedicationDialog()}
        {listOfMedicationDialog()}
        <Box sx={{height:'100%', width:['100%','100%','100%','450px'],  display: "flex", flexDirection: "column"}}>
        <Box sx={{width:'100%', height:'450px'}}>
          <Paper
            elevation={0}
            sx={{
              overflow: "auto",
              position: "relative",
              height:'450px'
            }}
          >
            <DisplayCalendar />
            <Box sx={{ position: "absolute", bottom: "6px", left: "6px" }}>
              <Fab
                size="small"
                color="secondary"
                aria-label="add"
                variant={"extended"}
                onClick={() =>
                  setIsMakingNewMedication(!isMakingNewMedication)
                }
              >
                <Add /> Add
              </Fab>
            </Box>
            <Box sx={{ position: "absolute", bottom: "6px", right: "6px" }}>
              <Fab
                size="small"
                color="secondary"
                aria-label="add"
                variant={"extended"}
                onClick={() => setIsListOfMedications(!isListOfMedications)}
              >
                <Add /> List
              </Fab>
            </Box>
          </Paper>
        </Box>
        <Box sx={{  flex: 1, pt:'1vw', pb:['1vw',,,'0vw'] }}>
          <Paper elevation={0} sx={{height:'100%', maxHeight:'100%'}}>
            <Typography sx={{p:'3vh'}}>test <br/> what will go here <br/> who knows? <br/> you sussy baka you. <br/> heh, titties</Typography>
          </Paper>
        </Box>
        </Box>
            <Card sx={{ width: "100%", height: "100%",ml:[undefined,,,'1vw'] }}>
              <Box sx={{ bgcolor: "background.paper", width: "100%",  }}>
                <DisplayDateDetails
                  selectedDate={{ index: 0, date: selectedDay }}
                />
              </Box>
            </Card>
      </Box>
    </Box>
  );
};

export default MainLoggedInPage;

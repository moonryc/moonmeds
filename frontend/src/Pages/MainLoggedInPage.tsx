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
  Paper
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



  useEffect(() => {
    fetchMedicationsAndDosagesAndPersons().then(r => r);
  }, [fetchMedicationsAndDosagesAndPersons]);

  return (
    <Box sx={flexWrapperStyle}>
      <AppbarTop />
      <Box sx={{ ...flex1ItemStyle, ...backgroundStyle }}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={6}>
            <Paper
              elevation={0}
              sx={{
                overflow: "auto",
                position: "relative",
                height: ["60vh", "60vh", "60vh", "80vh"],
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
                  <Add /> Add Medication
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
                  <Add /> Medication List
                </Fab>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Card sx={{ width: "100%", height: "100%" }}>
              <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
                <DisplayDateDetails
                  selectedDate={{ index: 0, date: selectedDay }}
                />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <MedicationDialog
          isOpen={isMakingNewMedication}
          isNewMedication={true}
          medication={tempNewMedication}
          closeDialog={(medicationObject: IMedicationBase) => {
            setTempNewMedication({ ...medicationObject });
            setIsMakingNewMedication(false);
          }}
      />
      <DisplayMedicationList
          isDialogOpen={isListOfMedications}
          closeListOfMedications={()=>{setIsListOfMedications(false)} } />
    </Box>

  );
};

export default MainLoggedInPage;

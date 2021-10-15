import React, {useContext, useEffect, useState} from 'react';
import DisplayCalendar from "../Components/CalendarPageComponets/Calendar/DisplayCalendar";
import AppbarTop from "../Components/Standalone/AppbarTop";
import {Box, Button, Card, Dialog, DialogActions, DialogTitle, Fab, Grid} from "@mui/material";
import {Add} from "@mui/icons-material";
import MedicationCard from "../Components/Misc/MedicationCard/MedicationCard";
import {ApiContext} from "../Context/ApiContext";
import DisplayMedicationList from "../Components/CalendarPageComponets/MedicationList/DisplayMedicationList";
import DisplayDateDetails from "../Components/CalendarPageComponets/DateDetails/DisplayDateDetails";
import {CalendarContext} from "../Context/CalendarContext";

const MainLoggedInPage = () => {

    const {fetchCalendarOverviewPage} = useContext(ApiContext);
    const {selectedDay} = useContext(CalendarContext);


    const [isMakingNewMedication, setIsMakingNewMedication] = useState(false);
    const [isListOfMedications, setIsListOfMedications] = useState(false);


    const newMedicationDialog = () => {
      return(
          <>
            <Dialog open={isMakingNewMedication} fullWidth={true}>
                <DialogTitle>New Medication</DialogTitle>
                <MedicationCard
                    _id={''} isNewCard={true}
                    prescriptionName={''} prescriptionDosage={0}
                    startDay={new Date()} nextFillDay={new Date()}
                    dosages={[]} userNotes={''}
                    medicationOwner={""}/>
                <DialogActions>
                    <Button variant={"contained"} onClick={()=>setIsMakingNewMedication(!isMakingNewMedication)}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
          </>
      )
    }

    const listOfMedicationDialog = () => {
      return(
          <>
            <Dialog open={isListOfMedications} maxWidth={"xl"} fullWidth={true}>
                <DialogTitle>Medications</DialogTitle>
                    <DisplayMedicationList handleTabsChangeIndex={()=>{}}/>
                <DialogActions><Button variant={"contained"} onClick={()=>setIsListOfMedications(!isListOfMedications)}>Close</Button></DialogActions>
            </Dialog>
          </>
      )
    }


    useEffect(() => {
        fetchCalendarOverviewPage()
    }, []);




    return (
        <div>
            <AppbarTop/>
            {newMedicationDialog()}
            {listOfMedicationDialog()}
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <DisplayCalendar/>
                </Grid>
                <Grid item xs={6}>
                    <Card sx={{width: "100%", height: "100%",}}>
                        <Box sx={{bgcolor: 'background.paper', width: "100%"}}>
                            <DisplayDateDetails selectedDate={{index: 0, date: selectedDay}}/>
                        </Box>
                    </Card>
                </Grid>
            </Grid>

            <Fab size="small" color="secondary" aria-label="add" variant={"extended"} onClick={()=>setIsMakingNewMedication(!isMakingNewMedication)}>
                <Add /> Add Medication
            </Fab>
            <Fab size="small" color="secondary" aria-label="add" variant={"extended"} onClick={()=>setIsListOfMedications(!isListOfMedications)}>
                <Add /> Medication List
            </Fab>
        </div>
    );
};

export default MainLoggedInPage;

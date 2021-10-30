import React, {useContext, useEffect, useState} from 'react';
import DisplayCalendar from "../Components/CalendarPageComponets/Calendar/DisplayCalendar";
import AppbarTop from "../Components/Standalone/AppbarTop";
import {Box, Button, Card, Dialog, DialogActions, DialogTitle, Fab, Grid, Paper} from "@mui/material";
import {Add} from "@mui/icons-material";
import {ApiContext} from "../Context/ApiContext";
import DisplayMedicationList from "../Components/CalendarPageComponets/MedicationList/DisplayMedicationList";
import DisplayDateDetails from "../Components/CalendarPageComponets/DateDetails/DisplayDateDetails";
import {CalendarContext} from "../Context/CalendarContext";
import {backgroundStyle, flex1ItemStyle, flexWrapperStyle} from "../Styles";
import MedicationDialog from "../Components/MedicationDialog/MedicationDialog";
import {IMedicationBase} from "../../../Types/MedicationTypes";

const MainLoggedInPage = () => {

    const {fetchMedicationsAndDosagesAndPersons} = useContext(ApiContext);
    const {selectedDay} = useContext(CalendarContext);


    const [isMakingNewMedication, setIsMakingNewMedication] = useState(false);
    const [isListOfMedications, setIsListOfMedications] = useState(false);


    const [tempNewMedication, setTempNewMedication] = useState<IMedicationBase>({
        medicationId: "",
        userId: "",
        prescriptionName: "",
        medicationOwner: {name:"",color:""},
        prescriptionDosage: 0,
        nextFillDay: new Date(),
        inDefinite: true,
        endDate: new Date(),
        userNotes: "",
        dosages: [
            {
                amount: 0,
                time: new Date(),
                isDaily: true,
                isWeekly: false,
                isOnceAMonth: false,
                customOnceAMonthDate: new Date(),
                customWeekDays: {
                    monday: false,
                    tuesday: false,
                    wednesday: false,
                    thursday: false,
                    friday: false,
                    saturday: false,
                    sunday: false
                }
            }
        ]
    });

    const newMedicationDialog = () => {
        return (
            <>
                <MedicationDialog
                    isOpen={isMakingNewMedication}
                    isNewMedication={true}
                    medication={tempNewMedication}
                    closeDialog={(medicationObject: IMedicationBase) => {
                        setTempNewMedication({...medicationObject})
                        setIsMakingNewMedication(false)
                    }}
                />
            </>
        )
    }

    const listOfMedicationDialog = () => {
        return (
            <>
                <Dialog open={isListOfMedications} maxWidth={"xl"} fullWidth={true}>
                    <DialogTitle>Medications</DialogTitle>
                    <DisplayMedicationList/>
                    <DialogActions>
                        <Button variant={"contained"} fullWidth
                                onClick={() => setIsListOfMedications(!isListOfMedications)}>Close</Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }


    useEffect(() => {
        fetchMedicationsAndDosagesAndPersons()
    }, []);


    return (
        <Box sx={flexWrapperStyle}>
            <AppbarTop/>
            <Box
                sx={{...flex1ItemStyle, ...backgroundStyle}}
            >
                {newMedicationDialog()}
                {listOfMedicationDialog()}
                <Grid container spacing={2}>
                    <Grid item xs={12} lg={6}>
                        <Paper elevation={0}
                               sx={{overflow: 'auto', position: 'relative', height: ['60vh', '60vh', '60vh', '80vh'],}}>
                            <DisplayCalendar/>
                            {/*//@ts-ignore*/}
                            <Box sx={{position: 'absolute', bottom: '6px', left: '6px'}}>
                                <Fab size="small" color="secondary" aria-label="add" variant={"extended"}
                                     onClick={() => setIsMakingNewMedication(!isMakingNewMedication)}>
                                    <Add/> Add Medication
                                </Fab>
                            </Box>
                            <Box sx={{position: 'absolute', bottom: '6px', right: '6px'}}>
                                <Fab size="small" color="secondary" aria-label="add" variant={"extended"}
                                     onClick={() => setIsListOfMedications(!isListOfMedications)}>
                                    <Add/> Medication List
                                </Fab>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <Card sx={{width: "100%", height: "100%",}}>
                            <Box sx={{bgcolor: 'background.paper', width: "100%"}}>
                                <DisplayDateDetails selectedDate={{index: 0, date: selectedDay}}/>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default MainLoggedInPage;

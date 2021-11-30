import {Add} from "@mui/icons-material";
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
import React, {useContext, useEffect, useRef, useState} from "react";
import {IMedicationBase} from "../../../Types/MedicationTypes";
import DisplayCalendar from "../Components/CalendarPageComponets/Calendar/DisplayCalendar";
import DisplayDateDetails from "../Components/CalendarPageComponets/DateDetails/DisplayDateDetails";
import DisplayMedicationList from "../Components/CalendarPageComponets/MedicationList/DisplayMedicationList";
import MedicationDialog from "../Components/MedicationDialog/MedicationDialog";
import AppbarTop from "../Components/Standalone/AppbarTop";
import {ApiContext} from "../Context/ApiContext";
import {CalendarContext} from "../Context/CalendarContext";
import {backgroundStyle, flex1ItemStyle, flexWrapperStyle, wrapperStyle} from "../Styles";
import {makeMedication} from "../typeConstructors";


const MainLoggedInPage = () => {
    const {fetchMedicationsAndDosagesAndPersons} = useContext(ApiContext);
    const {selectedDay} = useContext(CalendarContext);

    const [isMakingNewMedication, setIsMakingNewMedication] = useState(false);
    const [isListOfMedications, setIsListOfMedications] = useState(false);

    const [tempNewMedication, setTempNewMedication] = useState<IMedicationBase>(makeMedication());


    useEffect(() => {
        fetchMedicationsAndDosagesAndPersons().then(r => r);
    }, [fetchMedicationsAndDosagesAndPersons]);

    return (
        <Box sx={{...flexWrapperStyle, minHeight: '100vh'}} key={1}>
            <AppbarTop/>
            <Box sx={{
                ...flex1ItemStyle, ...backgroundStyle,
                display: "flex", height:'100%',
                flexDirection: ["column", undefined, undefined, 'row']
            }}>
                <Box sx={{
                    height: '100%',
                    width: ['100%', '100%', '100%', '450px'],
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <Box sx={{width: '100%', height: '450px'}}>
                        <Paper
                            elevation={0}
                            sx={{
                                overflow: "auto",
                                position: "relative",
                                height: '450px'
                            }}
                        >
                            <DisplayCalendar/>
                            <Box sx={{position: "absolute", bottom: "6px", left: "6px"}}>
                                <Fab
                                    size="small"
                                    color="secondary"
                                    aria-label="add"
                                    variant={"extended"}
                                    onClick={() =>
                                        setIsMakingNewMedication(!isMakingNewMedication)
                                    }
                                >
                                    <Add/> Add
                                </Fab>
                            </Box>
                            <Box sx={{position: "absolute", bottom: "6px", right: "6px"}}>
                                <Fab
                                    size="small"
                                    color="secondary"
                                    aria-label="add"
                                    variant={"extended"}
                                    onClick={() => setIsListOfMedications(!isListOfMedications)}
                                >
                                    <Add/> List
                                </Fab>
                            </Box>
                        </Paper>
                    </Box>
                </Box>
                <Card sx={{position: 'relative', width: "100%", minHeight: ['0hvw',,,'83.5vh'], ml: [undefined, , , '1vw'], mt:['1vw',,,'0vw']}}>
                    <Box sx={{bgcolor: "background.paper", width: "100%", height: [undefined,,,'100%'], minHeight:['0hvw',,,'65vh']}}>
                        <DisplayDateDetails
                            selectedDate={{index: 0, date: selectedDay}}
                        />
                    </Box>
                </Card>
            </Box>
            <DisplayMedicationList closeListOfMedications={() => setIsListOfMedications(false)}
                                   isDialogOpen={isListOfMedications}/>
            <MedicationDialog
                isOpen={isMakingNewMedication}
                isNewMedication={true}
                medication={tempNewMedication}
                closeDialog={(medicationObject: IMedicationBase) => {
                    setTempNewMedication({...medicationObject});
                    setIsMakingNewMedication(false);
                }}
            />
        </Box>
    );
};

export default MainLoggedInPage;

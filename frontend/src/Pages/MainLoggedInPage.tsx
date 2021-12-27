import { Add, AssignmentLate, Check, Update, WatchLater } from "@mui/icons-material";
import {
    Box,
    Button,
    Card,
    Checkbox,
    Dialog,
    DialogActions,
    DialogTitle,
    Divider,
    Fab,
    FormControlLabel,
    FormGroup,
    Grid,
    Paper, Typography, useMediaQuery
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { IMedicationBase } from "../../../Types/MedicationTypes";
import DisplayCalendar from "../Components/CalendarPageComponets/Calendar/DisplayCalendar";
import DisplayDateDetails from "../Components/CalendarPageComponets/DateDetails/DisplayDateDetails";
import DisplayMedicationList from "../Components/CalendarPageComponets/MedicationList/DisplayMedicationList";
import MedicationDialog from "../Components/MedicationDialog/MedicationDialog";
import AppbarTop from "../Components/Standalone/AppbarTop";
import { ApiContext } from "../Context/ApiContext";
import { CalendarContext } from "../Context/CalendarContext";
import { backgroundStyle, sideBackgroundStyle, flex1ItemStyle, flexWrapperStyle, primaryIconTextStyle, wrapperStyle } from "../Styles";
import { makeMedication } from "../typeConstructors";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LoginButton from "../Components/Misc/LoginButton";
import { HamburgerMenu } from "../Components/Misc/HamburgerMenu";
import { Filter } from "../Components/Misc/Filter";
import { FilterMenu } from "../Components/Misc/FilterMenu";

const MainLoggedInPage = () => {
    const { fetchMedicationsAndDosagesAndPersons } = useContext(ApiContext);
    const { setSelectedDay, selectedDay } = useContext(CalendarContext);

    const [isMakingNewMedication, setIsMakingNewMedication] = useState(false);
    const [isListOfMedications, setIsListOfMedications] = useState(false);

    const [tempNewMedication, setTempNewMedication] = useState<IMedicationBase>(makeMedication());


    useEffect(() => {
        fetchMedicationsAndDosagesAndPersons().then(r => r);
    }, [fetchMedicationsAndDosagesAndPersons]);
    const xs = useMediaQuery('(min-width:0px) and (max-width:1199.99px)');
    return (
        <Box sx={{ ...sideBackgroundStyle, ...flexWrapperStyle, minHeight: '100vh', width: 'auto', position: 'relative' }} key={1}>

            <Box sx={{
                ...flex1ItemStyle, ...sideBackgroundStyle,
                display: "flex", height: '100%', width: 'auto',
                flexDirection: ["column", undefined, undefined, 'row']
            }}>
                <Box sx={{
                    height: 'auto',
                    width: ['auto', 'auto', 'auto', '450px'],
                    display: "flex",
                    flexDirection: "column",
                    ...sideBackgroundStyle,
                }}>
                    <Box sx={{ height: '50px', color: 'text.primary' }}>
                        <HamburgerMenu />
                    </Box>
                    {/* #region Calendar */}
                    <Box sx={{ width: 'auto', height: '450px', }}>
                        <Paper
                            elevation={0}
                            sx={{
                                ...sideBackgroundStyle,
                                overflow: "auto",
                                position: "relative",
                                height: '450px'
                            }}
                        >
                            <DisplayCalendar />
                            <Box sx={{ position: "absolute", bottom: "10px", left: "10px" }}>
                                <Fab
                                    size="small"
                                    color="secondary"
                                    aria-label="add"
                                    variant={"extended"}
                                    onClick={() =>
                                        setIsMakingNewMedication(true)
                                    }
                                >
                                    <Add /> Add
                                </Fab>
                            </Box>
                            <Box sx={{ position: "absolute", bottom: "10px", left: '50%', transform: 'translate(-50%,0)' }}>
                                <Fab
                                    sx={{ padding: '5px' }}
                                    size="small"
                                    color="secondary"
                                    aria-label="add"
                                    variant={"extended"}
                                    onClick={() => setSelectedDay(new Date())}
                                >
                                    <CalendarTodayIcon sx={{ mr: 'px' }} />  Jump to Today
                                </Fab>
                            </Box>
                            <Box sx={{ position: "absolute", bottom: "10px", right: "10px" }}>
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
                    <Divider variant='middle' sx={{ width: 'auto' }} />
                    <Box>
                        <Box sx={{ color: 'text.primary', marginTop: 'auto', marginBottom: '35px', display:['none','inline'] }}>
                            <Filter />
                        </Box>
                        <Box sx={{position:'absolute', right:'0px', zIndex:'300'}}>
                            <FilterMenu />
                        </Box>
                    </Box>
                </Box>
                <Divider variant='middle' orientation="vertical" flexItem />
                <Card elevation={0} sx={{ bgcolor: "background.paper", position: 'relative', width: "100%", minHeight: ['0hvw', , , '83.5vh'], ml: [undefined, , , '20px'], mt: ['1vw', , , '0vw'] }}>
                    <Box sx={{ bgcolor: "background.paper", width: "100%", height: [undefined, , , '65vh'], minHeight: ['0hvw', , , '65vh'], maxHeight: [undefined, , , '65vh'] }}>
                        <DisplayDateDetails
                            selectedDate={{ index: 0, date: selectedDay }}
                        />
                    </Box>
                </Card>
            </Box>
            <DisplayMedicationList closeListOfMedications={() => setIsListOfMedications(false)}
                isDialogOpen={isListOfMedications} />
            <MedicationDialog
                isOpen={isMakingNewMedication}
                isNewMedication={true}
                medication={tempNewMedication}
                closeDialog={(medicationObject: IMedicationBase) => {
                    setTempNewMedication({ ...medicationObject });
                    setIsMakingNewMedication(false);
                }}
            />
        </Box>
    );
};
export default MainLoggedInPage;
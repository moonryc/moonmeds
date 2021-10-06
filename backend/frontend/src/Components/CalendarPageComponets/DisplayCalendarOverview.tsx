import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import {useTheme} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../Misc/UserContext";
import {CalendarContext} from "./CalendarContext";
import DisplayCalendar from "./Calendar/DisplayCalendar";
import {Card, Grid} from "@mui/material";
import DisplayDateDetails from "./DateDetails/DisplayDateDetails";
import DisplayMedicationList from "./MedicationList/DisplayMedicationList";
import MedicationCard from "../Misc/MedicationCard/MedicationCard";
import {IMedicationFrontEnd} from "../../../../Types/MedicationType";


interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

//TODO(Travis): Theming/CSS
const DisplayCalendarOverview = () => {

    const {userMedications,fetchUserMedications,userMedicationDosages,fetchUserMedicationsDosages} = useContext(UserContext);
    const {selectedDay} = useContext(CalendarContext);

    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    useEffect(() => {
            fetchUserMedications().then(message => message)
            fetchUserMedicationsDosages().then(message=>message)
        console.log(userMedicationDosages)
    }, [value]);


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleTabsChangeIndex = (index: number) => {
        setValue(index);
    };


    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <DisplayCalendar/>
                </Grid>

                <Grid item xs={6}>
                    <Card sx={{width: "100%", height: "100%",}}>
                        <Box sx={{bgcolor: 'background.paper', width: "100%", maxHeight: '85vh', overflow: 'auto'}}>
                            <AppBar position="static">
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    indicatorColor="secondary"
                                    textColor="inherit"
                                    variant="fullWidth"
                                    aria-label="full width tabs example"
                                >
                                    <Tab label="Date Details" {...a11yProps(0)} />
                                    <Tab label="Medications" onClick={() => fetchUserMedications()} {...a11yProps(1)} />
                                    <Tab label="Add A Medication" {...a11yProps(2)} />
                                </Tabs>
                            </AppBar>
                            <SwipeableViews
                                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                index={value}
                                onChangeIndex={handleTabsChangeIndex}
                            >
                                {/*DETAILS OF SELECTED DATE*/}
                                <TabPanel  value={value} index={0} dir={theme.direction}>
                                    <DisplayDateDetails selectedDate={{index: 0, date: selectedDay}}/>
                                </TabPanel>
                                {/*MEDICATION LIST*/}
                                <TabPanel value={value} index={1} dir={theme.direction}>
                                    <DisplayMedicationList handleTabsChangeIndex={handleTabsChangeIndex}/>
                                </TabPanel>
                                {/*NEW MEDICATION CARD*/}
                                <TabPanel value={value} index={2} dir={theme.direction}>
                                    <MedicationCard
                                        _id={''} isNewCard={true}
                                        prescriptionName={''} prescriptionDosage={0}
                                        startDay={new Date()} nextFillDay={new Date()}
                                        dosages={[]} userNotes={''}
                                      handleTabsChangeIndex={handleTabsChangeIndex}/>
                                </TabPanel>
                            </SwipeableViews>
                        </Box>
                    </Card>
                </Grid>
            </Grid>

        </div>
    );
};

export default DisplayCalendarOverview;

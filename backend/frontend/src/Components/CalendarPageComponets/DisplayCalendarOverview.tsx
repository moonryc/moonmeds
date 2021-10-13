import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import SwipeableViews from 'react-swipeable-views';
import {useTheme} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {CalendarContext} from "../../Context/CalendarContext";
import DisplayCalendar from "./Calendar/DisplayCalendar";
import {Card, Grid, LinearProgress} from "@mui/material";
import DisplayDateDetails from "./DateDetails/DisplayDateDetails";
import DisplayMedicationList from "./MedicationList/DisplayMedicationList";
import MedicationCard from "../Misc/MedicationCard/MedicationCard";
import {ApiContext} from "../../Context/ApiContext";


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

/**
 * This component houses the calendar, date details,medication list, and add a medication parent components
 * @constructor
 */
const DisplayCalendarOverview = () => {

    const theme = useTheme();

    //region Context

    const {loadingBar,fetchUserMedications,fetchUserMedicationsDosages} = useContext(ApiContext);
    const {selectedDay} = useContext(CalendarContext);

    //endregion

    //region useState

    /**
     * the index of the swipeable tabs
     */
    const [value, setValue] = useState<number>(0);

    //endregion

    //region Callback functions

    /**
     * Handles changing swpiable views passed down to child components
     * passed to medication list because if user has no medications a button is presented to create a new medication, the tab is changed using this function
     * passed to the new medication because once a new medication is created the tab automatically switches back to the medication list using this function
     * @param index
     */
    const handleTabsChangeIndex = (index: number) => {
        updateUserMedications()
        setValue(index);
    };

    //endregion


    //region functions

    /**
     * Handles changing swipable views
     * @param event
     * @param newValue
     */
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        updateUserMedications()
        setValue(newValue);
    };

    //endregion

    //region ApiCalls

    /**
     * Updates the userMedications and userMedicationDosages
     */
    const updateUserMedications = () => {
        fetchUserMedications()
        fetchUserMedicationsDosages()
    }

    //endregion



    return (
        <div>

            <Grid container spacing={2}>
                <Grid item xs={6}>

                    <DisplayCalendar/>
                </Grid>

                <Grid item xs={6}>
                    <Card sx={{width: "100%", height: "100%",}}>
                        <Box sx={{bgcolor: 'background.paper', width: "100%"}}>
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
                                    <Tab label="Medications" {...a11yProps(1)} />
                                    <Tab label="Add A Medication" {...a11yProps(2)} />
                                </Tabs>
                            </AppBar>
                            {loadingBar?<LinearProgress/>:<></>}
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

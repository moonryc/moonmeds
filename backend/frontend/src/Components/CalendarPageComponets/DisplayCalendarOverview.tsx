import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import SwipeableViews from 'react-swipeable-views';
import {useTheme} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {UserContext} from "../../Context/UserContext";
import {CalendarContext} from "../../Context/CalendarContext";
import DisplayCalendar from "./Calendar/DisplayCalendar";
import {Card, Grid, LinearProgress} from "@mui/material";
import DisplayDateDetails from "./DateDetails/DisplayDateDetails";
import DisplayMedicationList from "./MedicationList/DisplayMedicationList";
import MedicationCard from "../Misc/MedicationCard/MedicationCard";
import {MedicationContext} from "../../Context/MedicationContext";
import {fetchUserMedications, fetchUserMedicationsDosages} from "../../Services/ApiCalls";
import {response} from "express";


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

    const {userMedicationDosages,setUserMedicationDosages,setUserMedications} = useContext(MedicationContext);

    const {selectedDay} = useContext(CalendarContext);

    const [updateBar, setUpdateBar] = useState(false);


    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const updateUserMedications = () => {
        setUpdateBar(true)
        fetchUserMedications().then((response)=>{
            if(response.error){
                //TODO show error on screen
                console.log(response.errorMessage)
            }else{
                setUserMedications(response.response)
            }
        })
        setTimeout(()=>{setUpdateBar(false)},1000)
    }
    const updateUserMedicationDosages = () => {
        setUpdateBar(true)
        fetchUserMedicationsDosages().then((response)=>{
            if(response.error){
                //TODO show error on screen
                console.log(response.errorMessage)
            }else{
                setUserMedicationDosages(response.response)
            }
        })
        setTimeout(()=>{setUpdateBar(false)},1000)

    }


    useEffect(() => {
        updateUserMedications()
        updateUserMedicationDosages()

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
                                    <Tab label="Medications" onClick={() => updateUserMedications()} {...a11yProps(1)} />
                                    <Tab label="Add A Medication" {...a11yProps(2)} />
                                </Tabs>
                            </AppBar>
                            {updateBar?<LinearProgress/>:<></>}
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

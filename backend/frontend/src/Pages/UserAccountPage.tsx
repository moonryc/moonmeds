import React from 'react';
import AppbarTop from "../Components/Standalone/AppbarTop";
import {makeStyles} from "@mui/styles";
import People from "../Components/UserAccountPageComponents/ManagePeople";
import {Box, Tab, Tabs} from "@mui/material";
import ManagePeople from "../Components/UserAccountPageComponents/ManagePeople";
import ChangePassword from "../Components/UserAccountPageComponents/ChangePassword";


const useStyles = makeStyles((theme?: any) => ({
    outerWrapper: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'

    },
    innerWrapper: {
        background: theme.palette.primary.dark,
        color: theme.palette.text.primary,
        flex: 1,
        height: '100%',
        padding: '5vh'

    }
}));


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}



//TODO(TRAVIS): THEMEING1
const UserAccountPage = () => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    const classes = useStyles();

    return (
        <>
            <div className={classes.outerWrapper}>
                <AppbarTop/>
                <div className={classes.innerWrapper}>
                    <Box
                        sx={{ flexGrow: 1, bgcolor: 'secondary.main', display: 'flex', height: "100%" }}
                    >
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={value}
                            onChange={handleChange}
                            aria-label="Vertical tabs"
                            sx={{ borderRight: 1, borderColor: 'divider' }}
                        >
                            <Tab label="Account" {...a11yProps(0)} />
                            <Tab label="Password" {...a11yProps(1)} />
                            <Tab label="Manage People" {...a11yProps(2)} />
                            <Tab label="Get Medication History" {...a11yProps(3)} />
                        </Tabs>
                        <TabPanel value={value} index={0}>
                            Account
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <ChangePassword/>
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <ManagePeople/>
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                            TODO LATER
                        </TabPanel>

                    </Box>
                </div>
            </div>
        </>
    );
};

export default UserAccountPage;

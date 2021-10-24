import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Router} from "react-router";
import {createBrowserHistory} from "history";
import {UserContainer} from "./Context/UserContext";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {LocalizationProvider} from "@mui/lab";
import {createTheme} from "@mui/material";
import {StyledEngineProvider, ThemeProvider} from "@mui/material/styles";
import {MedicationContainer} from "./Context/MedicationContext";
import {CalendarContainer} from "./Context/CalendarContext";
import {ApiContainer} from "./Context/ApiContext";
import {NotificationsContainer} from "./Context/NotificationsContext";


const customHistory = createBrowserHistory();

const theme = createTheme({
        palette: {
            primary: {
                main: '#1a237e',
            },
            secondary: {
                main: '#6a1b9a'
            },
            text: {
                primary: '#ffffff',
                secondary: '#B0B3B8',
            },
            background: {
                default: '#1a237e',
                paper: '#1a237e',
            },
            action:{
                active: '#fff',
                hover: 'fff',
                selected: '#fff',
                disabled: '#fff',
                disabledBackground: '#fff'
            },
        },
        breakpoints: {
            values: {
                xs: 0,
                sm: 600,
                md: 900,
                lg: 1200,
                xl: 1536,
            },
        }
});


ReactDOM.render(
    <React.StrictMode>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <NotificationsContainer>
                <Router history={customHistory}>
                    <ThemeProvider theme={theme}>
                        <UserContainer>
                            <MedicationContainer>
                                <CalendarContainer>
                                    <ApiContainer>
                                        <StyledEngineProvider injectFirst>
                                            <App/>
                                        </StyledEngineProvider>
                                    </ApiContainer>
                                </CalendarContainer>
                            </MedicationContainer>
                        </UserContainer>
                    </ThemeProvider>
                </Router>
            </NotificationsContainer>
        </LocalizationProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

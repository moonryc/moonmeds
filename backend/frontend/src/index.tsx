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
                main: '#242526',
            },
            secondary: {
                main: '#599988'
            },
            text: {
                primary: '#E4E6EB',
                secondary: '#B0B3B8',
            },
            background: {
                default: '#1A1919',
                paper: '#242526',
            },
        }
    }
);


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

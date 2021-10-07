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
            <Router history={customHistory}>
                <ThemeProvider theme={theme}>
                    <UserContainer>
                        <MedicationContainer>
                            <CalendarContainer>
                                <StyledEngineProvider injectFirst>
                                    <App/>
                                </StyledEngineProvider>
                            </CalendarContainer>
                        </MedicationContainer>
                    </UserContainer>
                </ThemeProvider>
            </Router>
        </LocalizationProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Router} from "react-router";
import {createBrowserHistory} from "history";
import {UserContainer} from "./Components/Misc/UserContext";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {LocalizationProvider} from "@mui/lab";

import {createTheme} from "@mui/material";
import {ThemeProvider} from "@mui/styles";
import { StyledEngineProvider } from "@mui/material/styles";
const customHistory = createBrowserHistory();


const theme = createTheme({
        palette: {
            primary: {
                main: '#242526',
            },
            secondary: {
                main: '#d975d0'
            },
            text: {
                primary: '#E4E6EB',
                secondary: '#B0B3B8',
            }
        }
    }
);

ReactDOM.render(
    <React.StrictMode>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Router history={customHistory}>
            <ThemeProvider theme={theme}>
                <UserContainer>
                    <StyledEngineProvider injectFirst>
                        <App/>
                    </StyledEngineProvider>
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

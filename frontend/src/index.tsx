import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Router} from "react-router";
import {createBrowserHistory} from "history";
import {createTheme} from "@material-ui/core";
import {ThemeProvider} from '@material-ui/styles';
import {UserContainer} from "./Components/Misc/UserContext";

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
                    <App/>
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

import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { createTheme } from "@mui/material";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { createBrowserHistory } from "history";
import React from "react";
import ReactDOM from "react-dom";
import { Router } from "react-router";
import App from "./App";
import { ApiContainer } from "./Context/ApiContext";
import { CalendarContainer } from "./Context/CalendarContext";
import { MedicationContainer } from "./Context/MedicationContext";
import { NotificationsContainer } from "./Context/NotificationsContext";
import { UserContainer } from "./Context/UserContext";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const customHistory = createBrowserHistory();

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1a237e",
    },
    secondary: {
      main: "#6a1b9a",
    },
    text: {
      primary: "#ffffff",
      secondary: "#B0B3B8",
    },
    background: {
      paper: "#333",
    },
    action: {
      active: "#fff",
      hover: "fff",
      selected: "#fff",
      disabled: "#fff",
      disabledBackground: "#fff",
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
  },
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
                      <App />
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
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

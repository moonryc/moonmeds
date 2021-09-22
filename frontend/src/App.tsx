import React from 'react';
import './App.css';
import Login from "./Pages/Startup/Login";
import Signup from "./Pages/Startup/Signup";
import Homepage from "./Pages/Startup/Homepage";
import ErrorPage from "./Pages/ErrorPage";
import {Route, Switch} from "react-router-dom";


function App() {
  return (
    <div className="App">

        <Switch>
          <Route exact path="/" component={Homepage}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/login"  component={Login}/>
          <Route component={ErrorPage}/>
        </Switch>

    </div>
  );
}

export default App;

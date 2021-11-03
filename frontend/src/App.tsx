import React, {useCallback, useContext, useEffect} from "react";
import { Route } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import "./App.css";
import NotificationsParent from "./Components/Misc/Notifications/NotificationsParent";
import { ApiContext } from "./Context/ApiContext";
import { UserContext } from "./Context/UserContext";
import ErrorPage from "./Pages/ErrorPage";
import LoginPage from "./Pages/LoginPage";
import MainLoggedInPage from "./Pages/MainLoggedInPage";
import Homepage from "./Pages/Startup/Homepage";


function App() {
  const { loggedIn, setLoggedIn } = useContext<any>(UserContext);
  const { checkIfJWTTokenIsValid } = useContext<any>(ApiContext);

  const checkIfUserIsLoggedIn = useCallback(
      () => {
        if (reactLocalStorage.get("JWTToken") != null) {
          checkIfJWTTokenIsValid();
          return null
        } else {
          setLoggedIn(false);
          return false;
        }
      },
      [checkIfJWTTokenIsValid, setLoggedIn]
  );


  /**
   * Travis so help me god if you remove the [] on this useEffect
   * for real though the empty array is needed because this makes it only render on the initial webpage load
   * otheriwse it will run over and over and over causing issues
   */
  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, [checkIfUserIsLoggedIn]);
  //TODO sara this doesnt work
  //Travis see comment above

  return (
    <div>
      {loggedIn == null ? (
        <></>
      ) : (
        <>
          <Route
            exact
            path="/"
            component={loggedIn ? MainLoggedInPage : Homepage}
          />
          <Route exact path="/Err" component={ErrorPage} />
          <Route
            exact
            path="/Login"
            component={loggedIn ? MainLoggedInPage : LoginPage}
          />
          <NotificationsParent />
        </>
      )}
    </div>
  );
}

export default App;

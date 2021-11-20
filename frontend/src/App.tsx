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
import SignUpPage from "./Pages/SignUpPage";


function App() {
  const { loggedIn, setLoggedIn } = useContext<any>(UserContext);
  const { checkIfJWTTokenIsValid } = useContext<any>(ApiContext);

    /**
     * Checks if the user is logged in and if the JWT token is still valid.
     */
  const checkIfUserIsLoggedIn = useCallback(
      () => {
        if (reactLocalStorage.get("JWTToken") != null) {
          checkIfJWTTokenIsValid();
        } else {
          setLoggedIn(false);
        }
        return false;
      },
      [checkIfJWTTokenIsValid, setLoggedIn]
  );


  /**
   * This effect is used to check if the user is logged in.
   */
  useEffect(() => {
    checkIfUserIsLoggedIn();
  }, [checkIfUserIsLoggedIn]);


  return (
    <div>
      {loggedIn == null ? (
        <></>
      ) : (
        <>
          <Route
            exact
            path="/"
            component={loggedIn ? MainLoggedInPage : LoginPage}
          />
          <Route exact path="/Err" component={ErrorPage} />
          <Route
            exact
            path="/Login"
            component={loggedIn ? ()=>{
                window.location.href = "/";
                return <></>
            } : LoginPage}
          />
            <Route
                exact path="/signup"
                component={loggedIn ? ()=> {
                    window.location.href = "/"
                    return <></>
                } : SignUpPage}
            />
          <NotificationsParent />
        </>
      )}
    </div>
  );
}

export default App;

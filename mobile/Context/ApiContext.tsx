import React, {createContext, useCallback, useContext} from 'react';
import * as SecureStore from 'expo-secure-store';
import {UserContext} from "./UserContext";
import {MedicationContext} from "./MedicationContext";

interface IApiContext {
    postLogin: (username: string, password: string) => void
    fetchMedicationsDosagesPersons: () => void

}

export const ApiContext = createContext<IApiContext>({
    postLogin: (username: string, password: string) => {
    },
    fetchMedicationsDosagesPersons: () => {
    }
});

const ApiContextContainer = (props: any) => {

        const {setIsLoggedIn, setUsersPeople} = useContext(UserContext);
        const {setUserMedications, setUserMedicationDosages} = useContext(MedicationContext);

        const postLogin = async (username: string, password: string) => {

            const url = "https://moonmeds.herokuapp.com/users/login"


            await fetch(url, {
                method: "POST", // *GET, POST, PUT, DELsETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                credentials: "same-origin", // include, *same-origin, omit
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({userName: username, password: password}), // body data type must match "Content-Type" header
            }).then(response => {
                console.log(`Response status: ${response.status}`)
                if (response.ok) {
                    response.json().then(data => {
                        SecureStore.setItemAsync("moonmeds-JWT", data.payload.token)
                        setIsLoggedIn(true)
                    })
                } else {
                    setIsLoggedIn(false)
                }
            })
        }

        const fetchMedicationsDosagesPersons = useCallback(async () => {

            let url = "https://moonmeds.herokuapp.com/users/userData";
            // Default options are marked with *
            await SecureStore.getItemAsync("moonmeds-JWT").then(authKey => {
                if (authKey) {
                    fetch(url, {
                        method: "GET", // *GET, POST, PUT, DELETE, etc.
                        mode: "cors", // no-cors, *cors, same-origin
                        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                        credentials: "same-origin", // include, *same-origin, omit
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                            Authorization: authKey,
                        },
                    })
                        .then((response) => {
                            console.log(`Response status: ${response.status}`)
                            if (response.ok) {
                                return response.json()
                            } else {
                                throw response.json()
                            }
                        })
                        .then((apiResponse) => {
                            setUserMedications(apiResponse.payload.medicationArray);
                            setUserMedicationDosages(apiResponse.payload.medicationDosagesArray);
                            setUsersPeople([...apiResponse.payload.persons]);

                        })
                        .catch((error) => {
                            // newNotification(error, "error");
                        });
                }
            })

        }, [setUserMedicationDosages, setUserMedications, setUsersPeople]);

        return (
            <ApiContext.Provider value={{postLogin, fetchMedicationsDosagesPersons}}>
                {props.children}
            </ApiContext.Provider>
        );
    }
;

export default ApiContextContainer;

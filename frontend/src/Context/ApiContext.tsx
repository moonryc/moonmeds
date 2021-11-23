import React, {createContext, useCallback, useContext, useEffect, useState} from "react";
import {reactLocalStorage} from "reactjs-localstorage";
import {IMedicationBase} from "../../../Types/MedicationTypes";
import {IPersonNameAndColor} from "../../../Types/UserTypes";
import {MedicationContext} from "./MedicationContext";
import {NotificationsContext} from "./NotificationsContext";
import {UserContext} from "./UserContext";
import {makePersonNameAndColor} from "../typeConstructors";

export interface IApiContextState {
    numberOfCurrentApiCalls: number;
    setNumberOfCurrentApiCalls: (state: number) => void;
    loadingBar: boolean;
    setLoadingBar: (state: boolean) => void;

    checkIfJWTTokenIsValid: () => Promise<any>;
    postLogin: (userName: string, password: string) => Promise<any>;
    postRegister: (
        userName: string,
        password: string,
        emailAddress: string
    ) => Promise<any>;
    fetchMedicationsAndDosagesAndPersons: () => Promise<any>;
    fetchPersons: () => Promise<any>;
    putNewMedication: (medicationObject: IMedicationBase) => Promise<any>;
    putUpdateExistingMedication: (
        medicationObject: IMedicationBase
    ) => Promise<any>;
    putDeleteSelectedMedications: (
        medicationIdArray: string[],
        removePastMedicationDosages: boolean
    ) => Promise<any>;
    putUpdateMedicationDosage: (
        dosageId: string,
        hasBeenTaken: boolean,
        hasBeenMissed: boolean,
        timeTaken: Date
    ) => Promise<any>;
    putAddPerson: (newPerson: IPersonNameAndColor) => Promise<any>;
    putRemovePerson: (removePerson: IPersonNameAndColor) => Promise<any>;
}

export const ApiContext = createContext<IApiContextState>({
    numberOfCurrentApiCalls: 0,
    setNumberOfCurrentApiCalls: (state: number) => {
    },
    loadingBar: false,
    setLoadingBar: (state: boolean) => {
    },

    checkIfJWTTokenIsValid: async () => Promise,
    postLogin: async (userName: string, password: string) => Promise,
    postRegister: async (
        userName: string,
        password: string,
        emailAddress: string
    ) => Promise,
    fetchMedicationsAndDosagesAndPersons: async () => Promise,
    fetchPersons: async () => Promise,
    putNewMedication: async (medicationObject: IMedicationBase) => Promise,
    putUpdateExistingMedication: async (medicationObject: IMedicationBase) =>
        Promise,
    putDeleteSelectedMedications: async (
        medicationIdArray: string[],
        removePastMedicationDosages: boolean
    ) => Promise,
    putUpdateMedicationDosage: async (
        dosageId: string,
        hasBeenTaken: boolean,
        hasBeenMissed: boolean,
        timeTaken: Date
    ) => Promise,
    putAddPerson: async (newPerson: IPersonNameAndColor) => Promise,
    putRemovePerson: async (removePerson: IPersonNameAndColor) => Promise,
});

export const ApiContainer = (props: any) => {
    const {setUserMedications, setUserMedicationDosages} =
        useContext(MedicationContext);
    const {newNotification} = useContext(NotificationsContext);
    const {setLoggedIn, setUsersPeople} = useContext<any>(UserContext);

    const {children} = props;
    const [numberOfCurrentApiCalls, setNumberOfCurrentApiCalls] =
        useState<number>(0);
    const [loadingBar, setLoadingBar] = useState<boolean>(false);

    useEffect(() => {
        if (numberOfCurrentApiCalls < 1) {
            setNumberOfCurrentApiCalls(0);
            setLoadingBar(false);
        } else {
            setLoadingBar(true);
        }
    }, [numberOfCurrentApiCalls]);

    const handleLoadingBarTurnOn = useCallback(() => {
        setNumberOfCurrentApiCalls(numberOfCurrentApiCalls => numberOfCurrentApiCalls + 1);
    }, []);

    const handleLoadingBarTurnOff = useCallback(() => {
        setNumberOfCurrentApiCalls(numberOfCurrentApiCalls => numberOfCurrentApiCalls - 1);
    }, []);

    const checkResponseCodes = useCallback((response: any) => {
        if (response.status === 200 || response.status === 400) {
            return response.json();
        } else if (response.status === 401) {
            setLoggedIn(false);
            throw Error("Session has expired please log back in");
        } else {
            throw response.json();
        }
    }, [setLoggedIn]);

    /**
     * Checks if user is logged in using a callback with the JWTToken being used as the authorization bearer token
     */
    const checkIfJWTTokenIsValid = useCallback(async () => {
        let url = "/users/callback";
        // Default options are marked with *
        await fetch(url, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                Authorization: reactLocalStorage.get("JWTToken"),
            },
        })
            .then((response) => {
                return checkResponseCodes(response);
            })
            .then((apiResponse) => {
                setLoggedIn(true);
            })
            .catch((err) => {
                setLoggedIn(false);
                newNotification(err, "error");
            });
    }, [checkResponseCodes, newNotification, setLoggedIn]);

    /**
     * Login to the website and sets the bearer token to the JWT token as well as setting logged in to true or false
     * @param userName
     * @param password
     */
    const postLogin = async (userName: string, password: string): Promise<void> => {
        let url = "/users/login";
        // Default options are marked with *
        await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELsETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({userName: userName, password: password}), // body data type must match "Content-Type" header
        })
            .then((response) => {
                return checkResponseCodes(response);
            })
            .then((apiResponse) => {
                if (apiResponse.error) {
                    throw apiResponse.errorMessage;
                } else {
                    reactLocalStorage.set("JWTToken", apiResponse.payload.token);
                    setLoggedIn(true);
                }
            })
            .catch((error) => {
                setLoggedIn(false);
                newNotification(error, "error");
            });
    };

    /**
     * Creates a new User
     * @param userName
     * @param password
     * @param emailAddress
     */
    const postRegister = async (userName: string, password: string, emailAddress: string): Promise<void> => {
        let url = "/users/register";
        // Default options are marked with *
        await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                userName: userName,
                password: password,
                emailAddress: emailAddress,
            }), // body data type must match "Content-Type" header
        })
            .then((response) => {
                return checkResponseCodes(response);
            })
            .then((apiResponse) => {
                if (apiResponse.error) {
                    throw apiResponse.errorMessage;
                } else {
                    reactLocalStorage.set("JWTToken", apiResponse.payload.token);
                    setLoggedIn(true);
                }
            })
            .catch((error) => {
                setLoggedIn(false);
                newNotification(error, "error");
            });
    };

    const fetchMedicationsAndDosagesAndPersons = useCallback(async () => {
        handleLoadingBarTurnOn();
        let url = "/users/userData";
        // Default options are marked with *
        await fetch(url, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: reactLocalStorage.get("JWTToken"),
            },
        })
            .then((response) => {
                return checkResponseCodes(response);
            })
            .then((apiResponse) => {
                if (apiResponse.error) {
                    throw apiResponse.errorMessage;
                } else {
                    setUserMedications(apiResponse.payload.medicationArray);
                    setUserMedicationDosages(apiResponse.payload.medicationDosagesArray);
                    setUsersPeople([...apiResponse.payload.persons]);
                }
            })
            .catch((error) => {
                newNotification(error, "error");
            });

        handleLoadingBarTurnOff();
    }, [checkResponseCodes, handleLoadingBarTurnOff, handleLoadingBarTurnOn, newNotification, setUserMedicationDosages, setUserMedications, setUsersPeople]);

    const fetchPersons = async (): Promise<void> => {
        handleLoadingBarTurnOn();
        let url = "/users/usersPersons";
        // Default options are marked with *
        await fetch(url, {
            method: "GET", // or 'PUT'
            headers: {
                Authorization: reactLocalStorage.get("JWTToken"),
            },
        })
            .then((response) => {
                return checkResponseCodes(response);
            })
            .then((apiResponse) => {
                if (apiResponse.error) {
                    throw apiResponse.errorMessage;
                } else {
                    setUsersPeople([...apiResponse.payload]);
                }
            })
            .catch((error) => {
                newNotification(error, "error");
            });
        handleLoadingBarTurnOff();
    };

    //region Put

    /**
     * Create a new medication
     * @param medicationObject
     */
    const putNewMedication = async (
        medicationObject: IMedicationBase
    ): Promise<any> => {
        handleLoadingBarTurnOn();
        let url = "/medication/newMedication";
        await fetch(url, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: reactLocalStorage.get("JWTToken"),
            },
            body: JSON.stringify(medicationObject), // body data type must match "Content-Type" header
        })
            .then((response) => {
                return checkResponseCodes(response);
            })
            .then((apiResponse) => {
                if (apiResponse.error) {
                    throw apiResponse.errorMessage;
                } else {
                    fetchMedicationsAndDosagesAndPersons();
                    newNotification("Medication Successfully added", "success");
                }
            })
            .catch((error) => {
                newNotification(error, "error");
            });
        handleLoadingBarTurnOff();
    };
    /**
     * Update selected medication
     * @param medicationObject
     */
    const putUpdateExistingMedication = async (
        medicationObject: IMedicationBase
    ) => {
        handleLoadingBarTurnOn();
        let url = "/medication/updateMedication";
        await fetch(url, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: reactLocalStorage.get("JWTToken"),
            },
            body: JSON.stringify(medicationObject), // body data type must match "Content-Type" header
        })
            .then((response) => {
                return checkResponseCodes(response);
            })
            .then((apiResponse) => {
                if (apiResponse.error) {
                    throw apiResponse.errorMessage;
                } else {
                    fetchMedicationsAndDosagesAndPersons();
                    newNotification("updated medication successfully", "success");
                }
            })
            .catch((error) => {
                newNotification(error, "error");
            });
        handleLoadingBarTurnOff();
    };
    /**
     * Deletes an array of medications
     * @param medicationIdArray
     * @param removePastMedicationDosages
     */
    const putDeleteSelectedMedications = async (
        medicationIdArray: string[],
        removePastMedicationDosages: boolean
    ) => {
        handleLoadingBarTurnOn();
        let url = "/medication/removeMedications";
        await fetch(url, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: reactLocalStorage.get("JWTToken"),
            },
            body: JSON.stringify({
                arrayOfMedicationIds: medicationIdArray,
                removePastMedicationDosages: removePastMedicationDosages,
            }), // body data type must match "Content-Type" header
        })
            .then((response) => {
                return checkResponseCodes(response);
            })
            .then((apiResponse) => {
                if (apiResponse.error) {
                    throw apiResponse.errorMessage;
                } else {
                    fetchMedicationsAndDosagesAndPersons();
                    newNotification("Deleted medications successfully", "success");
                }
            })
            .catch((error) => {
                newNotification(error, "error");
            });
        handleLoadingBarTurnOff();
    };
    /**
     * update a medication dosage to manually mark if taken/missed and what time it was taken
     * @param dosageId
     * @param hasBeenTaken
     * @param hasBeenMissed
     * @param timeTaken
     */
    const putUpdateMedicationDosage = async (
        dosageId: string,
        hasBeenTaken: boolean,
        hasBeenMissed: boolean,
        timeTaken: Date
    ): Promise<void> => {
        handleLoadingBarTurnOn();
        let url = "/medicationDosages/update";
        await fetch(url, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: reactLocalStorage.get("JWTToken"),
            },
            body: JSON.stringify({
                dosageId: dosageId,
                hasBeenTaken: hasBeenTaken,
                hasBeenMissed: hasBeenMissed,
                timeTaken: timeTaken,
            }), // body data type must match "Content-Type" header
        })
            .then((response) => {
                return checkResponseCodes(response);
            })
            .then((apiResponse) => {
                if (apiResponse.error) {
                    throw apiResponse.errorMessage;
                } else {
                    //TODO make a fetch dosages
                    fetchMedicationsAndDosagesAndPersons();
                    newNotification("updated scheduled dosage successfully", "success");
                }
            })
            .catch((error) => {
                newNotification(error, "error");
            });
        handleLoadingBarTurnOff();
    };
    /**
     * Add a person to the users account to assign a medication too
     * @param newPerson
     */
    const putAddPerson = async (newPerson: IPersonNameAndColor) => {
        handleLoadingBarTurnOn();
        let url = "/users/addPerson";
        await fetch(url, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: reactLocalStorage.get("JWTToken"),
            },
            body: JSON.stringify(newPerson), // body data type must match "Content-Type" header
        })
            .then((response) => {
                return checkResponseCodes(response);
            })
            .then((apiResponse) => {
                if (apiResponse.error) {
                    throw apiResponse.errorMessage;
                } else {
                    fetchPersons();
                    newNotification("added new person successfully", "success");
                }
            })
            .catch((error) => {
                newNotification(error, "error");
            });
        handleLoadingBarTurnOff();
    };
    /**
     * Removes a person
     * @param removePerson
     */
    const putRemovePerson = async (removePerson: IPersonNameAndColor) => {
        handleLoadingBarTurnOn();
        let url = "/users/removePerson";
        await fetch(url, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: reactLocalStorage.get("JWTToken"),
            },
            body: JSON.stringify(removePerson), // body data type must match "Content-Type" header
        })
            .then((response) => {
                return checkResponseCodes(response);
            })
            .then((apiResponse) => {
                if (apiResponse.error) {
                    throw apiResponse.errorMessage;
                } else {
                    fetchPersons();
                    newNotification("removed person successfully", "success");
                }
            })
            .catch((error) => {
                newNotification(error, "error");
            });
        handleLoadingBarTurnOff();
    };

    //endregion

    return (
        <ApiContext.Provider
            value={{
                numberOfCurrentApiCalls,
                setNumberOfCurrentApiCalls,
                loadingBar,
                setLoadingBar,

                checkIfJWTTokenIsValid,
                postLogin,
                postRegister,
                fetchMedicationsAndDosagesAndPersons,
                fetchPersons,
                putNewMedication,
                putUpdateExistingMedication,
                putDeleteSelectedMedications,
                putUpdateMedicationDosage,
                putAddPerson,
                putRemovePerson,
            }}
        >
            {children}
        </ApiContext.Provider>
    );
};

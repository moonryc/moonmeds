import React, {createContext, useContext, useEffect, useState} from "react";
import {IMedicationBase} from "../../../Types/MedicationTypes";
import {IMedicationDosagesBase} from "../../../Types/MedicationDosagesTypes";
import {MedicationContext} from "./MedicationContext";
import {NotificationsContext} from "./NotificationsContext";
import {UserContext} from "./UserContext";
import {reactLocalStorage} from 'reactjs-localstorage';
import {IPersonNameAndColor} from "../../../Types/UserTypes";

export interface IApiContextState {
    numberOfCurrentApiCalls: number
    setNumberOfCurrentApiCalls: (state: number) => void
    loadingBar: boolean,
    setLoadingBar: (state: boolean) => void


    checkIfJWTTokenIsValid: () => void,
    postLogin: (userName: string, password: string) => void,
    postRegister: (userName: string, password: string, emailAddress: string) => void,
    fetchMedicationsAndDosagesAndPersons: () => void,
    fetchPersons: () => void,
    putNewMedication: (medicationObject: IMedicationBase) => void,
    putUpdateExistingMedication: (medicationObject: IMedicationBase) => void,
    putDeleteSelectedMedications: (medicationIdArray: string[], removePastMedicationDosages: boolean) => void,
    putUpdateMedicationDosage: (dosageId: string, hasBeenTaken: boolean, hasBeenMissed: boolean, timeTaken: Date) => void,
    putAddPerson: (newPerson: IPersonNameAndColor) => void,
    putRemovePerson: (removePerson: IPersonNameAndColor) => void,
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
    postRegister: async (userName: string, password: string, emailAddress: string) => Promise,
    fetchMedicationsAndDosagesAndPersons: async () => Promise,
    fetchPersons: async () => Promise,
    putNewMedication: async (medicationObject: IMedicationBase) => Promise,
    putUpdateExistingMedication: async (medicationObject: IMedicationBase) => Promise,
    putDeleteSelectedMedications: async (medicationIdArray: string[], removePastMedicationDosages: boolean) => Promise,
    putUpdateMedicationDosage: async (dosageId: string, hasBeenTaken: boolean, hasBeenMissed: boolean, timeTaken: Date) => Promise,
    putAddPerson: async (newPerson: IPersonNameAndColor) => Promise,
    putRemovePerson: async (removePerson: IPersonNameAndColor) => Promise,

})

export const ApiContainer = (props: any) => {

    const {setUserMedications, setUserMedicationDosages} = useContext(MedicationContext);
    const {newNotification} = useContext(NotificationsContext);
    const {setLoggedIn, setUsersPeople} = useContext<any>(UserContext);

    const {children} = props;
    const [numberOfCurrentApiCalls, setNumberOfCurrentApiCalls] = useState<number>(0);
    const [loadingBar, setLoadingBar] = useState<boolean>(false);

    useEffect(() => {
        if (numberOfCurrentApiCalls < 1) {
            setNumberOfCurrentApiCalls(0)
            setLoadingBar(false)
        } else {
            setLoadingBar(true)
        }
    }, [numberOfCurrentApiCalls]);


    const handleLoadingBarTurnOn = () => {
        let tempNumber = numberOfCurrentApiCalls + 1
        setNumberOfCurrentApiCalls(tempNumber)
    }
    const handleLoadingBarTurnOff = () => {
        let tempNumber = numberOfCurrentApiCalls - 1
        setNumberOfCurrentApiCalls(tempNumber)
    }


    /**
     * Checks if user is logged in using a callback with the JWTToken being used as the authorization bearer token
     */
    const checkIfJWTTokenIsValid = async () => {
        let url = '/users/callback';
        // Default options are marked with *
        await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Authorization': reactLocalStorage.get('JWTToken')
            },

        })
            .then(response => {
                if (response.status == 200) {
                    setLoggedIn(true)
                } else {
                    setLoggedIn(false)
                }
            })
            .catch(err => newNotification(err, "error"))
    }

    /**
     * Login to the website and sets the bearer token to the JWT token as well as setting logged in to true or false
     * @param userName
     * @param password
     */
    const postLogin = async (userName: string, password: string): Promise<void> => {
        let url = '/users/login';
        // Default options are marked with *
        await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({userName: userName, password: password}) // body data type must match "Content-Type" header
        })
            .then(response => {
                if (response.status == 200) {
                    response.json().then(apiResponse => {
                        //if there is an error
                        if (apiResponse.error) {
                            throw apiResponse.errorMessage
                        } else {
                            reactLocalStorage.set('JWTToken', apiResponse.payload.token)
                            setLoggedIn(true)
                        }
                    })
                } else {
                    response.json().then(error => {
                        throw error
                    })
                }
            })
            .catch(error => {
                setLoggedIn(false);
                newNotification(error, "error")
            })
    }

    /**
     * Creates a new User
     * @param userName
     * @param password
     * @param emailAddress
     */
    const postRegister = async (userName: string, password: string, emailAddress: string): Promise<void> => {
        let url = '/users/register';
        // Default options are marked with *
        await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({userName: userName, password: password, emailAddress: emailAddress}) // body data type must match "Content-Type" header
        })
            .then(response => {
                if(response.status==200){
                    response.json().then(apiResponse=>{
                        if(apiResponse.error){
                            throw apiResponse.errorMessage
                        }else{
                            setLoggedIn(true)
                            reactLocalStorage.set("JWTToken",apiResponse.payload.token)
                        }
                    })
                }else{
                    response.json().then(error=>{throw error})
                }
            }).catch(error=>{
                setLoggedIn(false)
                newNotification(error,"error")
            })
    }

    const fetchMedicationsAndDosagesAndPersons = async () => {
        handleLoadingBarTurnOn()
        let url = '/users/userData';
        // Default options are marked with *
        await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': reactLocalStorage.get('JWTToken')
            },
        })
            .then(response => {
                if (response.status == 200) {
                    response.json().then(apiResponse => {
                        if (apiResponse.error) {
                            throw apiResponse.errorMessage
                        } else {
                            setUserMedications(apiResponse.payload.medicationArray)
                            setUserMedicationDosages(apiResponse.payload.medicationDosagesArray)
                            setUsersPeople(apiResponse.payload.persons)
                        }
                    })
                } else if (response.status == 401) {
                    setLoggedIn(false)
                    throw "Login has expired please log back in"
                } else {
                    response.json().then(error => {
                        throw error
                    })
                }
            }).catch(error => {
                newNotification(error, "error")
            })

        // newNotification(data.alert.message,data.alert.severity)
        handleLoadingBarTurnOff()

    }

    const fetchPersons = async (): Promise<void> => {
        handleLoadingBarTurnOn()
        let url = '/users/usersPersons';
        // Default options are marked with *
        await fetch(url, {
            method: 'GET', // or 'PUT'
            headers: {
                'Authorization': reactLocalStorage.get("JWTToken")
            },
        })
            .then(response => {
                if (response.status == 200) {
                    response.json().then(apiResponse => {
                        if (apiResponse.error) {
                            throw apiResponse.errorMessage
                        } else {
                            setUsersPeople(apiResponse.payload)
                        }
                    })
                } else if (response.status == 401) {
                    setLoggedIn(false)
                    throw "session expired please log back in"
                } else {
                    response.json().then(error => {
                        throw error
                    })
                }
            }).catch(error => {
                newNotification(error, "error")
            })
        handleLoadingBarTurnOff()
    }

    //region Put

    /**
     * Create a new medication
     * @param medicationObject
     */
    const putNewMedication = async (medicationObject: IMedicationBase) => {
        handleLoadingBarTurnOn()
        let url = "/medication/newMedication"
        await fetch(url, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': reactLocalStorage.get("JWTToken")
            },
            body: JSON.stringify(medicationObject) // body data type must match "Content-Type" header
        })
            .then(response => {
                if(response.status==200){
                    response.json().then(apiResponse=>{
                        if(apiResponse.error){
                            throw apiResponse.errorMessage
                        }else{
                            newNotification("Medication Successfully added","success")
                        }
                    })
                }else if(response.status == 401){
                    setLoggedIn(false)
                    throw "Login has expired please log back in"
                }else{
                    response.json().then(apiResponse=>{
                        throw apiResponse
                    })
                }
            })
            .catch(error => {
                newNotification(error,"error")
            })
        handleLoadingBarTurnOff()
    };
    /**
     * Update selected medication
     * @param medicationObject
     */
    const putUpdateExistingMedication = async (medicationObject: IMedicationBase) => {
        handleLoadingBarTurnOn()
        let url = "/medication/updateMedication"
        await fetch(url, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': reactLocalStorage.get("JWTToken")
            },
            body: JSON.stringify(medicationObject) // body data type must match "Content-Type" header
        })
            .then(response => {
                if(response.status == 200){
                    response.json().then(apiResponse=>{
                        if(apiResponse.error){
                            throw apiResponse.errorMessage
                        }else{
                            newNotification("updated medication successfully","success")
                        }
                    })
                }else if( response.status == 401){
                    throw "Login has expired please log back in"
                }else{
                    response.json().then(apiResponse=>{
                        throw apiResponse
                    })
                }
            })
            .catch(error=>{
                newNotification(error,"error")
            })
                handleLoadingBarTurnOff()
    };
    /**
     * Deletes an array of medications
     * @param medicationIdArray
     * @param removePastMedicationDosages
     */
    const putDeleteSelectedMedications = async (medicationIdArray: string[], removePastMedicationDosages: boolean) => {
        handleLoadingBarTurnOn()
        let url = "/medication/deleteSelectedMedications"
        await fetch(url, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': reactLocalStorage.get("JWTToken")
            },
            body: JSON.stringify({
                arrayOfMedicationIds: medicationIdArray,
                removePastMedicationDosages: removePastMedicationDosages
            }) // body data type must match "Content-Type" header
        })
            .then(response => {
                if(response.status == 200){
                    response.json().then(apiResponse=>{
                        if(apiResponse.error){
                            throw apiResponse.errorMessage
                        }else{
                            newNotification("Deleted medications successfully","success")
                        }
                    })
                }else if( response.status == 401){
                    throw "Login has expired please log back in"
                }else{
                    response.json().then(apiResponse=>{
                        throw apiResponse
                    })
                }
            })
            .catch(error=>{
                newNotification(error,"error")
            })
        handleLoadingBarTurnOff()


    };
    /**
     * update a medication dosage to manually mark if taken/missed and what time it was taken
     * @param dosageId
     * @param hasBeenTaken
     * @param hasBeenMissed
     * @param timeTaken
     */
    const putUpdateMedicationDosage = async (dosageId: string, hasBeenTaken: boolean, hasBeenMissed: boolean, timeTaken: Date): Promise<void> => {
        handleLoadingBarTurnOn()
        let url = "/medicationDosages/update"
        await fetch(url, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': reactLocalStorage.get("JWTToken")
            },
            body: JSON.stringify({
                dosageId: dosageId,
                hasBeenTaken: hasBeenTaken,
                hasBeenMissed: hasBeenMissed,
                timeTaken: timeTaken
            }) // body data type must match "Content-Type" header
        })
            .then(response => {
                if(response.status == 200){
                    response.json().then(apiResponse=>{
                        if(apiResponse.error){
                            throw apiResponse.errorMessage
                        }else{
                            newNotification("updated scheduled dosage successfully","success")
                        }
                    })
                }else if( response.status == 401){
                    throw "Login has expired please log back in"
                }else{
                    response.json().then(apiResponse=>{
                        throw apiResponse
                    })
                }
            })
            .catch(error=>{
                newNotification(error,"error")
            })
        handleLoadingBarTurnOff()
    }
    /**
     * Add a person to the users account to assign a medication too
     * @param newPerson
     */
    const putAddPerson = async (newPerson: IPersonNameAndColor) => {
        handleLoadingBarTurnOn()
        let url = "/users/addPerson"
        await fetch(url, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': reactLocalStorage.get("JWTToken")
            },
            body: JSON.stringify(newPerson) // body data type must match "Content-Type" header
        })
            .then(response => {
                if(response.status == 200){
                    response.json().then(apiResponse=>{
                        if(apiResponse.error){
                            throw apiResponse.errorMessage
                        }else{
                            newNotification("added new person successfully","success")
                        }
                    })
                }else if( response.status == 401){
                    throw "Login has expired please log back in"
                }else{
                    response.json().then(apiResponse=>{
                        throw apiResponse
                    })
                }
            })
            .catch(error=>{
                newNotification(error,"error")
            })
        handleLoadingBarTurnOff()

    };
    /**
     * Removes a person
     * @param removePerson
     */
    const putRemovePerson = async (removePerson: IPersonNameAndColor) => {
        handleLoadingBarTurnOn()
        let url = "/users/removePerson"
        await fetch(url, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': reactLocalStorage.get("JWTToken")
            },
            body: JSON.stringify(removePerson) // body data type must match "Content-Type" header
        })
            .then(response => {
                if(response.status == 200){
                    response.json().then(apiResponse=>{
                        if(apiResponse.error){
                            throw apiResponse.errorMessage
                        }else{
                            newNotification("removed person successfully","success")
                        }
                    })
                }else if( response.status == 401){
                    throw "Login has expired please log back in"
                }else{
                    response.json().then(apiResponse=>{
                        throw apiResponse
                    })
                }
            })
            .catch(error=>{
                newNotification(error,"error")
            })
        handleLoadingBarTurnOff()
    };

    //endregion

    return (
        <ApiContext.Provider value={{
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
        }}>
            {children}
        </ApiContext.Provider>
    )
}
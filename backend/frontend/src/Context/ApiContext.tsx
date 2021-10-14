import React, {createContext, useContext, useEffect, useState} from "react";
import {IMedicationFrontEnd} from "../../../Types/MedicationType";
import {MedicationContext} from "./MedicationContext";
import {IBackendResponse, ILoginResponse} from "../../../Types/BackendResponseType";
import {NotificationsContext} from "./NotificationsContext";
import {UserContext} from "./UserContext";

export interface IApiContextState {
    numberOfCurrentApiCalls: number
    setNumberOfCurrentApiCalls: (state: number) => void
    loadingBar: boolean,
    setLoadingBar: (state: boolean) => void


    //apiCalls
    fetchPersons: () => void,
    checkIfLoggedIn: () => void,
    fetchUserMedications: () => void,
    fetchUserMedicationsDosages: () => void
    postNewMedication: (medicationDetails: IMedicationFrontEnd) => void
    postPerson: (listOfNames:string[]) => void
    putDeleteSelectedMedications: (medicationFrontEndArray: IMedicationFrontEnd[]) => void
    putDeleteSelectedPerson: (listOfDesiredNames:string[]) => void
    submitUpdatedMedication: (medicationDetails: IMedicationFrontEnd) => void

    fetchCalendarOverviewPage:()=>void
}

export const ApiContext = createContext<IApiContextState>({
    numberOfCurrentApiCalls: 0,
    setNumberOfCurrentApiCalls: (state: number) => {
    },
    loadingBar: false,
    setLoadingBar: (state: boolean) => {
    },


    //apiCalls

    fetchPersons: async () => Promise,
    checkIfLoggedIn: async () => Promise,
    fetchUserMedications: async () => Promise,
    fetchUserMedicationsDosages: async () => Promise,
    postNewMedication: async (medicationDetails: IMedicationFrontEnd) => Promise,
    postPerson: async (listOfNames:string[]) => Promise,
    putDeleteSelectedPerson: async (listOfDesiredNames:string[]) => Promise,
    putDeleteSelectedMedications: async (medicationFrontEndArray: IMedicationFrontEnd[]) => Promise,
    submitUpdatedMedication: async (medicationDetails: IMedicationFrontEnd) => Promise,
    fetchCalendarOverviewPage:()=>{},
})

export const ApiContainer = (props: any) => {

    const {setUserMedications, setUserMedicationDosages} = useContext(MedicationContext);
    const {newNotification} = useContext(NotificationsContext);
    const { setUserId, setLoggedIn,setUsersPeople } = useContext<any>(UserContext);

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

    const checkIfLoggedIn = async (): Promise<void>=>{
        let backendResponse:ILoginResponse = {isLoggedIn: false, jwtToken: ""}
        let url='/auth/current-session';
        // Default options are marked with *
        await fetch(url, {
            method: 'GET', // or 'PUT'
        })
            .then(response => response.json())
            .then(data => {
                backendResponse = data
                console.log(backendResponse)
                setLoggedIn(backendResponse.isLoggedIn)
                setUserId(backendResponse.jwtToken)
            })
            .catch((error) => {
                console.error('Error: ', error);
            });
    }

    //region Medications
    const fetchUserMedications = async (): Promise<void> => {
        handleLoadingBarTurnOn()
        let url = '/medication/userMedications';
        // Default options are marked with *
        await fetch(url, {
            method: 'GET', // or 'PUT'
            headers: {
                // 'Authorization': `Bearer ${userId}`
            },
        })
            .then(response => response.json())
            .then((data: IBackendResponse) => {
                if (!data.error) {
                    setUserMedications(data.response)
                }
                newNotification(data.alert.message,data.alert.severity)
                handleLoadingBarTurnOff()
            }).catch(error => {
                //TODO
                handleLoadingBarTurnOff()
            })

    }
    const fetchUserMedicationsDosages = async () => {

        handleLoadingBarTurnOn()
        let url = '/medication/userMedicationsDosages';
        // Default options are marked with *
        await fetch(url, {
            method: 'GET', // or 'PUT'
            headers: {
                // 'Authorization': `Bearer ${userId}`
            },
        })
            .then(response => response.json())
            .then((data:IBackendResponse) => {
            if (!data.error) {
                setUserMedicationDosages(data.response)
            }
                newNotification(data.alert.message,data.alert.severity)
            handleLoadingBarTurnOff()
        }).catch(error => {
            //TODO
            handleLoadingBarTurnOff()
        })
    }
    const postNewMedication = async (medicationDetails: IMedicationFrontEnd) => {
        handleLoadingBarTurnOn()
        let url = "/medication/addnewmedication"
        await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // 'Authorization': `Bearer ${userId}`
            },
            body: JSON.stringify(medicationDetails) // body data type must match "Content-Type" header
        })
            .then(response => response.json())
            .then((data: IBackendResponse) => {
                newNotification(data.alert.message,data.alert.severity)
                fetchCalendarOverviewPage()
                handleLoadingBarTurnOff()
            }).catch(error => {
                //TODO
                handleLoadingBarTurnOff()
            })
    };
    const putDeleteSelectedMedications = async (medicationFrontEndArray: IMedicationFrontEnd[]) => {
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
                // 'Authorization': `Bearer ${userId}`
            },
            body: JSON.stringify({payload: medicationFrontEndArray}) // body data type must match "Content-Type" header
        })
            .then(response => response.json())
            .then((data: IBackendResponse) => {

                fetchCalendarOverviewPage()

                handleLoadingBarTurnOff()
                newNotification(data.alert.message,data.alert.severity)
            })
            .catch(error => {
                //TODO
                handleLoadingBarTurnOff()
            })


    };
    const submitUpdatedMedication = async (medicationDetails: IMedicationFrontEnd) => {
        handleLoadingBarTurnOn()
        let url = "/medication/updatemedication"
        await fetch(url, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // 'Authorization': `Bearer ${userId}`
            },
            body: JSON.stringify(medicationDetails) // body data type must match "Content-Type" header
        }).then(response => response.json())
            .then((data: IBackendResponse) => {
                newNotification(data.alert.message,data.alert.severity)
                handleLoadingBarTurnOff()
                fetchCalendarOverviewPage()
            }).catch(error => {
                //TODO
                handleLoadingBarTurnOff()
            })
    };
    //endregion


    //region Persons
    const postPerson = async (listOfNames:string[]) => {
        handleLoadingBarTurnOn()
        let url = "/persons/addPerson"
        await fetch(url, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // 'Authorization': `Bearer ${userId}`
            },
            body: JSON.stringify({payload:listOfNames}) // body data type must match "Content-Type" header
        })
            .then(response => response.json())
            .then((data: IBackendResponse) => {
                fetchPersons()
                newNotification(data.alert.message,data.alert.severity)
                handleLoadingBarTurnOff()
            }).catch(error => {
                //TODO
                handleLoadingBarTurnOff()
            })

    };
    const fetchPersons = async () => {

        handleLoadingBarTurnOn()
        let url = '/persons/getPersons';
        // Default options are marked with *
        await fetch(url, {
            method: 'GET', // or 'PUT'
            headers: {
                // 'Authorization': `Bearer ${userId}`
            },
        })
            .then(response => response.json())
            .then((data:IBackendResponse) => {
                if (!data.error) {
                    setUsersPeople(data.response)
                }
                newNotification(data.alert.message,data.alert.severity)
                handleLoadingBarTurnOff()
            }).catch(error => {
                //TODO
                handleLoadingBarTurnOff()
            })
    }
    const putDeleteSelectedPerson =  async (listOfOnlyDesiredNames: string[]) => {
        handleLoadingBarTurnOn()
        let url = "/persons/deleteSelectedPerson"
        await fetch(url, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // 'Authorization': `Bearer ${userId}`
            },
            body: JSON.stringify({payload: listOfOnlyDesiredNames}) // body data type must match "Content-Type" header
        })
            .then(response => response.json())
            .then((data: IBackendResponse) => {
                fetchPersons()
                handleLoadingBarTurnOff()
                newNotification(data.alert.message,data.alert.severity)
            })
            .catch(error => {
                //TODO
                handleLoadingBarTurnOff()
            })


    };
    //endregion

    const fetchCalendarOverviewPage =()=>{
        Promise.all([fetchUserMedications(),fetchUserMedicationsDosages(),fetchPersons()]).then(values=>values)
    }

    return (
        <ApiContext.Provider value={{
            numberOfCurrentApiCalls,
            setNumberOfCurrentApiCalls,
            loadingBar,
            setLoadingBar,
            postPerson,
            fetchPersons,
            putDeleteSelectedPerson,
            checkIfLoggedIn,
            fetchUserMedicationsDosages,
            fetchUserMedications,
            postNewMedication,
            putDeleteSelectedMedications,
            submitUpdatedMedication,
            fetchCalendarOverviewPage
        }}>
            {children}
        </ApiContext.Provider>
    )
}
import React, {createContext, useContext, useEffect, useState} from "react";
import {IMedicationFrontEnd} from "../../../Types/MedicationType";
import {MedicationContext} from "./MedicationContext";
import {IBackendResponse} from "../../../Types/BackendResponseType";
import {NotificationsContext} from "./NotificationsContext";

export interface IApiContextState {
    numberOfCurrentApiCalls: number
    setNumberOfCurrentApiCalls: (state: number) => void
    loadingBar: boolean,
    setLoadingBar: (state: boolean) => void


    //apiCalls
    fetchUserMedications: () => void,
    fetchUserMedicationsDosages: () => void
    postNewMedication: (medicationDetails: IMedicationFrontEnd) => void
    putDeleteSelectedMedications: (medicationFrontEndArray: IMedicationFrontEnd[]) => void
    submitUpdatedMedication: (medicationDetails: IMedicationFrontEnd) => void
}

export const ApiContext = createContext<IApiContextState>({
    numberOfCurrentApiCalls: 0,
    setNumberOfCurrentApiCalls: (state: number) => {
    },
    loadingBar: false,
    setLoadingBar: (state: boolean) => {
    },


    //apiCalls
    fetchUserMedications: async () => Promise,
    fetchUserMedicationsDosages: async () => Promise,
    postNewMedication: async (medicationDetails: IMedicationFrontEnd) => Promise,
    putDeleteSelectedMedications: async (medicationFrontEndArray: IMedicationFrontEnd[]) => Promise,
    submitUpdatedMedication: async (medicationDetails: IMedicationFrontEnd) => Promise,
})

export const ApiContainer = (props: any) => {

    const {setUserMedications, setUserMedicationDosages} = useContext(MedicationContext);
    const {newNotification} = useContext(NotificationsContext);

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
        let response = await fetch(url, {
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

        return response;
    }
    const postNewMedication = async (medicationDetails: IMedicationFrontEnd) => {
        handleLoadingBarTurnOn()
        let url = "/medication/addnewmedication"
        let response = await fetch(url, {
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
                handleLoadingBarTurnOff()
            }).catch(error => {
                //TODO
                handleLoadingBarTurnOff()
            })
        return response;
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

                fetchUserMedications()
                fetchUserMedicationsDosages()

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
        let response = await fetch(url, {
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
                handleLoadingBarTurnOff()
                newNotification(data.alert.message,data.alert.severity)
            }).catch(error => {
                //TODO
                handleLoadingBarTurnOff()
            })
        return response;
    };

    return (
        <ApiContext.Provider value={{
            numberOfCurrentApiCalls,
            setNumberOfCurrentApiCalls,
            loadingBar,
            setLoadingBar,
            fetchUserMedicationsDosages,
            fetchUserMedications,
            postNewMedication,
            putDeleteSelectedMedications,
            submitUpdatedMedication
        }}>
            {children}
        </ApiContext.Provider>
    )
}
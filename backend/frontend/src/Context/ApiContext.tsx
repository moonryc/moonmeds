import React, {createContext, useContext, useEffect, useState} from "react";
import {IMedicationDosagesSchema, IMedicationFrontEnd} from "../../../Types/MedicationType";
import {MedicationContext} from "./MedicationContext";

export interface IApiContextState {
    numberOfCurrentApiCalls: number
    setNumberOfCurrentApiCalls: (state: number) => void
    loadingBar: boolean,
    setLoadingBar: (state: boolean) => void
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
    fetchUserMedications: async () => Promise,
    fetchUserMedicationsDosages: async () => Promise,
    postNewMedication: async (medicationDetails: IMedicationFrontEnd) => Promise,
    putDeleteSelectedMedications: async (medicationFrontEndArray: IMedicationFrontEnd[]) => Promise,
    submitUpdatedMedication: async (medicationDetails: IMedicationFrontEnd) => Promise,
})

export const ApiContainer = (props: any) => {

    const {setUserMedications, setUserMedicationDosages} = useContext(MedicationContext);

    const {children} = props;
    const [numberOfCurrentApiCalls, setNumberOfCurrentApiCalls] = useState<number>(0);
    const [loadingBar, setLoadingBar] = useState<boolean>(false);

    useEffect(() => {
        if(numberOfCurrentApiCalls<1){
            setNumberOfCurrentApiCalls(0)
            setLoadingBar(false)
        }else{
            setLoadingBar(true)
        }
    }, [numberOfCurrentApiCalls]);



    const handleLoadingBarTurnOn = () => {
        let tempNumber = numberOfCurrentApiCalls+1
        setNumberOfCurrentApiCalls(tempNumber)
    }
    const handleLoadingBarTurnOff = () => {
            let tempNumber = numberOfCurrentApiCalls -1
            setNumberOfCurrentApiCalls(tempNumber)
    }


    const fetchUserMedications = async (): Promise<void> => {
        handleLoadingBarTurnOn()
        console.log(loadingBar)
        let url = '/medication/userMedications';
        // Default options are marked with *
        await fetch(url, {
            method: 'GET', // or 'PUT'
            headers: {
                // 'Authorization': `Bearer ${userId}`
            },
        })
            .then(response => response.json())
            .then(body => {
                if (body.error) {
                    //TODO
                    handleLoadingBarTurnOff()
                } else {
                    setUserMedications(body.response)
                    handleLoadingBarTurnOff()
                }
            }).catch(error => {
                console.log(error);
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
        }).then(response => response.json()).then(data => {
            if (data.error) {
                //TODO
                handleLoadingBarTurnOff()
            } else {
                handleLoadingBarTurnOff()
                setUserMedicationDosages(data.response)
            }
        }).catch(error => {
            console.log(error);
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
        }).then(response => response.json()).then(data => {
            if (data.error) {
                //TODO
                handleLoadingBarTurnOff()
            } else {
                handleLoadingBarTurnOff()
            }
        }).catch(error => {
            console.log(error);
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
            .then(data => {
                if (data.error) {
                    //TODO
                    handleLoadingBarTurnOff()
                } else {
                    handleLoadingBarTurnOff()
                    fetchUserMedications()
                }
            })
            .catch(error => {
                console.log(error);
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
        }).then(response => response.json()).then(body => {
            if (body.error) {
                //TODO
                handleLoadingBarTurnOff()
            } else {
                handleLoadingBarTurnOff()
            }
        }).catch(error => {
            console.log(error)
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
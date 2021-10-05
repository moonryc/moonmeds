import React,{createContext, useState,} from 'react'
import {IMedicationFrontEnd} from "../../../../Types/MedicationType";

interface IUserContextState{
    loggedIn:boolean,
    setLoggedIn:(state:boolean) => void,
    userId:string,
    setUserId:(state:string) => void,
    userMedications:IMedicationFrontEnd[]|null
    setUserMedications:(state:IMedicationFrontEnd[]|null)=>void,
    fetchUserMedications: () => Promise<void>
    submitUpdatedMedication: (medicationDetails:IMedicationFrontEnd) => Promise<void>,
    postNewMedication: (medicationDetails:IMedicationFrontEnd) => Promise<void>,



}


export const UserContext = createContext<IUserContextState>({
    loggedIn:false,
    setLoggedIn:(state:boolean)=>{},
    userId:'test',
    setUserId:(state:string) => '',
    userMedications:null,
    setUserMedications:(state:IMedicationFrontEnd[]|null)=>{},
    fetchUserMedications: async () => {},
    submitUpdatedMedication: async (medicationDetails:IMedicationFrontEnd) => {},
    postNewMedication: async (medicationDetails:IMedicationFrontEnd) => {},

})

export const UserContainer= (props:any) => {
    const {children} = props;
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [userId, setUserId] = useState<string>('test');
    const [userMedications, setUserMedications] = useState<IMedicationFrontEnd[]|null>(null);
    const fetchUserMedications:() => Promise<void> = async () => {
        let url = '/medication/userMedications';
        // Default options are marked with *
        await fetch(url, {
            method: 'GET', // or 'PUT'
            headers: {
                'Authorization': `Bearer ${userId}`
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setUserMedications(data.response)
            })
            .catch((error) => {
                console.error('Error: ', error);
            });
    }
    const submitUpdatedMedication = async (medicationDetails:IMedicationFrontEnd) => {
        let url = "/medication/updatemedication"
        await fetch(url, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${userId}`
            },
            body: JSON.stringify(medicationDetails) // body data type must match "Content-Type" header
        }).then(response => response);
    };
    const postNewMedication = async (medicationDetails:IMedicationFrontEnd) => {
        let url = "/medication/addnewmedication"
        await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${userId}`
            },
            body: JSON.stringify(medicationDetails) // body data type must match "Content-Type" header
        }).then(response => response);

    };


    return (
        <UserContext.Provider value = {{loggedIn, setLoggedIn, userId, setUserId,userMedications,setUserMedications,fetchUserMedications,submitUpdatedMedication,postNewMedication}}>
            {children}
        </UserContext.Provider>
    )
}
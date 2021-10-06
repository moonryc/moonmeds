import {IMedicationFrontEnd} from "../../../Types/MedicationType";

export const fetchUserMedications = async () => {
    let url = '/medication/userMedications';
    // Default options are marked with *
    let response = await fetch(url, {
        method: 'GET', // or 'PUT'
        headers: {
            // 'Authorization': `Bearer ${userId}`
        },
    })
    return response.json()
}
export const fetchUserMedicationsDosages = async () => {
    let url = '/medication/userMedicationsDosages';
    // Default options are marked with *
    let response = await fetch(url, {
        method: 'GET', // or 'PUT'
        headers: {
            // 'Authorization': `Bearer ${userId}`
        },
    })

    return await response.json();
}
export const submitUpdatedMedication = async (medicationDetails: IMedicationFrontEnd) => {
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
    })
    return await response.json();
};
export const postNewMedication = async (medicationDetails: IMedicationFrontEnd) => {
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
    });
    return response.json();
};
export const putDeleteSelectedMedications = async (medicationFrontEndArray: IMedicationFrontEnd[]) => {
    let url = "/medication/deleteSelectedMedications"
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
        body: JSON.stringify({payload: medicationFrontEndArray}) // body data type must match "Content-Type" header
    });
    return response.json()
};
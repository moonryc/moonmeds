import {IMedicationSchema} from "./MedicationType";

export interface IBackendResponse {
    error:boolean,
    errorMessage:string,
    response:{}
}

export interface ILoginResponse {
    isLoggedIn:boolean
    jwtToken:string
}

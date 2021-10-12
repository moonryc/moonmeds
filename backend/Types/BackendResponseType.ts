import {IAlerts} from "./AlertMessageTypes";

/**
 * This is a standard backend response
 * @property error - type:boolean
 * @property alert - type:IAlerts
 * @property response - type:any
 */
export interface IBackendResponse {
    error:boolean,
    alert: IAlerts
    response:any
}


/**
 * This is the login response
 * @property isLoggedIn - type:boolean
 * @property jwtToken - type:string
 */
export interface ILoginResponse {
    isLoggedIn:boolean
    jwtToken:string
}

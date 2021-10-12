
//TODO COME BACK TO THIS

/**
 * @property _id - string
 * @property client_id - string,
 * @property connection - string,
 * @property email - string,
 * @property email_verified - boolean,
 * @property password - string,
 * @property request_language - string,
 * @property transaction - {},
 * @property id - string,
 * @property locale - string,
 * @property login_hint - string
 */
export interface IUserSchema {
    _id:string,
    client_id:string,
    connection:string,
    email:string,
    email_verified:boolean,
    password:string,
    request_language:string,
    transaction:{},
    id:string,
    locale:string,
    login_hint:string,
}
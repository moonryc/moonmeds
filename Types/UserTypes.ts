import {Document, Model, model, Types, Schema, Query} from "mongoose"

/**
 * User
 * @property userName - string
 * @property hash - string
 * @property emailAddress - string
 * @property people - array of strings
 */
export interface IUser {
    userName:string
    hash?:string,
    emailAddress:string,
    persons: IPersonNameAndColor[]
}

export interface IPersonNameAndColor {
    name:string
    color:string
}


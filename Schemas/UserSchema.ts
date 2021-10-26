//@ts-nocheck

import { ModelDefinition } from "./common";
import * as mongoose from 'mongoose';

import {IPersonNameAndColor, IUser} from "../Types/UserTypes";
import {model, Schema} from "mongoose";

//@ts-ignore
const PersonDefinition:ModelDefinition<IPersonNameAndColor>={
    //@ts-ignore
    name: {type:String,required:true},
    color:{type:String,required:true},

}

const UserDefinition:ModelDefinition<IUser>  = {
    userName:  { type: String, required: true },
    hash: {type: String, required: true},
    emailAddress: {type: String, required: true},
    persons: [{type: PersonDefinition, required: true}]

}


const UserSchema = new Schema(UserDefinition)

const UserModel = model<IUser & mongoose.Document>('User', UserSchema);
export default UserModel;




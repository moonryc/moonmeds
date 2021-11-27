//@ts-nocheck

import {ModelDefinition} from "./common";
import * as mongoose from 'mongoose';

import {IPersonNameAndColor, IUser} from "../Types/UserTypes";
import {model, Schema} from "mongoose";

//@ts-ignore
const PersonDefinition: ModelDefinition<IPersonNameAndColor> = {
    //@ts-ignore
    name: {type: String, required: true},
    color: {type: String, required: true},
    userId: {type: String, required: true},
}


const PersonSchema = new Schema(PersonDefinition)

const PersonModel = model<IUser & Document>(process.env.PERSONS_MODEL_NAME, PersonSchema);
export default PersonModel;
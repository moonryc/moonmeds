import {model, Schema} from "mongoose";

const ThirdPartyProviderSchema = new Schema({
    provider_name:{
        type:String,
        default:null
    },
    provider_id:{
        type:String,
        default:null
    },
    provider_data:{
        type:{},
        default:null
    }
})

const userSchema = new Schema(
    {
        email: String,
        password: String,
        persons: {type:[String], required:false},
        third_party_auth:[ThirdPartyProviderSchema],
        data:{
            type:Date,
            default:Date.now()
        }

    },
    {strict: false})

export const UserModel = model("users", userSchema)


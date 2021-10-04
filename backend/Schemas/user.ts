import {Schema,model} from "mongoose";

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
        third_party_auth:[ThirdPartyProviderSchema],
        data:{
            type:Date,
            default:Date.now()
        }

    },
    {strict: false})

module.exports = model("users", userSchema)
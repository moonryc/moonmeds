import UserModel from "../../Schemas/UserSchema";
import {IPersonNameAndColor} from "../../Types/UserTypes";

const getPersons = async (req:any) => {


    return await UserModel.findOne({_id:req.user._id})

    // UserModel.findOne({_id:req.user._id},(err:any,doc:any)=>{
    //     if(err){
    //         throw err
    //     }
    //
    //     return [...doc.persons]
    // })

}

export default getPersons
import UserModel from "../../Schemas/UserSchema";
import {IPersonNameAndColor} from "../../Types/UserTypes";

const getPersons = (req:any):any => {

    let personsArray;
    UserModel.findOne({_id:req.user._id},(err:any,doc:any)=>{
        if(err){
            throw err
        }else{
            personsArray = doc.persons
        }
    })
    return personsArray
}

export default getPersons
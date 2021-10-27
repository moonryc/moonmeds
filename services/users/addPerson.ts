import UserModel from "../../Schemas/UserSchema";
import {Request} from "express";


const AddPerson = async (req: any, res: any) => {

    let doesPersonExist =  await UserModel.find({_id: req.user._id, persons: {$elemMatch: {name: req.body.name}}})
    if(doesPersonExist.length>0){
            throw "Person Already Exists"
        }else{
            await UserModel.findByIdAndUpdate(req.user._id, {$push: {persons: {name: req.body.name, color: req.body.color}}}, (err, doc) => {
                if (err) {
                    throw err
                }else{
                    return
                }
            })
        }

}

export default AddPerson;
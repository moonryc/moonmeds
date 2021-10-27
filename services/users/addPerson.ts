import UserModel from "../../Schemas/UserSchema";
import {Request} from "express";


const AddPerson = async (req: any, res: any) => {

    await UserModel.find({
        _id: req.user._id, persons: {
            $elemMatch: {
                name: req.body.name
            }
        }
    },(err,doc)=>{
        if(doc.length>0){
            throw "Person Already Exists"
        }else{
            UserModel.findByIdAndUpdate(req.user._id, {
                $push: {
                    persons: {
                        name: req.body.name,
                        color: req.body.color
                    }
                }
            }, (err, doc) => {
                if (err) {
                    throw err
                }else{
                    return
                }
            })
        }
    }).catch(error=> {
        throw error
    })
}

export default AddPerson;
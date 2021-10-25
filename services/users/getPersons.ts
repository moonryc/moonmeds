import UserModel from "../../Schemas/UserSchema";

const getPersons = (req) => {

    let personsArray;
    UserModel.findOne({_id:req.user._id},(err,doc)=>{
        if(err){
            throw err
        }else{
            personsArray = doc.persons
        }
    })
    return personsArray
}

export default getPersons
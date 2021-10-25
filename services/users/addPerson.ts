import UserModel from "../../Schemas/UserSchema";


const AddPerson = (req,res) => {
    UserModel.findByIdAndUpdate(req.user._id,{$push:{persons:{name:req.body.name,color:req.body.color}}},(err,doc)=>{
        if(err){
            console.log(err)
            throw err
        }else{
            return res.status(200).json({error:false,msg:"success"})
        }
    })
}

export default AddPerson;
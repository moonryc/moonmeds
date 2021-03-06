import UserModel from "../../Schemas/UserSchema";


const RemovePerson = (req:any, res:any) => {

    UserModel.findByIdAndUpdate(req.user._id, {
        $pull: {
            persons: {
                name: req.body.name,
                color: req.body.color,
            }
        }
    }, (err, doc) => {
        if (err) {
            throw err
        }
    })
}

export default RemovePerson;
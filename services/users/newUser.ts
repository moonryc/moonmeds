import UserModel from "../../Schemas/UserSchema";
import issueJWT from "../../middleware/issueJwt";
import bcrypt = require("bcryptjs");

const newUser = async (req:any,res:any) => {

    const createUser = async () => {

        if (!req.body.userName) {
            throw "Username is blank"
        }
        if (!req.body.emailAddress) {
            throw "Email is blank"
        }
        if (!req.body.password) {
            throw "Password is blank"
        }

        //first check and see if the email already exists
        let isEmailInUse = await UserModel.find({userName: req.body.userName}).exec()
        //then check and see if the username already exists
        let isUserNameInUse = await UserModel.find({emailAddress: req.body.emailAddress}).exec()

        //Response
        if (isEmailInUse.length > 0 || isUserNameInUse.length > 0) {
            if (isEmailInUse.length > 0) {
                throw "Email address is already in use"
            }
            if (isUserNameInUse.length > 0) {
                throw "Username is already in use"
            }
        } else {

            const newUser = new UserModel({
                userName: req.body.userName,
                hash: bcrypt.hashSync(req.body.password, 10),
                emailAddress: req.body.emailAddress,
                persons: [{name: "Default", color: "grey"}]
            });


            newUser.save()
                .then((user: any) => {
                    return user
                })
                .catch((err: any | string): any => {
                    throw err
                })
        }
    }
    createUser().then()
}


export default newUser
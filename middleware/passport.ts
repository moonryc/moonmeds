import fs = require('fs');
import path = require("path");
import {Strategy,ExtractJwt} from 'passport-jwt'
const JwtStrategy = Strategy
import UserModel from "../Schemas/UserSchema";



const pathToKey = path.join('./Cryptography/id_rsa_pub.pem')
const PUB_KEY = fs.readFileSync(pathToKey,'utf8')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithm:['RS256']
}

const strategy = new JwtStrategy(options,(payload, done) => {
    UserModel.findOne({_id:payload.sub})
        .then((user)=>{
            if(user){
                return done(null,user)
            }else{
                return done(null,false)
            }
        }).catch(err=> {
        console.log(err)
        done(err, null)
    })
})



module.exports = (passport) =>{
    passport.use(strategy)
}
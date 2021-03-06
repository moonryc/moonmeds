//@ts-nocheck
import fs = require('fs');
import path = require("path");
import {Strategy, ExtractJwt} from 'passport-jwt'

const JwtStrategy = Strategy
import UserModel from "../Schemas/UserSchema";
import passport from 'passport'


const pathToKey = path.join('./cryptography/id_rsa_pub.pem')
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithm: ['RS256']
}

const strategy = new JwtStrategy(options, (payload, done) => {
    // console.log(payload)

    UserModel.findOne({_id: payload.sub})
        .then((user) => {
            if (user) {
                // console.log(user)
                return done(null, user)
            } else {
                return done(null, false)
            }
        }).catch(err => {
        console.log(err)
        done(err, null)
    })
})


passport.use(strategy)


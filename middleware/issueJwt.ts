import {IUser} from "../Types/UserTypes";

const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

try{
    const priv_key = '../cryptography/id_rsa_priv.pem'
    const pub_key = '../cryptography/id_rsa_pub.pem'


    if(fs.existsSync(priv_key) && fs.existsSync(pub_key)){
        //Do NOTHING
    }else{
        require('../cryptography/createKeyPair')
    }
}catch(e){
    console.log(e)
}

const pathToKey = path.join('./cryptography/id_rsa_priv.pem');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');

/**
 * @param {*} user - The users object.  We need this to set the JWT `sub` payload property to the MongoDB users ID
 */
const issueJWT =(user:any) =>{
    const _id = user._id;

    const expiresIn = '1d';

    const payload = {
        sub: _id,
        iat: Date.now()
    };

    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });

    return {
        token: "Bearer " + signedToken,
        expires: expiresIn
    }
}

export default issueJWT
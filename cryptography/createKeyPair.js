const crypto = require('crypto')
const fs = require('fs')


const genKeyPair = () => {
    //generates and object where keys are stored in properties 'privateKey' and 'publicKey'
    const keyPair = crypto.generateKeyPairSync('rsa',{
        modulusLength:4096, //bits-standard for RSA keys
        publicKeyEncoding:{
            type: 'pkcs1', // public key cryptography standards 1
            format:'pem' //most common formating choice
        },
        privateKeyEncoding:{
            type:'pkcs1', // public key cryptography standards 1
            format:'pem' //most common formating choice
        }
    })

    //create public key file
    fs.writeFileSync(__dirname + '/id_rsa_pub.pem', keyPair.publicKey)

    //create private key file
    fs.writeFileSync(__dirname + '/id_rsa_priv.pem', keyPair.privateKey)

}



genKeyPair()
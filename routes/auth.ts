import express = require('express');
import passport = require('passport');
import jwt = require('jsonwebtoken');
import {IBackendResponse, ILoginResponse} from "../Types/BackendResponseType";


const authRouter = express.Router();

//Login redirects user to the Auth0 screen
authRouter.get('/login', (req, res, next) => {
        next();
    },
    passport.authenticate('auth0', {
        scope: 'openid email profile',
    }),
    (req, res) => {
        res.redirect('/');
    });

//recives the user data from Auth0 and passes the credentials into the passport authenticate procedure to ensure the info from Auth0 is valid
authRouter.get('/callback', (req, res, next) => {
    let response: IBackendResponse = {
        error: false,
        alert: {message:"",severity:"success", numberOfOccurrences:1,notificationDate: new Date()},
        response: {}
    }

    passport.authenticate('auth0', (err, user) => {
        //if error
        if (err) {
            response.error = true;
            response.alert.severity = "error";
            if(typeof err == typeof ""){
                response.alert.message = err
            }else{
                response.alert.message = JSON.stringify( err)
            }

            return res.send(response);
        }
        //if user does not exist
        if (!user) {
            response.error = true
            response.alert.severity = "warning"
            response.alert.message = "User does not exist redirecting"
            res.send(response);
            return res.redirect('/login');
        }

        //if user exists
        const userReturnObject = {
            email: user.email,
            userId: user.user_id.replace("auth0|", ""),
        };


//req.session has the ! because it thinks that the it is either null or undefined
        req.session!.jwt = jwt.sign(userReturnObject as object, process.env.JWT_SECRET_KEY as string);

        return res.redirect('/');
    })(req, res, next);
});

authRouter.get('/logout', (req, res) => {
    req.session = null;
    const homeURL = encodeURIComponent('http://localhost:3000/');
    res.redirect(
        `https://${process.env.AUTH0_DOMAIN}/v2/logout?returnTo=${homeURL}&client_id=${process.env.AUTH0_CLIENT_ID}`
    );
});

//get a current jwtToken
authRouter.get('/current-session', (req, res) => {

    let response: ILoginResponse = {
        isLoggedIn: false,
        jwtToken: ""

    }

    passport.authenticate('jwt', {session: false}, (err, user) => {
        //if error or not signed in
        if (err || !user) {
            response.isLoggedIn = false
            // req.session = null
            return res.send(response);
        }
        //if signed in
        else{
            response.isLoggedIn = true;
            console.log(req.session!.jwt.toString())
            if(req.session!.jwt.toString()==null){
                response.isLoggedIn = false;
            }
            response.jwtToken = req.session!.jwt.toString()
            //returns the current jwt token
            return res.send(response);
        }
    })(req, res);
});


const jwtRequired = passport.authenticate('jwt', {session: false});

authRouter.post('/private-routetoken', jwtRequired, (req, res) => {
    return res.send({message: 'This is a private route'});
});

authRouter.post('/private-routenotoken', (req, res) => {
    return res.send({message: 'This is a private route'});
});


export default authRouter;
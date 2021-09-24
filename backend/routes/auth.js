const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();

//Login redirects user to the Auth0 screen
router.get('/login', (req, res, next) => {
        next();
    },
    passport.authenticate('auth0', {
            scope: 'openid email profile',
        }),
    (req, res) => {
        res.redirect('/');
    });

//recives the user data from Auth0 and passes the credentials into the passport authenticate procedure to ensure the info from Auth0 is valid
router.get('/callback', (req, res, next) => {
    passport.authenticate('auth0', (err, user) => {
        //if error
        if (err) {
            return next(err);
        }
        //if user does not exist
        if (!user) {
            return res.redirect('/login');
        }

        //if user exists
        const userReturnObject = {
            nickname: user.nickname,
        };
        req.session.jwt = jwt.sign(userReturnObject, process.env.JWT_SECRET_KEY);
        return res.redirect('/');
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.session = null;
    const homeURL = encodeURIComponent('http://localhost:3000/');
    res.redirect(
        `https://${process.env.AUTH0_DOMAIN}/v2/logout?returnTo=${homeURL}&client_id=${process.env.AUTH0_CLIENT_ID}`
    );
});

//TODO(Moon) understand the point of private routes
//region private routes
const jwtRequired = passport.authenticate('jwt', {session: false});

router.get('/private-route', jwtRequired, (req, res) => {
    return res.send('This is a private route');
});
//endregion

//checks to see if the user is logged in based on the jwt token from the client
router.get('/current-session', (req, res) => {
    passport.authenticate('jwt', {session: false}, (err, user) => {
        //if error or not signed in
        if (err || !user) {
            res.send(false);
        }
        //if signed in
        else {
            res.send(user);
        }
    })(req, res);
});

module.exports = router;
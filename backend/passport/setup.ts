import passport = require('passport');
import Auth0Strategy = require('passport-auth0');
import {Strategy} from 'passport-jwt';
// const JwtStrategy = require('passport-jwt').Strategy;
const JwtStrategy = Strategy;


const auth0Strategy = new Auth0Strategy(
    {
        domain: process.env.AUTH0_DOMAIN as string,
        clientID: process.env.AUTH0_CLIENT_ID as string,
        clientSecret: process.env.AUTH0_SECRET as string,
        callbackURL: process.env.AUTH0_CALLBACK_URL as string,
    },
    (accessToken, refreshToken, extraParams, profile, done) => {
        return done(null, profile);
    }
);

const jwtStrategy = new JwtStrategy(
    {
        jwtFromRequest: (req:any) => req.session.jwt,
        secretOrKey: process.env.JWT_SECRET_KEY,
    },
    (payload:any, done:any) => {
        // TODO(Moon): add additional jwt token verification
        return done(null, payload);
    }
);

passport.use(auth0Strategy)
passport.use(jwtStrategy)

export default passport
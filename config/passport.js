const passport = require('passport'),
     LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require("../database/models/user_model");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys')

////////////// JWT token ////////////////
var opts = {}
opts.jwtFromRequest = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies["jwt"];
    }
    return token
}
opts.secretOrKey = 'secretkey';


////////// OAuth Google ////////////////////
passport.use(new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: "auth/google/callback"
    },
    function (accessToken, refreshToken, profile, cb) {
        User.findOrCreate({
            googleId: profile.id
        }, function (err, user) {
            return cb(err, user);
        });
    }
));
//////////////////////////////////////////////

// attach the user to the session
passport.serializeUser(function (user, done) {
    done(null, user._id);
});

// fetch user from the session
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    async (email, password, done) => {
        let user = await User.findOne({
                email
            })
            .catch(done)
        if (!user) {
            return done(null, false);
        }
        if (!user.verifyPassword(password)) {
            return done(null, false);
        }
        return done(null, user);
    }
))
// uses json web token based function
passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    User.findById(jwt_payload.sub, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));
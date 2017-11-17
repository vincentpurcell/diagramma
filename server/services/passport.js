const passport = require('passport');
const User = require('../models/user');
const config = require('../config');

// Jwt Strategy
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Local Strategy
const LocalStrategy = require('passport-local').Strategy;
const localOptions = {
    usernameField: 'username'
};

const localLogin = new LocalStrategy(localOptions, (username, password, done) => {
    User.findOne({ username }, (err, user) => {
        if (err) { return done(err, false); }

        if (!user) {
            return done(null, false);
        }

        user.comparePassword(password, (err, isMatch) => {
            if (err) {
                return done(false);
            }
            if (!isMatch) {
                return done(null, false);
            }

            return done(null, user);
        });

    });
});

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.APPLICATION_SECRET
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    console.log(payload);
    User.findById(payload.sub, (err, user) => {
        if (err) {
            return done(false);
        }

        if (user) {
            return done(null, user);
        } else {
            return done(null, false)
        }
    });
});

passport.use('jwt', jwtLogin);
passport.use('local', localLogin);

// Authenticate against the User schema
// const User = require('./models/user');
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
// app.use(passport.initialize());
// app.use(passport.session());

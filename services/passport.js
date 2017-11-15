var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

// load up the user model
var Climber = require('../models/climber');
var config = require('../config.js'); // get db config file

module.exports = function(passport) {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session

    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromHeader('Authorization');
    opts.secretOrKey = config.secret;
    console.log(passport);
        console.log(ExtractJwt.fromHeader('Authorization'));

    passport.use('JWT', new JwtStrategy(opts, function(jwtPayload, done) {
        Climber.findOne({_id: jwtPayload}, function(err, climber) {
            console.log('dentro de jwtffffffff');

            if (err) {
                return done(err, false);
            }
            if (climber) {
                done(null, climber);
            } else {
                done(null, false);
            }
        });
    }));
};

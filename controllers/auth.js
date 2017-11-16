'use strinct';
var tokens = require('../services/tokens');
var User = require('../models/user');
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;

passport.use(new Strategy({
    clientID: '1225758720859460',
    clientSecret: '7cf58e6752fa60c33c7ef49925f16d5a',
    callbackURL: 'http://localhost:9000/api/auth/facebook/callback',
    profileFields: ['id', 'name','picture', 'emails', 'displayName', 'about', 'gender']

},
  function(accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
  }));


// Configure Passport authenticated session persistence.
passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

function signUp(req, res) {
    if (!req.body.name || !req.body.email || !req.body.password) {
        res.status(500).send({
            message: 'Fields name, mail and pasword required'
        });
    } else {
        var user = new User({
            'local.name': req.body.name,
            'local.email': req.body.email,
            'local.password': req.body.password
        });
        user.local.password = user.generateHash(user.local.password);
    }
    user.save((err) => {
        if (err) {
            return res.status(400).send({
                message: `Sign Up error ${err}`
            });
        }
        res.status(200).send({
            message: 'User added',
            accessToken: tokens.createAccessToken(user)
        });
    });
}

function signIn(req, res){
    User.findOne({ 'local.email': req.body.email}, (err, user) => {
        if (err) {
            return res.status(400).send({
                message: `Sign In error ${err}`
            });
        }
        if (!user) {
            return res.status(404).send({
                message: 'No user found'
            });
        }
        // Make sure the password is correct
        user.verifyPassword(req.body.password, user, function (err, isMatch) {
            if (err) {
                return res.status(400).send({
                    message: `Verify pasword ${err}`
                });
            }
            // Password did not match
            if (!isMatch) {
                return res.status(404).send({
                    message: 'Invalid Password'
                });
            }
            // Success
            res.status(200).send({
                message: 'Loggin correct',
                accessToken: tokens.createAccessToken(user)
            });
        });
    }).select('local.email +local.password');
}

function facebookSignIn(){
    return passport.authenticate('facebook', { scope: ['email']});
}

function facebookSignInCallback(){
    return passport.authenticate('facebook', { session: false }),
      function(req, res) {
          res.status(200).send(req.user);
      };
}






module.exports = {
    signUp,
    signIn,
    facebookSignIn,
    facebookSignInCallback
};

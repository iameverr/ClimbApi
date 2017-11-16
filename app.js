'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var auth = require('./services/auth');
var User = require('./models/user');

var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;


// Configure the Facebook strategy for use by Passport.
//
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(new Strategy({
    clientID: '1225758720859460',
    clientSecret: '7cf58e6752fa60c33c7ef49925f16d5a',
    callbackURL: 'http://localhost:9000/api/auth/facebook/callback',
    profileFields: ['id', 'name','picture', 'emails', 'displayName', 'about', 'gender']

},
  function(accessToken, refreshToken, profile, cb) {
    // In this example, the user's Facebook profile is supplied as the user
    // record.  In a production-quality application, the Facebook profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
      return cb(null, profile);
  }));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});



// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
//app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());


// Define routes.


//var passport = require('passport');
//require('./services/passport')(passport);
//app.use(express.session({ secret: 'secretkey' }));

// Configuración de Express
//app.use(passport.initialize());
//app.use(passport.session()); //
//app.use(passport.session());

/*
DB & SERVER CONECTION
*/

// Body parser

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

//charge routes
var ApiRoutes = require('./routes/api_routes');
var AuthRoutes = require('./routes/auth_routes');

app.get('/api/auth/facebook', passport.authenticate('facebook',{ scope: ['email']}));

app.get('/api/auth/facebook/callback', passport.authenticate('facebook', { session:false }),
  function(req, res) {
      res.status(200).send(req.user);
  });
app.use('/api/auth', AuthRoutes );
app.use('/api',auth.isAuth, ApiRoutes);



module.exports = app;

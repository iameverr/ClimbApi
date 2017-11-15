'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var auth = require('./services/auth');
var Climber = require('./models/climber');

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

app.get('/profile',auth.isAuth,
    function(req, res) {
        Climber.find({_id: req.climber.sub.id}, function(err, climber) {
            if (err) {
                res.send(err);
            }
            res.send(climber);
        });
    }
);//charge routes
var ApiRoutes = require('./routes/api_routes');
var AuthRoutes = require('./routes/auth_routes');

app.use('/api/auth', AuthRoutes );
app.use('/api',auth.isAuth, ApiRoutes);



module.exports = app;

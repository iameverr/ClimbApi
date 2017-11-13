'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

/*
DB & SERVER CONECTION
*/

// Body parser

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());


//charge routes

var ClimbRoutes = require('./routes/climb_routes');
app.use('/api', ClimbRoutes);

module.exports = app;

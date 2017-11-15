'use strict';

var express = require('express');
var AuthController = require('../controllers/auth');

var api = express.Router();


//LOCAL AUTH ENDPOINTS
api.post('/signup', AuthController.signUp);
api.post('/signin', AuthController.signIn);


module.exports = api;

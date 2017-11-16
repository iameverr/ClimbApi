'use strict';

var express = require('express');
var AuthController = require('../controllers/auth');

var api = express.Router();


//LOCAL AUTH ENDPOINTS
api.post('/signup', AuthController.signUp);
api.post('/signin', AuthController.signIn);
api.get('/facebook', AuthController.facebookSignIn);
api.get('/facebook/callback', AuthController.facebookSignInCallback);

module.exports = api;

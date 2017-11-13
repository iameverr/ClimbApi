'use strict';

var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../config.js');

function createAccessToken(climber){
    var payload = {
        sub: climber._id,
        iat: moment().unix(),
        exp: moment().add(15, 'minuts').unix()
    };

    return jwt.encode(payload, config.secret);
}

module.exports = {
    createAccessToken
};

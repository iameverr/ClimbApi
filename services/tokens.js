'use strict';

var jwt = require('jwt-simple');
var moment = require('moment');
var config = require('../config.js');

function createAccessToken(climber){
    var payload = {
        sub: { id: climber._id },
        iat: moment().unix(),
        exp: moment().add(1, 'hours').unix()
    };

    return 'JWT ' + jwt.encode(payload, config.secret);
}

module.exports = {
    createAccessToken
};

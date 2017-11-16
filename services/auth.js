var jwt = require('jwt-simple');
var config = require('../config.js');
var moment = require('moment');
var User = require('../models/user');

function isAuth(req, res, next){

    if (!req.headers.authorization){
        return res.status(403).send({message : 'Unauthorized: No token provided'});
    }

    var token = req.headers.authorization.split(' ')[1];
    try {
        var payload = jwt.decode(token, config.secret);
    } catch (e) {
        return res.status(401).send({message : 'Unauthorized: Invalid Token' + e});
    }
    if (payload.exp < moment().unix()) {
        return res.status(401).send({message : 'Unauthorized: Token expired'});
    }
    User.find({_id: payload.sub.id}, function(err, user) {
        if (err) {
            req.user = null;
        } else {
            req.user = user;
        }
        next();
    });

}

module.exports = {
    isAuth
};

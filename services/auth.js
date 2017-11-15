var jwt = require('jwt-simple');
var config = require('../config.js');
var moment = require('moment');
var Climber = require('../models/climber');

function isAuth(req, res, next){

    if (!req.headers.authorization){
        return res.status(403).send({message : 'Unauthorized: No token provided'});
    }

    var token = req.headers.authorization.split(' ')[1];
    console.log(token, config.secret);
    var payload = jwt.decode(token, config.secret);
    console.log(payload);
    if (payload.exp < moment().unix()) {
        return res.status(401).send({message : 'Unauthorized: Token expired'});
    }
    req.climber = payload;
    next();

}

function getClimber(payload){
    console.log(payload.sub.id);
    Climber.find({_id: payload.sub.id}, function(err, climber) {
        if (err) {
            return err;
        }
        return climber;
    });
}

module.exports = {
    isAuth
};

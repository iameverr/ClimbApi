'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var moment = require('moment');
//var Route = require('./route');

var ClimberSchema = Schema( {
    local: {
        email: {
            type: String,
            unique: true,
            lowercase: true,
            require: true
        },
        name: {
            type: String,
            require: true
        },
        password:{
            type: String,
            require: true,
            select: false
        }
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String,
        photo:[]
    },
    sigupDate: {
        type : Date,
        default: moment().unix()
    },
    lastLogin: Date
});

// checking if password is valid
ClimberSchema.methods.verifyPassword = function(password, climber, cb) {
    //var climber = this;
    bcrypt.compare(password, climber.local.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

// hashPassword
ClimberSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

module.exports = mongoose.model('Climber', ClimberSchema);

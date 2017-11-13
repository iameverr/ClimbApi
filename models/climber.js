'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var moment = require('moment');
//var Route = require('./route');

var ClimberSchema = Schema( {
    mail: {
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
        require: true
    },
    sigupDate: {
        type : Date,
        default: moment().unix()
    },
    lastLogin: Date
});

ClimberSchema.pre('save', function(next){
    var climber = this;
    if (!climber.isModified('password')) return next();
    bcrypt.genSalt(10, function(err, salt){
        if (err) return next(err);
        bcrypt.hash(climber.password, salt, null, function(err, hash){
            if (err) return next(err);
            climber.password = hash;
            next();
        });
    });
});

// checking if password is valid

ClimberSchema.methods.verifyPassword = function(password, climber, cb) {
    //var climber = this;
    bcrypt.compare(password, climber.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('Climber', ClimberSchema);

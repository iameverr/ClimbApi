'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ZoneSchema = Schema( {
    name: String,
    sectors:[
        { name: String }
    ],
    country: String,
    city: String

});

module.exports = mongoose.model('Zone', ZoneSchema);

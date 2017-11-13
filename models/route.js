'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var Zone = require('./zone');

var RouteSchema = Schema({
    name : String,
    grade : {
        type: String,
        enum : ['III', 'IV', 'V','V+',
            '6a','6a+','6b','6b+','6c','6c+',
            '7a','7a+','7b','7b+','7c','7c+',
            '8a','8a+','8b','8b+','8c','8c+',
            '9a','9a+', '9b','9b+']
    },
    zone : {type: Schema.Types.ObjectId, ref: 'Zone'}
});

module.exports = mongoose.model('Route', RouteSchema);

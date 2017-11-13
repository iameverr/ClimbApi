'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var Route = require('./route');

var ClimbSchema = Schema( {
    climber: {type: Schema.Types.ObjectId, ref: 'Climber'},
    route: {type: Schema.Types.ObjectId, ref: 'Route'},
    date: Date,
    desciption: String,
    status : {
        type : String,
        enum : ['Proyecto','Encadenada', 'Encadenada al flash', 'Encadenada a vista']
    },
    stars : {enum : ['0','1','2','3','4','5']}
});

module.exports = mongoose.model('Climb', ClimbSchema);

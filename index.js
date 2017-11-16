'use strict';
/*
VARS
*/
var config = require('./config'); // get our config file
var mongoose = require('mongoose');
var app = require('./app');

/*
DB & SERVER CONECTION
*/
mongoose.connect(config.db, {useMongoClient:true}, (error) => {
    if (error) {
        console.log('Mongo:' + error);
    }
    console.log('Mongo conection stablished...');
    app.listen(config.host_port, (error) => {
        if (error){
          console.log('Mongo:' + error);
        }
    console.log('Server running...');
    });
});

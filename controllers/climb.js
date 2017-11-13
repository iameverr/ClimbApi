'use strict';

var Climb = require('../models/climb');
var Route = require('../models/route');

function saveClimb(req, res) {
    var climb = new Climb();
    var params = req.body;
    var status = 500;
    var message = '';

    if (params.date && params.route) {
        climb.climber = params.climber;
        climb.route = params.route;
        climb.date = params.date;
        climb.attempt = params.attempt;
        climb.description = params.description;
        climb.stars = params.stars;
        climb.save((err) => {
            if (err) {
                status = 500;
                message = err;
            } else {
                status = 200;
                message = 'Climb added!';
            }
            res.status(status).send({
                message: message
            });
        });
    } else {
        res.status(500).send({
            message: 'Fields Climber & Climb required.'
        });
    }
}


function getAllClimbs(req, res) {
    Climb.find({}).populate({
        path: 'route',
        model: 'Route',
        populate: {
            path: 'zone',
            model: 'Zone'
        }
    }).exec(function (err, climbs){
        if (climbs.length > 0){
            res.status(200).send(climbs);
        } else {
            res.status(404).send({
                message: 'No climbs found'
            });
        }
    });
}

function getClimbById(req, res) {
    Climb.find({_id: req.params.id}, function(err, climb){
        if (climb){
            Route.populate(climb, {path: 'route'},function(err, climb){
                res.status(200).send(climb);
            });
        } else {
            res.status(401).send({
                message: 'Invalid Climb ID'
            });
        }
    });
}

function deleteClimbById(req, res) {
    Climb.find({_id: req.params.id}, function(err, climb){
        if (climb){
            Climb.remove({_id: req.params.id}, function(err){
                if (err){
                    res.status(500).send({
                        message: 'Climb cant be deleted'
                    });
                }
                res.status(200).send({
                    message: 'Climb deteled'
                });
            });
        } else {
            res.status(500).send({
                message: 'Invalid Climb ID'
            });
        }
    });
}

module.exports = {
    saveClimb,
    getAllClimbs,
    getClimbById,
    deleteClimbById
};

'use strict';

var Route = require('../models/route');
var Zone = require('../models/zone');

function saveRoute(req, res) {
    var route = new Route();
    var params = req.body;
    var status = 500;
    var message = '';

    if (params.name && params.grade) {
        route.name = params.name;
        route.grade = params.grade;
        route.zone = params.zone;
        route.save((err) => {
            if (err) {
                status = 500;
                message = err;
            } else {
                status = 200;
                message = 'route added!';
            }
            res.status(status).send({
                message: message
            });
        });
    }
}

function getAllRoutes(req, res) {
    Route.find({}, function(err, routes) {
        if (routes.length > 0){
            Zone.populate(routes, {path: 'zone'}, function(err, routes){
                res.status(200).send(routes);
            });
        } else {
            res.status(404).send({
                message: 'No routes found'
            });
        }
    });
}

function getRouteById(req, res) {
    Route.find({_id: req.params.id}, function(err, route){
        if (route){
            Zone.populate(route, {path: 'zone'},function(err, route){
                res.status(200).send(route);
            });
        } else {
            res.status(401).send({
                message: 'Invalid Route ID'
            });
        }
    });
}

function deleteRouteById(req, res) {
    Route.find({_id: req.params.id}, function(err, route){
        if (route){
            Route.remove({_id: req.params.id}, function(err){
                if (err){
                    res.status(500).send({
                        message: 'Route cant be deleted'
                    });
                }
                res.status(200).send({
                    message: 'Route deteled'
                });
            });
        } else {
            res.status(500).send({
                message: 'Invalid Route ID'
            });
        }
    });
}


module.exports = {
    saveRoute,
    getAllRoutes,
    getRouteById,
    deleteRouteById
};

'use strict';

var express = require('express');
var ClimbController = require('../controllers/climb');
var ZoneController = require('../controllers/zone');
var RouteController = require('../controllers/route');
var ClimberController = require('../controllers/climber');

var api = express.Router();

//CLIMB ENDPOINTS
api.post('/climb', ClimbController.saveClimb);
api.get('/climbs', ClimbController.getAllClimbs);
api.get('/climb/:id', ClimbController.getClimbById);
api.delete('/climb/:id', ClimbController.deleteClimbById);

//ROUTE ENDPOINTS
api.post('/route', RouteController.saveRoute);
api.get('/routes', RouteController.getAllRoutes);
api.get('/route/:id', RouteController.getRouteById);
api.delete('/route/:id', RouteController.deleteRouteById);

//ROUTE ENDPOINTS
api.post('/zone', ZoneController.saveZone);
api.get('/zones', ZoneController.getAllZones);
api.get('/zone/:id', ZoneController.getZoneById);
api.delete('/zone/:id', ZoneController.deleteZoneById);

//CLIMBER ENDPOINTS
api.post('/signup', ClimberController.signUp);
api.post('/signin', ClimberController.signIn);



module.exports = api;

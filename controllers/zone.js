'use strict';

var Zone = require('../models/zone');

function saveZone(req, res) {
    var zone = new Zone();
    var params = req.body;
    var status = 500;
    var message = '';

    if (params.name && params.country) {
        zone.name = params.name;
        zone.sectors = params.sectors;
        zone.country = params.country;
        zone.province = params.province;
        zone.city = params.city;
        zone.save((err) => {
            if (err) {

                status = 500;
                message = err;
            } else {

                status = 200;
                message = 'Zone added';
            }
            res.status(status).send({
                message: message
            });
        });
    }
}

function getAllZones(req, res) {
    Zone.find({}, function(err, zones) {
        if (zones.length > 0){
            res.status(200).send(zones);
        } else {
            res.status(404).send({
                message: 'No zones found'
            });
        }
    });
}

function getZoneById(req, res) {
    Zone.find({_id: req.params.id}, function(err, zone){
        if (zone){
            res.status(200).send(zone);
        } else {
            res.status(401).send({
                message: 'Invalid Zone ID'
            });
        }
    });
}

function deleteZoneById(req, res) {
    Zone.find({_id: req.params.id}, function(err, zone){
        if (zone){
            Zone.remove({_id: req.params.id}, function(err){
                if (err){
                    res.status(500).send({
                        message: 'Zone cant be deleted'
                    });
                }
                res.status(200).send({
                    message: 'Zone deteled'
                });
            });
        } else {
            res.status(500).send({
                message: 'Invalid Zone ID'
            });
        }
    });
}


module.exports = {
    saveZone,
    getAllZones,
    getZoneById,
    deleteZoneById
};

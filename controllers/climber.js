'use strinct';
var tokens = require('../services/tokens');
var Climber = require('../models/climber');

function signUp(req, res) {
    if (!req.body.name || !req.body.mail || !req.body.password) {
        res.status(500).send({
            message: 'Fields name, mail and pasword required'
        });
    } else {
        var climber = new Climber({
            name: req.body.name,
            mail: req.body.mail,
            password: req.body.password
        });
    }
    climber.save((err) => {
        if (err) {
            return res.status(400).send({
                message: `Sign Up error ${err}`
            });
        }
        res.status(200).send({
            message: 'Climber added',
            accessToken: tokens.createAccessToken(climber)
        });
    });
}

function signIn(req, res){
    Climber.findOne({ mail: req.body.mail}, (err, climber) => {
        if (err) {
            return res.status(400).send({
                message: `Sign In error ${err}`
            });
        }
        if (!climber) {
            return res.status(404).send({
                message: 'No climber found'
            });
        }
        // Make sure the password is correct

        climber.verifyPassword(req.body.password, climber, function (err, isMatch) {
            if (err) {
                return res.status(400).send({
                    message: `Verify pasword ${err}`
                });
            }
            // Password did not match
            if (!isMatch) {
                return res.status(404).send({
                    message: 'Invalid Password'
                });
            }
            // Success
            res.status(200).send({
                message: 'Loggin correct',
                accessToken: tokens.createAccessToken(climber)
            });
        });
    });
}


module.exports = {
    signUp,
    signIn
};

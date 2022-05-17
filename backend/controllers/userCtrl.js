const models = require('../models')
var jwtUtils = require('../utils/jwt.utils');
const bcrypt = require('bcrypt');
var asyncLib = require('async');


exports.signup = (req, res, next) => {
    asyncLib.waterfall([
        function (done) {
            models.User.findone({
                attributes: ['email'],
                where: { email: req.body.email }
            })
                .then(function (userfound) {
                    done(null, userfound);
                })
                .catch(function (err) {
                    return res.status(500).json({ message: "L'email utilisé correspond déja a un compte existant" })
                })
        }, function (userfound, done) {
            if (!userfound) {
                bcrypt.hash(req.body.password, 10, function (err, bcryptPassword) {
                    done(null, userfound, bcryptPassword);
                });
            } else {
                return res.status(409).json({ 'error': 'user already exist' })
            }
        }, function (bcryptPassword, done) {
            let newUser = models.User.create({
                email: req.body.email,
                password: bcryptPassword
            })
                .then(function (newUser) {
                    done(newUser)
                })
                .catch(function (err) {
                    return res.status(500).json({ 'error': 'cannot add user' });
                });
        }

    ], function (newUser) {
        if (newUser) {
            return res.status(201).json({
                'userId': newUser.id
            });
        } else {
            return res.status(500).json({ 'error': 'cannont add user' })
        }
    })
};

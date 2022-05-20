const models = require('../models')
var jwtUtils = require('../utils/jwt.utils');
const bcrypt = require('bcrypt');
var asyncLib = require('async');


exports.signup = (req, res) => {
    // Params
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var bio = req.body.bio;

    asyncLib.waterfall([
        function (done) {
            models.User.findOne({
                attributes: ['email'],
                where: { email: email }
            })
                .then(function (userFound) {
                    done(null, userFound);
                })
                .catch(function (err) {
                    return res.status(500).json({ 'error': 'unable to verify user' });
                });
        },
        function (userFound, done) {
            if (!userFound) {
                bcrypt.hash(password, 5, function (err, bcryptedPassword) {
                    done(null, userFound, bcryptedPassword);
                });
            } else {
                return res.status(409).json({ 'error': 'user already exist' });
            }
        },
        function (userFound, bcryptedPassword, done) {
            if (!userFound) { }
            var newUser = models.User.create({
                email: email,
                username: username,
                password: bcryptedPassword,
                bio: bio,
                isAdmin: 0
            })
                .then(function (newUser) {
                    done(newUser);
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
            return res.status(500).json({ 'error': 'cannot add user' });
        }
    });
};


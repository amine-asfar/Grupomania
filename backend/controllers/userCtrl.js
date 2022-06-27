const models = require('../models')
var jwtUtils = require('../utils/jwt.utils');
const bcrypt = require('bcrypt');
var asyncLib = require('async');




exports.signup = (req, res) => {
    // Params
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let bio = req.body.bio;

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
                    return res.status(500).json({ 'error': 'unable to verify user1' });
                });
        },
        function (userFound, done) {
            if (!userFound) {
                bcrypt.hash(password, 5, function (err, bcryptedPassword) {
                    done(null, userFound, bcryptedPassword);
                }
                );
            } else {
                return res.status(409).json({ 'error': 'user already exist' });
            }
        },
        function (userFound, bcryptedPassword, done) {

            let newUser = models.User.create({
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
    ], function (newUser, userFound) {
        if (newUser && !userFound) {
            return res.status(201).json({
                'userId': newUser.id
            });
        } else {
            return res.status(500).json({ 'error': 'cannot add user' });
        }
    });

};

exports.login = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (email == null || password == null) {
        return res.status(400).json({ 'error': 'missing parameters' });
    }
    asyncLib.waterfall([
        function (done) {
            models.User.findOne({
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
            if (userFound) {
                bcrypt.compare(password, userFound.password, function (errBycrypt, resBycrypt) {
                    done(null, userFound, resBycrypt);
                });
            } else {
                return res.status(404).json({ 'error': 'user not exist in DB' });
            }
        },
        function (userFound, resBycrypt, done) {
            if (resBycrypt) {
                done(userFound);
            } else {
                return res.status(403).json({ 'error': 'invalid password' });
            }
        }
    ], function (userFound) {
        if (userFound) {
            return res.status(201).json({
                'userId': userFound.id,
                'token': jwtUtils.generateTokenForUser(userFound)
            });
        } else {
            return res.status(500).json({ 'error': 'cannot log on user' });
        }
    });


};

exports.getUserProfile = (req, res) => {
    let id = jwtUtils.getUserId(req.headers.authorization)
    models.User.findOne({
        attributes: ['id', 'email', 'username', 'bio', 'isAdmin'],
        where: { id: id }
    })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(500).json(error))
};

exports.updateProfile = (req, res) => {
    // Getting auth header
    let headerAuth = req.headers['authorization'];
    let userId = jwtUtils.getUserId(headerAuth);

    // Params
    let email = req.body.email;
    let username = req.body.username;
    let bio = req.body.bio;

    asyncLib.waterfall([
        function (done) {
            models.User.findOne({
                attributes: ['id', 'bio'],
                where: { id: userId }
            }).then(function (userFound) {
                done(null, userFound);
            })
                .catch(function (err) {
                    return res.status(500).json({ 'error': 'unable to verify user' });
                });
        },
        function (userFound, done) {
            if (userFound) {
                userFound.update({
                    bio: (bio ? bio : userFound.bio)
                }).then(function () {
                    done(userFound);
                }).catch(function (err) {
                    res.status(500).json({ 'error': 'cannot update user' });
                });
            } else {
                res.status(404).json({ 'error': 'user not found' });
            }
        },
    ], function (userFound) {
        if (userFound) {
            return res.status(201).json(userFound);
        } else {
            return res.status(500).json({ 'error': 'cannot update user profile' });
        }
    });
}

exports.deleteProfile = (req, res) => {
    //récupération de l'id de l'user
    let userId = jwtUtils.getUserId(req.headers.authorization);
    if (userId != null) {
        //Recherche sécurité si user existe bien
        models.User.findOne({
            where: { id: userId }
        })
            .then(user => {
                if (user != null) {
                    //Delete de tous les posts de l'user même s'il y en a pas
                    models.Post
                        .destroy({
                            where: { userId: user.id }
                        })
                        .then(() => {
                            console.log('Tous les posts de cet user ont été supprimé');
                            //Suppression de l'utilisateur
                            models.User
                                .destroy({
                                    where: { id: user.id }
                                })
                                .then(() => res.end())
                                .catch(err => console.log(err))
                        })
                        .catch(err => res.status(500).json(err))
                }
                else {
                    res.status(401).json({ error: 'Cet user n\'existe pas' })
                }
            })
    } else {
        res.status(500).json({ error: 'Impossible de supprimer ce compte, contacter un administrateur' })
    }
};
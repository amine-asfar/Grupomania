const models = require('../models');
let asyncLib = require('async')
let jwtUtils = require('../utils/jwt.utils');

exports.creatPost = (req, res) => {
    // Getting auth header
    var headerAuth = req.headers['authorization'];
    var userId = jwtUtils.getUserId(headerAuth);

    // Params
    var title = req.body.title;
    var content = req.body.content;

    if (title == null || content == null) {
        return res.status(400).json({ 'error': 'missing parameters' });
    }

    asyncLib.waterfall([
        function (done) {
            models.User.findOne({
                where: { id: userId }
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
                models.Post.create({
                    title: title,
                    content: content,
                    //likes: 0,
                    UserId: userFound.id
                })
                    .then(function (newMessage) {
                        done(newMessage);
                    });
            } else {
                res.status(404).json({ 'error': 'user not found' });
            }
        },
    ], function (newMessage) {
        if (newMessage) {
            return res.status(201).json(newMessage);
        } else {
            return res.status(500).json({ 'error': 'cannot post message' });
        }
    });
};

exports.getAllPosts = (req, res, next) => {
    models.Post.findAll({ order: [["createdAt", "DESC"]] })
        .then((posts) => res.status(200).json(posts))
        .catch((error) => res.status(400).json({ error }));
};

// exports.getOnePost = (req, res, next) => {
//     Post.findOne({ where: { id: req.params.id } })
//         .then((post) => res.status(200).json(post))
//         .catch((error) => res.status(400).json({ error }));
// };



// exports.listMsg = (req, res) => {
//     models.Post.findAll({
//         include: [{
//             model: models.User,
//             attributes: ['username']
//         }],
//         order: [['createdAt', 'DESC']]
//     })
//         .then(posts => {
//             if (posts.length > null) {
//                 res.status(200).json(posts)
//             } else {
//                 res.status(404).json({ error: 'Pas de post à afficher' })
//             }
//         })
//         .catch(err => res.status(500).json(err))
// }
const post = require('../models/post');
const fs=require('fs');
const Post = require('../models/post');

exports.creatPost = (req, res, next) => {
    
    const postObject =req.body;
    console.log(postObject)
    delete postObject._id;
    console.log(postObject)
    const Post = new post({
        ...postObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    
        likes: 0,
        usersLiked: [],
       

    });
   

    Post.save()
        .then(() => res.status(201).json({ message: 'post enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};

exports.modifyPost = (req, res, next) => {

    const postObject = req.file ?

        {

            ...JSON.parse(req.body.post),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'post modifié !' }))
        .catch(error => res.status(400).json({ error }));
};


exports.deletePost = (req, res, next) => {
    post.findOne({ _id: req.params.id })
        .then(post => {
            const filename = post.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                post.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'post supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getOnePost = (req, res, next) => {
    post.findOne({ _id: req.params.id })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(404).json({ error }));
}
exports.getAllPost = (req, res, next) => {
    post.find()
        .then(post => res.status(200).json(post))
        .catch(error => res.status(400).json({ error }));
}

exports.likesPost = (req, res, next) => {
    const userId = req.body.userId;
    console.log(userId)
    const like = req.body.like;
    console.log('like')
    console.log(like)
    const postId = req.params.id;
    console.log(postId)
    post.findOne({ _id: postId })
        .then(post => {
            // nouvelles valeurs à modifier
            const newValues = {
                usersLiked: post.usersLiked,
                likes: 0,
            }
            console.log(newValues)

            switch (like) {
                case 1:
                    newValues.usersLiked.push(userId);
                    console.log(newValues)
                    break;
                case 0:
                    if (newValues.usersLiked.includes(userId)) {
                        // si on annule le like
                        const index = newValues.usersLiked.indexOf(userId);
                        newValues.usersLiked.splice(index, 1);
                    };
                    break;
            };
            // nombre likes 
            newValues.likes = newValues.usersLiked.length;
            

            post.updateOne({ _id: postId }, newValues)
                .then(() => res.status(200).json({ message: 'Post update !' }))
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error }));
}
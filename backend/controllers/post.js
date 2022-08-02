const fs = require("fs");
const Post = require("../models/post");

exports.creatPost = async (req, res) => {
  
  const post = req.body;
  
  
  const newPost = new Post({
    ...post,
    userId: req.userId,
    createdAt:req.body.createdAt
  });
 
  try {
    await newPost.save();
    console.log("post Created Succes");
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

exports.modifyPost = (req, res, next) => {
  const { message, selectedFile, postId } = req.body;
  Post.updateOne({ _id: postId }, { message, selectedFile })
    .then(() => res.status(200).json({ message: "post modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deletePost = (req, res, next) => {
  Post.deleteOne({ _id: req.params.id })
    .then((post) => {
      res.status(200).json({ message: "success" });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getOnePost = (req, res, next) => {
  post
    .findOne({ _id: req.params.id })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error }));
};
exports.getAllPost = async (req, res, next) => {
  const offset = req.params.offset;
  try {
    const getPosts = await Post.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .skip(offset);
    res.status(200).json(getPosts);
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.likesPost = async (req, res, next) => {
  const userId = req.userId;

  const postId = req.params.id;

  try {
    const targetPost = await Post.findById(postId);
    if (targetPost.usersLiked.includes(userId)) {
      const removeLike = await targetPost.updateOne({
        $pull: { usersLiked: userId },
      });
    } else {
      const addLike = await targetPost.updateOne({
        $push: { usersLiked: userId },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

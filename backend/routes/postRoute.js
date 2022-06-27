const express = require('express');
const router = express.Router();
const posts = require('../controllers/postCtrl');


//create post
router.post('/newpost', posts.creatPost);

//Get All posts

router.get('/posts', posts.getAllPosts);



module.exports = router;
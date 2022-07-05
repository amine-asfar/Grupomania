const express = require('express');
const router = express.Router();
const PostCtrl = require('../controllers/post');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');



router.get('/', auth, PostCtrl.getAllPost);
router.post('/', auth, multer, PostCtrl.creatPost);
router.get('/:id', auth, PostCtrl.getOnePost);
router.put('/:id', auth, multer, PostCtrl.modifyPost);
router.delete('/:id', auth, PostCtrl.deletePost);
router.post('/:id/like', auth, PostCtrl.likesPost)
module.exports = router;

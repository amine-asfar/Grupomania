const express = require("express");
const router = express.Router();
const PostCtrl = require("../controllers/post");

const auth = require("../middleware/auth");

router.get("/:offset", auth, PostCtrl.getAllPost);
router.post("/", auth, PostCtrl.creatPost);
router.get("id/:id", auth, PostCtrl.getOnePost);
router.patch("/:id", auth, PostCtrl.modifyPost);
router.delete("/:id", auth, PostCtrl.deletePost);
router.patch("/:id/like", auth, PostCtrl.likesPost);
module.exports = router;

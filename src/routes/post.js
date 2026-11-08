const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/auth_middleware")

const postController = require("../controllers/post_controller");

router.post("/", verifyToken, postController.createPost);
router.get("/", verifyToken, postController.getPosts);
router.put("/:id", verifyToken, postController.updatePost);
router.delete("/:id", verifyToken, postController.deletePost);
router.patch("/:id/publish", verifyToken, postController.publishPost);
router.get("/my-drafts", verifyToken, postController.getMyDrafts);
router.get("/my-publishes", verifyToken, postController.getMyPublishes);
module.exports = router; 
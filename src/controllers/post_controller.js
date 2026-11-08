const postService = require("../services/post_service");

const createPost = async (req, res) => {
    try {
        const post = await postService.createPostSchema(req.user, req.body);
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getPosts = async (req, res) => {
    const post = await postService.getPostsSchema(req.user);
    res.json(post);
};

const updatePost = async (req, res) => {
    const post = await postService.updatePostSchema(
        req.user,
        Number(req.params.id),
        req.body
    );
    res.json(post);
};

const deletePost = async (req, res) => {
    await postService.deletePostSchema(req.user, Number(req.params.id));
    res.json({ message: "Deleted" });
};

const singlePost = async (req, res) => {
    const post = await postService.singlePostSchema(req.user, Number(req.params.id));
    res.json(post);
}

const publishPost = async (req, res) => {
    const post = await postService.updatePostSchema(
        req.user,
        Number(req.params.id),
        { status: "PUBLISHED" }
    );

    res.json(post);
};
const getMyDrafts = async (req, res) => {
    const drafts = await postService.getMyDraftPosts(req.user);
    res.json(drafts);
};

const getMyPublishes = async (req, res) => {
    const publishes = await postService.getMyPublishPosts(req.user);
    res.json(publishes);
};
module.exports = { createPost, getPosts, updatePost, deletePost, singlePost, publishPost, getMyDrafts, getMyPublishes };
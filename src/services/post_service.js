const prisma = require("../config/db")
const { createPost, updatePost } = require("../validations/post_validator")
const createPostSchema = async (user, data) => {

    try {
        const { error } = createPost.validate(data)
    }
    catch (err) {
        throw new Error(err.message)
    }
    return await prisma.note.create({
        data: {
            title: data.title,
            content: data.content,
            userId: user.id
        }
    })
}

const getPostsSchema = async (user) => {
    if (user.role === "ADMIN") {
        return await prisma.note.findMany()
    }

    return await prisma.note.findMany({
        where: { userId: user.id }
    })

}

const updatePostSchema = async (user, id, data) => {
    try {
        const { error } = updatePost.validate(data)
    }
    catch (err) {
        throw new Error(err.message)
    }
    const post = await prisma.note.findUnique({
        where: { id }
    })

    if (!post) {
        throw new Error("Post not found")
    }

    if (post.userId !== user.id && user.role !== "ADMIN") {
        throw new Error("Unauthorized")
    }

    return await prisma.note.update({
        where: { id },
        data
    })
}
const singlePostSchema = async (user, id) => {
    const post = await prisma.note.findUnique({
        where: { id }
    })
    if (!post) {
        throw new Error("Post not found")
    }
    if (post.userId !== user.id && user.role !== "ADMIN") {
        throw new Error("Unauthorized")
    }
    return post
}
const deletePostSchema = async (user, id) => {
    const post = await prisma.note.findUnique({
        where: { id }
    })

    if (!post) {
        throw new Error("Post not found")
    }

    if (post.userId !== user.id && user.role !== "ADMIN") {
        throw new Error("Unauthorized")
    }

    return await prisma.note.delete({
        where: { id }
    })
}
const getMyDraftPosts = async (user) => {
    return await prisma.note.findMany({
        where: {
            userId: user.id,
            status: "DRAFT"
        }
    });
};
const getMyPublishPosts = async (user) => {
    return await prisma.note.findMany({
        where: {
            userId: user.id,
            status: "PUBLISHED"
        }
    });
};

module.exports = { createPostSchema, getPostsSchema, updatePostSchema, deletePostSchema, singlePostSchema, getMyDraftPosts, getMyPublishPosts }
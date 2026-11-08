const joi = require("joi")

const createPost = joi.object({
    title: joi.string().required().min(5).max(30),
    description: joi.string().required().min(10).max(200)
})

const updatePost = joi.object({
    title: joi.string().min(5).max(30),
    description: joi.string().min(10).max(200)
})



module.exports = { createPost, updatePost }
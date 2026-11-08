const joi = require("joi")

const register = joi.object({
    name: joi.string().required().min(3).max(30),
    email: joi.string().email().required(),
    password: joi.string().required().min(6).max(20)
})

module.exports = { register }

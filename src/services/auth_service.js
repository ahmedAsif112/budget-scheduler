const prisma = require("../config/db")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { register } = require("../validations/auth_validation")
const registerUser = async (userData) => {
    try {
        const { error } = register.validate(userData)
    }
    catch (err) {
        throw new Error(err.message)
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10)
    const user = await prisma.user.create({
        data: {
            name: userData.name,
            email: userData.email,
            password: hashedPassword,
            role: userData.role
        }
    })
    return user
}

const loginUser = async (userData) => {
    const user = await prisma.user.findUnique({
        where: { email: userData.email }
    })
    if (!user) {
        throw new Error("User not found")
    }

    const isPasswordValid = await bcrypt.compare(userData.password, user.password)
    if (!isPasswordValid) {
        throw new Error("Invalid password")
    }
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" })
    return { user, token }
}

module.exports = { registerUser, loginUser }
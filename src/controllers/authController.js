const authService = require("../services/auth_service")

const register = async (req, res) => {
    try {
        const user = await authService.registerUser(req.body);
        res.json(user)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const login = async (req, res) => {
    try {
        const user = await authService.loginUser(req.body);
        res.json(user)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}


module.exports = { register, login }
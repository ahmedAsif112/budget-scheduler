const jwt = require("jsonwebtoken")



const verifyToken = (req, res, next) => {
    const header = req.headers.authorization;

    if (!header) {
        return res.status(401).json({ message: "token not found" });
    }

    const token = header.startsWith("Bearer ")
        ? header.split(" ")[1]
        : header;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.log("JWT ERROR:", err.message); // 🔍 debug
        return res.status(401).json({ message: "invalid token" });
    }
};


const authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ message: "Access denied" });
        }

        next();
    };
};

module.exports = { verifyToken, authorizeRole };
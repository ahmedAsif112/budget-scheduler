const express = require("express")
require("dotenv").config();
const app = express()
const cors = require("cors");
const authRoutes = require("./src/routes/auth")
const postRoutes = require("./src/routes/post")
app.use(cors({
    origin: "http://localhost:3000"
}));
app.use(express.json())
app.use("/api/auth", authRoutes)
app.use("/api/post", postRoutes)



app.listen(3001, () => {
    console.log("server is running on port 3001")
})
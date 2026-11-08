const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")

router.post("/register", authController.register)
router.post("/login", authController.login)
router.post("/login", authController.login) //exm one
router.post("/login", authController.login) //exm 2
router.post("/login", authController.login) //arij work
router.post("/login", authController.login) //arij work

module.exports = router 
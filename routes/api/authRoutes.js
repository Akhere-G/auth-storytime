const express = require("express");
const router = express.Router();
const auth = require("../../middleware/authMiddleware");
const authController = require("../../controllers/authController");
//@route  POST api/auth
//desc    Auth user
//access  Public
router.post("/", authController.login);

//@route  GET api/auth/user
//desc    GETAuth user
//access  Private
router.get("/user", auth, authController.authUser);

module.exports = router;

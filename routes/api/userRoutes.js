const express = require("express");
const router = express.Router();
const auth = require("../../middleware/authMiddleware");

const userController = require("../../controllers/userController");

//@route  GET api/users
//desc    Get All Users
//access  Public
router.get("/", userController.getUsers);

//@route  GET api/users/id
//desc    Get a User
//access  Public
router.get("/:id", userController.getUser);

//@route  POST api/users
//desc    Create an User
//access  Public
router.post("/", userController.createUser);

//@route  PATCH api/users
//desc    Update an User
//access  Public
router.patch("/:id", auth, userController.updateUser);

//@route  Delete api/users
//desc    Delete an User
//access  Public
router.delete("/:id", auth, userController.deleteUser);
module.exports = router;

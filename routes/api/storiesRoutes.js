const express = require("express");
const router = express.Router();
const storyController = require("../../controllers/storyController");
const auth = require("../../middleware/authMiddleware");

//@route  GET api/stories
//desc    Get All Stories
//access  Public
router.get("/", storyController.getStories);

//@route  POST api/stories
//desc    create an Story
//access  Private
router.post("/", auth, storyController.createStory);

//@route  PATCH api/stories
//desc    create an Story
//access  Private
router.patch("/:id", auth, storyController.updateStory);

//@route  delete api/stories
//desc    delete an Story
//access  Private
router.delete("/:id", auth, storyController.deleteStory);
module.exports = router;

const Story = require("../models/StoryModel");
const User = require("../models/UserModel");
const mongoose = require("mongoose");

module.exports.getStories = async (req, res) => {
  try {
    const stories = await Story.find().sort({ date: -1 });
    res.status(200).json(stories);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.createStory = async (req, res) => {
  try {
    const { title, message, tags, userId } = req.body;

    const newStory = new Story({
      title,
      message,
      tags,
      userId,
    });

    const ownerUser = await User.findById(userId);
    if (!ownerUser) {
      return res
        .status(404)
        .send("Story not made as no user with id " + userId);
    }

    const json = await newStory.save();
    res.status(201).json({ success: true, storyAdded: json });
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.updateStory = async (req, res) => {
  try {
    const { title, message, tags, userId } = req.body;

    const id = req.params.id;

    const newStory = {
      title,
      message,
      tags,
      userId,
    };

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("No story with id " + id);
    }
    const story = await Story.findByIdAndUpdate(id, newStory);

    res.status(201).json({ success: true, storyUpdated: story });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
};

module.exports.deleteStory = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("No story with id " + id);
    }
    const story = await Story.findByIdAndDelete(id);
    res.status(200).json({ success: true, storyDeleted: story });
  } catch (err) {
    res.status(400).json(err);
  }
};

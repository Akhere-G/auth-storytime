const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StorySchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

const Story =
  mongoose.models.storySchema || mongoose.model("Story", StorySchema);

module.exports = Story;

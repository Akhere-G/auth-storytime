const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const storyRoutes = require("./routes/api/storiesRoutes");
const userRoutes = require("./routes/api/userRoutes");
const authRoutes = require("./routes/api/authRoutes");
require("dotenv").config();

const app = express();

//database config
const db = process.env.MONGO_URI;
//connect to Mongo

app.use(express.json());
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

// Use Routes
app.use("/api/stories", storyRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

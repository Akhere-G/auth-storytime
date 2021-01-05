const User = require("../models/UserModel");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("email-validator");

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id).select("-password -email");
    if (!user) {
      return res.status(404).send("No user with id " + userId);
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
};

module.exports.createUser = async (req, res) => {
  try {
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;

    if (!name) {
      return res.status(400).json({ msg: "Enter your name please" });
    }

    if (!password) {
      return res.status(400).json({ msg: "Enter your password please" });
    }
    if (!email) {
      return res.status(400).json({ msg: "Enter your email please" });
    }

    if (!validator.validate(email)) {
      return res.status(400).json({ msg: "Email not valid" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    //Create salt and hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          throw err;
        }

        newUser.password = hash;
        newUser
          .save()
          .then(user => {
            jwt.sign(
              { id: user._id },
              process.env.JWT_SECRET,
              { expiresIn: 3600 },
              (err, token) => {
                if (err) {
                  throw err;
                }
                return res.json({
                  token,
                  user: {
                    id: user._id,
                    name,
                    email,
                  },
                });
              }
            );
          })
          .catch(err => res.status(400).json(err));
      });
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;

    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("No user with id " + id);
    }

    const user = await User.findById(id);
    user.name = name;
    user.email = email;
    user.password = password;

    const json = await user.save();
    res.status(201).json({ success: true, userUpdated: json });
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("No user with id " + id);
    }
    const user = await User.findById(id);
    const json = await user.remove();
    res.status(200).json({ success: true, userDeleted: json });
  } catch (err) {
    res.status(400).json(err);
  }
};

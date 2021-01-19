const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("email-validator");

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //simple validation
    if (!password) {
      return res.status(400).json({ msg: "Enter your password please" });
    }
    if (!email) {
      return res.status(400).json({ msg: "Enter your email please" });
    }

    if (!validator.validate(email)) {
      return res.status(400).json({ msg: "Email not valid" });
    }

    //check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    //Validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

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
              email,
            },
          });
        }
      );
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports.authUser = async (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));
};

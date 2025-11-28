const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (user)
      return res.status(400).json({
        message: "User already registered",
      });
    const { firstName, lastName, email, password } = req.body;
    const has_password = await bcrypt.hash(password, 10);
    const _user = new User({
      firstName,
      lastName,
      email,
      has_password,
      username: shortid.generate(),
    });

    _user.save((error, data) => {
      if (error)
        return res.status(400).json({
          message: "Something went wrong",
        });
      if (data)
        return res.status(201).json({
          message: "User created successfully",
        });
    });
  });
};
exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      if (user.authenticate(req.body.password) && user.role === "user") {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        const { firstName, lastName, email, role, _id } = user;
        const fullName = firstName + " " + lastName;
        res.status(200).json({
          token,
          user: {
            firstName,
            lastName,
            email,
            role,
            fullName,
            _id,
          },
        });
      } else {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  });
};

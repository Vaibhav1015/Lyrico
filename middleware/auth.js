const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");
// const jwt = require("jsonwebtoken");

//Admin Middleware

exports.isAdmin = async (req, res, next) => {
  try {
    const _id = req.params.userId;
    req.user = await User.findOne({ _id: _id });
    if (req.user.role === "user") {
      res.status(400).send({ success: false, msg: "Access denied" });
    } else {
      next();
    }
  } catch (error) {
    res.send(error.message);
  }
};

// For Bcrypt password
exports.securePassword = async (password) => {
  try {
    const passwordHash = await bcryptjs.hash(password, 10);
    return passwordHash;
  } catch (error) {
    res.send(error.message);
  }
};

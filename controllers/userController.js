const User = require("../models/userModel");
const { securePassword } = require("../middleware/auth");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Register User

const registerUser = async (req, res) => {
  try {
    const sPassword = await securePassword(req.body.password);

    const user = new User({
      email: req.body.email,
      phone: req.body.phone,
      password: sPassword,
      role: req.body.role,
      fullName: req.body.fullName,
    });
    const userEmail = await User.findOne({ email: req.body.email });
    const userPhone = await User.findOne({ phone: req.body.phone });

    if (userEmail) {
      res.status(200).send({ success: false, msg: "This email already exits" });
    } else if (userPhone) {
      res
        .status(200)
        .send({ success: false, msg: "This Phone number already exits" });
    } else {
      const user_data = await user.save();

      res.status(200).send({ success: true, userData: user_data });
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: "Something went wrong..!!!" });
  }
};

//Login method

const userLogin = async (req, res) => {
  try {
    const { userCred } = req.body;
    const password = req.body.password;

    const userData = await User.findOne({
      $or: [{ email: userCred }, { phone: userCred }],
    });

    if (userData) {
      const passwordMatch = await bcryptjs.compare(password, userData.password);

      if (passwordMatch) {
        const tokenData = await jwt.sign({ userData }, "JWT_SECRET", {
          expiresIn: "1h",
        });
        const userResult = {
          _id: userData._id,
          email: userData.email,
          fullName: userData.fullName,
          password: userData.password,
          role: userData.role,
          token: tokenData,
        };
        const response = {
          success: true,
          msg: "User Details",
          data: userResult,
        };
        res.status(200).send(response);
      } else {
        res
          .status(200)
          .send({ success: false, msg: "Login details are incorrect" });
      }
    } else {
      res
        .status(200)
        .send({ success: false, msg: "Login details are incorrect" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//Get UserDetails

const getUser = async (req, res) => {
  try {
    const _id = req.params.userId;
    const userData = await User.findOne({ _id: _id });

    if (userData) {
      const response = {
        success: true,
        msg: "User Details",
        data: userData,
      };
      res.status(200).send(response);
    } else {
      res.status(200).send({ success: false, msg: "ID details are incorrect" });
    }
  } catch (error) {
    res.send(error.message);
  }
};

//Find all users details

const getAllUser = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const pageSize = parseInt(req.query.pageSize);
    const skip = (page - 1) * pageSize;

    const getList = () => User.find().sort({ createdAt: -1 });
    const total = await getList().count();
    const list = await getList().skip(skip).limit(pageSize);

    if (list) {
      res.status(200).send({
        list,
        total,
        skip,
        pageSize,
      });
    } else {
      res.status(200).send({ success: false, msg: "ID details are incorrect" });
    }
  } catch (error) {
    res.send(error.message);
  }
};

//Update user details

const updateUser = async (req, res) => {
  try {
    const _id = req.params.userId;
    const userData = await User.findOneAndUpdate(
      { _id: _id },
      {
        $set: req.body,
      },
      { new: true }
    );
    if (userData) {
      const response = {
        success: true,
        msg: "User Details updated",
        data: userData,
      };
      res.status(200).send(response);
    } else {
      res.status(200).send({ success: false, msg: "ID details are incorrect" });
    }
  } catch (error) {
    res.send(error.message);
  }
};

//Delete User data

const deleteUser = async (req, res) => {
  try {
    const _id = req.params.userId;
    const userData = await User.findOneAndDelete({ _id: _id });

    if (userData) {
      const response = {
        success: true,
        msg: "User Details Deleted",
        data: userData,
      };
      res.status(200).send(response);
    } else {
      res.status(200).send({ success: false, msg: "ID details are incorrect" });
    }
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = {
  registerUser,
  userLogin,
  getUser,
  getAllUser,
  deleteUser,
  updateUser,
};

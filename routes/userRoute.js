const express = require("express");

const userRoute = express();

const {
  registerUser,
  userLogin,
  getUser,
  getAllUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController");

userRoute.post("/register", registerUser);
userRoute.post("/login", userLogin);
userRoute.get("/get/:userId", getUser);
userRoute.get("/getall", getAllUser);
userRoute.delete("/delete-user/:userId", deleteUser);
userRoute.put("/update-user/:userId", updateUser);

module.exports = userRoute;

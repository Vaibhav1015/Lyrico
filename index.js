const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Database connection
const mongoose = require("mongoose");
const connectionString = process.env.DB_CONNECTION_STRING;
mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

//lyrics routes
const lyricsRoute = require("./routes/lyricsRoute");
app.use("/api", lyricsRoute);

//User Routes
const userRoute = require("./routes/userRoute");
app.use("/api", userRoute);

// User Favorite lyrics Routes
const favoriteRoute = require("./routes/favoriteRoute");
app.use("/api", favoriteRoute);

//server listen on
const port = 5000;
app.listen(port, function () {
  console.log(`Server is started on port ${port}`);
});

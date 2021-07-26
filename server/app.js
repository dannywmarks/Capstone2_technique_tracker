const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

// Creates our express application
const app = express();

// Takes care of cross site scripting issues in development
app.use(cors());
app.use(express.json());

const exerciseRouter = require("./routes/exercises");
const userRouter = require("./routes/users");

app.use("/exercises", exerciseRouter);
app.use("/users", userRouter);

// Health check route for texts
app.get("/", (req, res, next) => {
  res.status(200).json({ ping: "pong" });
});

// connection URI
// const uri = process.env.MONGODB_URI;
// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
// });

// const connection = mongoose.connection;
// connection.once("open", () => {
//   console.log("MongoDB database connection established successfully");
// });

module.exports = app;

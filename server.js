const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static("./public"));
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  dbName: "houston_fishing"
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const lakesRouter = require("./routes/lakes.js");
const usersRouter = require("./routes/users.js");
const messagesRouter = require("./routes/messages.js");

app.use("/lakes", lakesRouter);
app.use("/users", usersRouter);
app.use("/messages", messagesRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

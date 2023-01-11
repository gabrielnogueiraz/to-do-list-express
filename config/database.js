const express = require("express");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://localhost/to-do-list", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

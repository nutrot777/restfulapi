const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const genRoute = require("./studentRoute/stud");

const db = mongoose.connect("mongodb://localhost/test");
const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use("/school/student", genRoute);

app.listen(1337, () => {
  console.log("Server on Port 1337");
});

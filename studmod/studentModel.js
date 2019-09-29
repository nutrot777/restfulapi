const mongoose = require("mongoose");
const { Schema } = mongoose;

const Studmodels = new Schema({
  studName: String,
  studage: Number,
  studcourse: String,
  studsub: [String]
});

exports.module = mongoose.model("StudentData", Studmodels);

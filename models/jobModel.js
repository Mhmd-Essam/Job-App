const mongoose = require("mongoose");
const user = require('./UserModel');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide Job title"],
    minLength: [3, "job title must contain at least 3 characters!"],
    maxLength: [50, "job title cannot exceed 30 characters"],
  },
  description: {
    type: String,
    required: [true, "Please provide Job description"],
    minLength: [3, "job description must contain at least 3 characters!"],
    maxLength: [350, "job description cannot exceed 30 characters"],
  },
  category: {
    type: String,
    required: [true, "Please provide Job Category"],
  },
  country: {
    type: String,
    required: [true, "Please provide Job country"],
  },
  city: {
    type: String,
    required: [true, "Please provide Job city"],
  },
  location: {
    type: String,
    required: [true, "Please provide Job location"],
    minLength: [50, "job location must contain at least 50 characters!"],
  },
  fixedSalary: {
    type: Number,
    minLength: [4, "fixedSalary must contain at least 4 characters!"],
    maxLength: [9, "fixedSalary cannot exceed 9 characters"],
  },
  SalaryFrom: {
    type: Number,
    minLength: [4, "SalaryFrom must contain at least 4 characters!"],
    maxLength: [9, "SalaryFrom cannot exceed 9 characters"],
  },
  SalaryTo: {
    type: Number,
    minLength: [4, "SalaryTo must contain at least 4 characters!"],
    maxLength: [9, "SalaryTo cannot exceed 9 characters"],
  },
  expired:{
    type:Boolean,
    default:false
  }, 
  jobPostedOn:{
    type:Date, 
    default:Date.now,
  }, 
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Job",jobSchema); 

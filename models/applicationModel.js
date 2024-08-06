const mongoose = require("mongoose");
const validator = require("validator");
const { validate } = require("./UserModel");

const ApplicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please Enter your name"],
    minLength: [3, "Name must contain at least 3 characters!"],
    maxLength: [30, "Name cxannot exceed 30 character"],
  },
  email: {
    type: String,
    required: [true, "please Enter Your Email"],
    validate: [validator.isEmail, "Please Enter A Valid Email"],
  },
  coverLetter: {
    type: String,
    required: [true, "please provide a cover Letter"],
  },
  phone: {
    type: Number,
    required: [true, "pleases enter Your phone "],
  },
  address: {
    type: String,
    required: [true, "please enter your address"],
  },
  jobname:{ 
    type:mongoose.Schema.ObjectId, 
    ref:'Job' 
  },
  resume: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  applicantID: {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ['Job Seeker'],
      required: true,
    },
  },
  employerID: {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["Employer"],
      required: true,
    },
  },
});

module.exports = new mongoose.model("Application", ApplicationSchema);

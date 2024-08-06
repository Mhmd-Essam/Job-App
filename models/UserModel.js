const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name must be required"],
      minLength: [3, "Name must contain at least 3 characters!"],
      maxLength: [32, "Name cannot exceed 30 characters"],
    },
    email: {
      type: String,
      required: [true, "Email must be required"],
      validate: [validator.isEmail, "please enter a Valid Email"],
    },
    phone: {
      type: Number,
      required: [true, "please Enter phone Number"],
    },
    password: {
      type: String,
      required: [true, "please enter a password"],
      minLength: [8, "Password must contain at least 8 character"],
      maxLength: [32],
    },
    role:{
      type: String,
      required:[true,"Please select a role"],
      enum:['Job Seeker','Employer'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.GenerateJWTtoken = function() {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE
  });
  return token;
};

module.exports = mongoose.model("User", userSchema);

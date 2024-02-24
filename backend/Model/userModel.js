const config = require("config");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 5,
    maxlength: 255
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 60,
    maxlength: 60
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      isAdmin: this.isAdmin
    },
    config.get("JWT_PRIVATE_KEY")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const nameRegex = /^[a-zA-Z0-9 ,.'-]+$/;
  const nameMinLength = 5;
  const nameMaxLength = 50;
  const emailMinLength = 5;
  const emailMaxLength = 255;

  // Validate name
  if (
    typeof user.name !== "string" ||
    !nameRegex.test(user.name) ||
    user.name.length < nameMinLength ||
    user.name.length > nameMaxLength
  ) {
    return { error: "Name must be a string between 5 and 50 characters long and can contain alphanumeric characters, spaces, commas, periods, apostrophes, and hyphens" };
  }

  // Validate email
  if (
    typeof user.email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email) ||
    user.email.length < emailMinLength ||
    user.email.length > emailMaxLength
  ) {
    return { error: "Invalid email format" };
  }

  // Validate password
  const passwordValidationResult = validatePassword(user.password);
  if (passwordValidationResult.error) {
    return passwordValidationResult;
  }

  return {};
}

function validatePassword(password) {
  const passwordMinLength = 8;
  const passwordMaxLength = 255;

  if (
    typeof password !== "string" ||
    password.length < passwordMinLength ||
    password.length > passwordMaxLength
  ) {
    return {
      error: `Password must be a string between ${passwordMinLength} and ${passwordMaxLength} characters long`
    };
  }

  return {};
}

exports.User = User;
exports.validate = validateUser;

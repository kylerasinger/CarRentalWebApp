const { Schema, model } = require("mongoose");

const userSchema = new Schema({
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
  },
  role: {
    type: String,
    default: "customer"
  }
});

const User = model("User", userSchema);

const _User = User;
export { _User as User };

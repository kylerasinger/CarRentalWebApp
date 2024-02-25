const mongoose = require("mongoose");

const Type = mongoose.model(
  "Type",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 50
    }
  })
);

function validateType(type) {
  // Validate the 'name' property
  if (
    typeof type.name !== 'string' ||
    type.name.trim().length < 1 ||
    type.name.trim().length > 50
  ) {
    return { error: 'Invalid name. It must be a string between 1 and 50 characters long.' };
  }

  // If validation passes, return null (no error)
  return null;
}

exports.Type = Type;
exports.validate = validateType;

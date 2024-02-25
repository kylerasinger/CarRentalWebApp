const mongoose = require("mongoose");

const Brand = mongoose.model(
  "Brand",
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
function validateBrand(brand) {
    // Validate the 'name' property
    if (
      typeof brand.name !== 'string' ||
      brand.name.trim().length < 1 ||
      brand.name.trim().length > 50
    ) {
      return { error: 'Invalid name. It must be a string between 1 and 50 characters long.' };
    }
  
    // If validation passes, return null (no error)
    return null;
  }

exports.Brand = Brand;
exports.validate = validateBrand;
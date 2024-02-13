const mongoose = require("mongoose");
const { Brand } = require("brandModel");
const { Type } = require("typeModel");

const Car = mongoose.model(
  "Car",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 50
    },
    brand: {
      type: Brand.schema,
      required: true
    },
    type: {
      type: Type.schema,
      required: true
    },
    numberOfSeats: {
      type: Number,
      min: 1,
      max: 255,
      default: 5
    },
    numberOfDoors: {
      type: Number,
      min: 1,
      max: 255,
      default: 4
    },
    transmission: {
      type: String,
      enum: ["Manual", "Automatic"],
      default: "Manual"
    },
    airConditioner: {
      type: Boolean,
      default: false
    },
    numberInStock: {
      type: Number,
      required: true,
      min: 0,
      max: 255
    },
    dailyRentalRate: {
      type: Number,
      required: true,
      min: 0,
      max: 255
    }
  })
);

function validateCar(car) {
  // validation logic
  if (
    typeof car.name !== 'string' ||
    car.name.trim().length < 1 ||
    car.name.trim().length > 50
  ) {
    return { error: 'Invalid name. It must be a string between 1 and 50 characters long.' };
  }

  if (!car.brandId || typeof car.brandId !== 'string') {
    return { error: 'Invalid brandId. It is required and must be a string.' };
  }

  if (!car.typeId || typeof car.typeId !== 'string') {
    return { error: 'Invalid typeId. It is required and must be a string.' };
  }

  // If validation passes, return null (no error)
  return null;
}

exports.validate = validateCar;
exports.Car = Car;
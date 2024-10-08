const { Rental, validate } = require("../models/rental");
const { Car } = require("../models/car");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const validateReqBody = require("../middleware/validateReqBody");
const Fawn = require("fawn");
const express = require("express");
const router = express.Router();

// Define a basic user schema
const UserSchema = new Schema({
  name: String,
  email: String
});

const User = mongoose.model("User", UserSchema);

const notFoundError = "Rental with given ID does not exist.";
const userIdError = "Invalid user.";
const carIdError = "Invalid car.";
const inRentalError = "Car is already in rental.";
const notInStockError = "Car not in stock.";

router.get("/", [admin], async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

router.get("/me", async (req, res) => {
  // Remove authentication related code here
  const userId = req.body.userId; // Assuming userId is passed in the request
  const rentals = await Rental.find({ "user._id": userId }).sort("-dateOut");
  res.send(rentals);
});

router.get("/:id", [admin, validateObjectId], async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental) return res.status(404).send(notFoundError);

  res.send(rental);
});

router.post("/", validateReqBody(validate), async (req, res) => {
  // Remove authentication related code here
  const userId = req.body.userId; // Assuming userId is passed in the request

  const user = await User.findById(userId);
  if (!user) return res.status(400).send(userIdError);

  const car = await Car.findById(req.body.carId);
  if (!car) return res.status(400).send(carIdError);

  // let rental = await Rental.lookup(userId, req.body.carId);
  // if (rental && !rental.dateReturned)
  //   return res.status(400).send(inRentalError);

  if (car.numberInStock === 0) return res.status(400).send(notInStockError);

  rental = new Rental({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email
    },
    car: {
      _id: car._id,
      name: car.name,
      dailyRentalRate: car.dailyRentalRate
    },
    lengthOfRental: req.body.lengthOfRental,
    //in a real application, we would NEVER store unencrypted credit card info. 
    checkIn: req.body.checkIn,
    checkOut: req.body.checkOut,
    ccNumber: req.body.ccNumber,
    ccExpiry: req.body.ccExpiry,
    branchLocation: req.body.branchLocation
  });

  await new Fawn.Task()
    .save("rentals", rental)
    .update(
      "cars",
      { _id: car._id },
      {
        $inc: { numberInStock: -1 }
      }
    )
    .run();

  res.status(201).send(rental);
});

router.post("/update/:id", [validateObjectId], async (req, res) => {
  const { error } = validate(req.body); // Assuming your validate function validates the request body
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const rental = await Rental.findById(req.params.id);
    if (!rental) return res.status(404).send(notFoundError);

    // Assuming you're updating certain fields like lengthOfRental and maybe the car itself
    // You might need to check if the car is changed, and handle stock accordingly
    if (req.body.carId && req.body.carId !== rental.car._id.toString()) {
      const car = await Car.findById(req.body.carId);
      if (!car) return res.status(400).send(carIdError);
      if (car.numberInStock === 0) return res.status(400).send(notInStockError);

      // Update the car information in the rental
      rental.car = {
        _id: car._id,
        name: car.name,
        dailyRentalRate: car.dailyRentalRate
      };

      // Update the car's stock
      await Car.updateOne({ _id: car._id }, { $inc: { numberInStock: -1 } });
      // If necessary, increment the stock of the previously rented car
    }

    // Update other fields
    rental.lengthOfRental = req.body.lengthOfRental || rental.lengthOfRental;
    rental.ccNumber = req.body.ccNumber || rental.ccNumber; // Be cautious with credit card data
    rental.ccExpiry = req.body.ccExpiry || rental.ccExpiry;
    rental.branchLocation = req.body.branchLocation || rental.branchLocation;
    rental.checkIn = req.body.checkIn || false;
    rental.checkOut = req.body.checkOut || false;

    await rental.save();

    res.send(rental);
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
});
router.delete("/delete/:id", async (req, res) => {
  const rental = await Rental.findById(req.params.id);
  
  if (!rental) {
      return res.status(404).send(notFoundError);
  }

  await Rental.findByIdAndRemove(req.params.id);

  res.send(rental);
});


module.exports = router;

const { Rental, validate } = require("../models/rental_model");
const validateReqBody = require("../middleware/validateReqBody");
const Fawn = require("fawn");
const express = require("express");
const router = express.Router();

router.post("/", validateReqBody(validate), async (req, res) => {
  // Remove authentication related code here
  
  const rental = await Rental.lookup(req.body.userId, req.body.carId);

  if (!rental)
    return res
      .status(400)
      .send("Rental does not exist or return already processed.");

  rental.return();

  await new Fawn.Task()
    .update(
      "rentals",
      { _id: rental._id },
      { dateReturned: rental.dateReturned, rentalFee: rental.rentalFee }
    )
    .update(
      "cars",
      { _id: rental.car._id },
      {
        $inc: { numberInStock: 1 }
      }
    )
    .run();

  res.send(rental);
});

module.exports = router;

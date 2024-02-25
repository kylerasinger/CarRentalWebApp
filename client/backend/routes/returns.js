const { Rental, validate } = require("../models/rental");
const auth = require("../middleware/auth");
const validateReqBody = require("../middleware/validateReqBody");
const express = require("express");
const router = express.Router();

router.post("/", [auth, validateReqBody(validate)], async (req, res) => {
  const session = await Rental.startSession();
  session.startTransaction();

  try {
    const rental = await Rental.lookup(req.user._id, req.body.carId);

    if (!rental) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(400)
        .send("Rental does not exist or return already processed.");
    }

    rental.return();

    await Rental.updateOne(
      { _id: rental._id },
      { dateReturned: rental.dateReturned, rentalFee: rental.rentalFee },
      { session }
    );
    await Car.updateOne(
      { _id: rental.car._id },
      { $inc: { numberInStock: 1 } },
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.send(rental);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).send("Server Error");
  }
});

module.exports = router;

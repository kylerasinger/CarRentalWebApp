const { Car, validate } = require("../models/car");
const { Brand } = require("../models/brand");
const { Type } = require("../models/type");
const admin = require("../middleware/admin");
const validateObjectId = require("../middleware/validateObjectId");
const validateReqBody = require("../middleware/validateReqBody");
const express = require("express");
const router = express.Router();
const axios = require("axios");

const notFoundError = "Car with given ID does not exist.";
const brandIdError = "Invalid brand.";
const typeIdError = "Invalid type.";

router.get("/", async (req, res) => {
  const cars = await Car.find().sort("name");
  res.send(cars);
});

router.get("/:id", validateObjectId, async (req, res) => {
  const car = await Car.findById(req.params.id);

  if (!car) return res.status(404).send(notFoundError);

  res.send(car);
});

router.get('/images/:carId', async (req, res) => {
  try {
    const carId = req.params.carId;
    const car = await Car.findById(carId);

    if (!car || !car.imageUrl) {
      console.log("car:" + car);
      console.log("car.imageUrl" + car.imageUrl);
      return res.status(404).send('Image not found. ');
    }

    console.log("image found");

    const imageUrl = car.imageUrl;
    const response = await axios({
      method: 'GET',
      url: imageUrl,
      responseType: 'stream'
    });

    console.log("axios called");

    res.setHeader('Content-Type', response.headers['content-type']);
    response.data.pipe(res);
  } catch (error) {
    console.error('Failed to proxy image:', error);
    res.status(500).send('Failed to load image.');
  }
});

router.post("/", [admin, validateReqBody(validate)], async (req, res) => {
  const brand = await Brand.findById(req.body.brandId);
  if (!brand) return res.status(400).send(brandIdError);

  const type = await Type.findById(req.body.typeId);
  if (!type) return res.status(400).send(typeIdError);

  const car = new Car(setValues(req, brand, type));
  await car.save();

  res.status(201).send(car);
});

router.put(
  "/:id",
  [admin, validateObjectId, validateReqBody(validate)],
  async (req, res) => {
    const brand = await Brand.findById(req.body.brandId);
    if (!brand) return res.status(400).send(brandIdError);

    const type = await Type.findById(req.body.typeId);
    if (!type) return res.status(400).send(typeIdError);

    const car = await Car.findByIdAndUpdate(
      req.params.id,
      setValues(req, brand, type),
      {
        new: true
      }
    );

    if (!car) return res.status(404).send(notFoundError);

    res.send(car);
  }
);

router.delete("/:id", [admin, validateObjectId], async (req, res) => {
  const car = await Car.findByIdAndRemove(req.params.id);

  if (!car) return res.status(404).send(notFoundError);

  res.send(car);
});

function setValues(req, brand, type) {
  return {
    name: req.body.name,
    brand: {
      _id: brand._id,
      name: brand.name
    },
    type: {
      _id: type._id,
      name: type.name
    },
    numberOfSeats: req.body.numberOfSeats,
    numberOfDoors: req.body.numberOfDoors,
    transmission: req.body.transmission,
    airConditioner: req.body.airConditioner,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
    imageUrl: req.body.imageUrl
  };
}

module.exports = router;

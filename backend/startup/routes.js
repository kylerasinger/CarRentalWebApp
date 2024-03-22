const express = require("express");
const brands = require("../routes/brands");
const types = require("../routes/types");
const cars = require("../routes/cars");
const rentals = require("../routes/rentals");
const returns = require("../routes/returns");
const syncs = require("../routes/syncs");
const error = require("../middleware/error");
const users = require("../routes/users");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/brands", brands);
  app.use("/api/types", types);
  app.use("/api/cars", cars);
  app.use("/api/rentals", rentals);
  app.use("/api/returns", returns);
  app.use("/api/syncs", syncs);
  app.use('/api/users/', users);
  app.use(error);
};

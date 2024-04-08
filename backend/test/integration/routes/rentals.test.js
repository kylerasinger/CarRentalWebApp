  const mongoose = require('mongoose');
  const request = require('supertest');
  const express = require('express');
  const app = express();

  // Import your models
  const { Rental } = require('../../../models/rental');

  // Define your API routes
  app.get('/api/rentals/:id', async (req, res) => {
    const rental = await Rental.findById(req.params.id);
    if (!rental) return res.status(404).send();
    res.send(rental);
  });

  describe('Rental API', () => {
    let rentalId;

    beforeAll(async () => {
      await mongoose.connect('mongodb://127.0.0.1:27017/testdb', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      // Assuming you've stored the provided rental data in a variable
      const existingRentalData = {
        lengthOfRental: 9,
        checkIn: false,
        checkOut: false,
        user: {
          name: "Kyle Rasinger",
          email: "kyle.rasinger@gmail.com"
        },
        car: {
          name: "Aventador",
          dailyRentalRate: 1800
        },
        ccNumber: "4574487405369697",
        ccExpiry: "0821",
        branchLocation: "123 Smith Str. Montreal",
        dateOut: new Date("2024-03-21T02:40:11.498Z")
      };

      // Create the rental using the existing data
      const newRental = new Rental(existingRentalData);
      const savedRental = await newRental.save();
      rentalId = savedRental._id.toString();
    });

    afterAll(async () => {
      await mongoose.disconnect();
    });

    it('should confirm a rental exists', async () => {
      const response = await request(app).get(`/api/rentals/${rentalId}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('_id', rentalId);
    });
  });

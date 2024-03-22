const mongoose = require('mongoose');
const { Car } = require("../../../models/car");

describe('Car model', () => {
  beforeAll(async () => {
    // Connect to the in-memory test database or your test MongoDB server
    await mongoose.connect('mongodb://127.0.0.1:27017/testdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterEach(async () => {
    // Clear the database after each test
    await Car.deleteMany();
  });

  afterAll(async () => {
    // Disconnect Mongoose after all tests
    await mongoose.disconnect();
  });

  it('should create a new car', async () => {
    // Create a new car with all required fields
    const car = new Car({
      name: 'Camry',
      brand: {
        name: 'Toyota',
      },
      type: {
        name: 'Sedan',
      },
      numberOfSeats: 5,
      numberOfDoors: 4,
      transmission: 'Manual',
      airConditioner: false,
      numberInStock: 10,
      dailyRentalRate: 50,
    });

    // Save the car to the database
    await car.save();

    // Perform the "GET" operation to retrieve car data
    const foundCar = await Car.findOne({ name: 'Camry' });

    // Assert that car data exists and matches the expected values
    expect(foundCar).toBeDefined();
    expect(foundCar.name).toBe('Camry');
    expect(foundCar.brand.name).toBe('Toyota');
    expect(foundCar.type.name).toBe('Sedan');
    expect(foundCar.numberOfSeats).toBe(5);
    expect(foundCar.numberOfDoors).toBe(4);
    expect(foundCar.transmission).toBe('Manual');
    expect(foundCar.airConditioner).toBe(false);
    expect(foundCar.numberInStock).toBe(10);
    expect(foundCar.dailyRentalRate).toBe(50);
  });

  it('should retrieve an existing car from the database', async () => {
    // Create a new car and save it to the database
    const newCar = new Car({
      name: 'Accord',
      brand: {
        name: 'Honda',
      },
      type: {
        name: 'Sedan',
      },
      numberOfSeats: 5,
      numberOfDoors: 4,
      transmission: 'Automatic',
      airConditioner: true,
      numberInStock: 8,
      dailyRentalRate: 60,
    });
    await newCar.save();

    // Perform the "GET" operation to retrieve car data
    const foundCar = await Car.findOne({ name: 'Accord' });

    // Assert that car data exists and matches the expected values
    expect(foundCar).toBeDefined();
    expect(foundCar.name).toBe('Accord');
    expect(foundCar.brand.name).toBe('Honda');
    expect(foundCar.type.name).toBe('Sedan');
    expect(foundCar.numberOfSeats).toBe(5);
    expect(foundCar.numberOfDoors).toBe(4);
    expect(foundCar.transmission).toBe('Automatic');
    expect(foundCar.airConditioner).toBe(true);
    expect(foundCar.numberInStock).toBe(8);
    expect(foundCar.dailyRentalRate).toBe(60);
  });
});

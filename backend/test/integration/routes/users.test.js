const mongoose = require('mongoose');
const { User } = require('../../../models/user');

describe('User Model', () => {
  beforeAll(async () => {
    // Connect to the MongoDB database
    await mongoose.connect('mongodb://127.0.0.1:27017/testdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // Disconnect from the MongoDB database
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    // Clear the database before each test
    await User.deleteMany({});
  });

  afterEach(async () => {
    // Clear the database after each test
    await User.deleteMany({});
  });

  it('should create a new user', async () => {
    // Create a sample user
    const userData = { name: 'John Doe', email: 'john.doe@example.com', password: 'passwordpasswordpasswordpasswordpasswordpasswordpassword1234' };
    const user = new User(userData);
    await user.save();

    // Fetch the user from the database
    const fetchedUser = await User.findOne({ email: 'john.doe@example.com' });

    // Check if the user was successfully created
    expect(fetchedUser).toBeTruthy();
    expect(fetchedUser.name).toBe('John Doe');
  });

  it('should find an existing user by email', async () => {
    // Create a sample user
    const userData = { name: 'Jane Smith', email: 'jane.smith@example.com', password: 'passwordpasswordpasswordpasswordpasswordpasswordpassword4567' };
    await User.create(userData);

    // Fetch the user from the database using their email
    const fetchedUser = await User.findOne({ email: 'jane.smith@example.com' });

    // Check if the user was found
    expect(fetchedUser).toBeTruthy();
    expect(fetchedUser.name).toBe('Jane Smith');
  });
});

const request = require('supertest');
const express = require('express');
const loginRoute = require('../../../routes/login');

jest.mock('../../../models/user', () => ({
    User: {
        findOne: jest.fn()
    }
}));
const { User } = require('../../../models/user');
const bcrypt = require('bcrypt');

describe('Login Route', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/', loginRoute);
    User.findOne.mockReset();
  });

  it('should set up a POST route', async () => {
    const response = await request(app).post('/').send({ email: 'dummy@example.com', password: 'password123' });
    expect(response.status).not.toBe(404);
  });

  it('should return a token on successful login', async () => {
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 10);
    const mockUser = {
      email: 'test@example.com', 
      password: hashedPassword, 
      generateAuthToken: () => 'dummytoken'
    };
    User.findOne.mockResolvedValue(mockUser);

    const response = await request(app)
      .post('/')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
  });

  it('should return an error on unsuccessful login', async () => {
    User.findOne.mockResolvedValue(null);

    const response = await request(app)
      .post('/')
      .send({ email: 'test@example.com', password: 'wrongpassword' });

    expect(response.status).toBe(400);
    expect(response.text).toBe('Invalid email or password.');
  });
});

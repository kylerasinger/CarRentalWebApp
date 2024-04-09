// syncs.test.js
const request = require('supertest');
const express = require('express');
const syncsRoute = require('../../../routes/syncs');
jest.mock('../../../middleware/sync');

const syncUsersFunction = require('../../../middleware/sync');

describe('Syncs Route', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/', syncsRoute);
    syncUsersFunction.mockReset();
  });

  it('should successfully sync users', async () => {
    syncUsersFunction.mockResolvedValue();
    const response = await request(app).post('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Users successfully synced');
  });

  it('should handle errors during syncing', async () => {
    syncUsersFunction.mockRejectedValue(new Error('Sync error'));
    const response = await request(app).post('/');
    expect(response.status).toBe(500);
    expect(response.text).toBe('Error syncing users');
  });
});

// Path: src/setupTests.js

// 🧪 This file will be used to configure API tests using MSW (Mock Service Worker)
// Currently, it is commented out while developing unit tests for React components.
// Later, when API tests are implemented, this code will be enabled.

/*
import '@testing-library/jest-dom';

import { setupServer } from 'msw/node';
import { rest } from 'msw';

import config from './config';

const generateFakeData = (count) => {
  const intervals = ['5m', '15m', '30m', '1h', '4h', 'D', 'W', 'M'];
  const strategies = ['Scalping', 'Breakout', 'Swing', 'Batman', 'Superman', 'Hulk', 'Titanic'];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    Ticker: `FAKE${i + 1}`,
    Interval: intervals[Math.floor(Math.random() * intervals.length)], 
    Price_Alert: parseFloat((Math.random() * 1000).toFixed(2)), 
    Time_Alert: `2024-12-${String((i % 30) + 1).padStart(2, '0')}`,
    Order: i % 2 === 0 ? 'Long' : 'Short',
    Strategy: strategies[Math.floor(Math.random() * strategies.length)] 
  }));
};

const fakeData = generateFakeData(80);

const server = setupServer(
  rest.get(`${config.apiURL}/alarms/alarms`, (req, res, ctx) => {
    // Verify the token in the Authorization header
    const token = 'your-auth-token-here';
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || authHeader !== `Bearer ${token}`) {
      return res(ctx.status(401), ctx.json({ error: 'Unauthorized' }));
    }

    // Respond with simulated data
    return res(ctx.json(fakeData));
  })
);

// Configure the lifecycle of the tests
beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  jest.restoreAllMocks();
});
afterAll(() => server.close());

// Simulate localStorage to return the token
beforeEach(() => {
  jest.spyOn(window.localStorage.__proto__, 'getItem').mockImplementation((key) => {
    if (key === 'authToken') return 'your-auth-token-here';
    return null;
  });
});
*/

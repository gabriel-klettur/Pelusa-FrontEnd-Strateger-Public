// src/setupTests.js
import { setupServer } from 'msw/node';
import { rest } from 'msw';

const server = setupServer(
  rest.get('/api/alarms', (req, res, ctx) => {
    return res(ctx.json([{ id: 1, Ticker: 'BTCUSDT' }]));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

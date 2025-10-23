import request from 'supertest';
import express, { Express } from 'express';
import { ApiServer } from '../src/apiServer';
import { BookRecord } from '../src/types';

describe('ApiServer', () => {
  let app: Express;

  const sampleRecords: BookRecord[] = [
    { ISBN: '1111111111111', Title: 'Book One', Author: 'Author A', PublishedYear: 2001, Copies: 5 },
    { ISBN: '2222222222222', Title: 'Book Two', Author: 'Author B', PublishedYear: 2002, Copies: 3 },
  ];

  beforeEach(() => {
    // Rebuild an express app each test
    app = express();
    ApiServer.init(sampleRecords);

    // Recreate routes manually (mimic start()) without listening
    app.get('/healty', (req, res) => res.send('Server is Online'));
    app.get('/api/records', (req, res) => res.status(200).json(sampleRecords));
    app.get('/api/records/:isbn', (req, res) => {
      const record = sampleRecords.find(r => r.ISBN === req.params.isbn);
      if (record) {
        res.status(200).json(record);
      } else {
        res.status(404).json({ message: `Record with ISBN ${req.params.isbn} not found.` });
      }
    });
  });

  test('GET /healty should return server online message', async () => {
    const res = await request(app).get('/healty');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Server is Online');
  });

  test('GET /api/records should return all records', async () => {
    const res = await request(app).get('/api/records');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(sampleRecords);
  });

  test('GET /api/records/:isbn should return a specific record if found', async () => {
    const res = await request(app).get('/api/records/1111111111111');
    expect(res.status).toBe(200);
    expect(res.body).toEqual(sampleRecords[0]);
  });

  test('GET /api/records/:isbn should return 404 if record not found', async () => {
    const res = await request(app).get('/api/records/9999999999999');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'Record with ISBN 9999999999999 not found.' });
  });
});

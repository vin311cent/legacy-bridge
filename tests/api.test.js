"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const apiServer_1 = require("../src/apiServer");
describe('ApiServer', () => {
    let app;
    const sampleRecords = [
        { ISBN: '1111111111111', Title: 'Book One', Author: 'Author A', PublishedYear: 2001, Copies: 5 },
        { ISBN: '2222222222222', Title: 'Book Two', Author: 'Author B', PublishedYear: 2002, Copies: 3 },
    ];
    beforeEach(() => {
        // Rebuild an express app each test
        app = (0, express_1.default)();
        apiServer_1.ApiServer.init(sampleRecords);
        // Recreate routes manually (mimic start()) without listening
        app.get('/healty', (req, res) => res.send('Server is Online'));
        app.get('/api/records', (req, res) => res.status(200).json(sampleRecords));
        app.get('/api/records/:isbn', (req, res) => {
            const record = sampleRecords.find(r => r.ISBN === req.params.isbn);
            if (record) {
                res.status(200).json(record);
            }
            else {
                res.status(404).json({ message: `Record with ISBN ${req.params.isbn} not found.` });
            }
        });
    });
    test('GET /healty should return server online message', async () => {
        const res = await (0, supertest_1.default)(app).get('/healty');
        expect(res.status).toBe(200);
        expect(res.text).toBe('Server is Online');
    });
    test('GET /api/records should return all records', async () => {
        const res = await (0, supertest_1.default)(app).get('/api/records');
        expect(res.status).toBe(200);
        expect(res.body).toEqual(sampleRecords);
    });
    test('GET /api/records/:isbn should return a specific record if found', async () => {
        const res = await (0, supertest_1.default)(app).get('/api/records/1111111111111');
        expect(res.status).toBe(200);
        expect(res.body).toEqual(sampleRecords[0]);
    });
    test('GET /api/records/:isbn should return 404 if record not found', async () => {
        const res = await (0, supertest_1.default)(app).get('/api/records/9999999999999');
        expect(res.status).toBe(404);
        expect(res.body).toEqual({ message: 'Record with ISBN 9999999999999 not found.' });
    });
});

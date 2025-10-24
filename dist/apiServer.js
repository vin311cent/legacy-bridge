"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiServer = void 0;
const express_1 = __importDefault(require("express"));
let cachedRecords = [];
exports.ApiServer = {
    /**
     * Pre-loads the data into memory for the API to serve.
     * @param data - The combined array of all parsed BookRecords.
     */
    init: (data) => {
        cachedRecords = data;
    },
    //Starts the REST API server.
    start: () => {
        const app = (0, express_1.default)();
        const PORT = 2000;
        // Check if port is working
        app.get('/healty', (req, res) => res.send("Server is Online"));
        //  Retrieve all records "/api/records"
        app.get('/api/records', (req, res) => {
            res.status(200).json(cachedRecords);
        });
        // Retrieve a single record by ISBN
        app.get('/api/records/:isbn', (req, res) => {
            const isbn = req.params.isbn;
            const record = cachedRecords.find(r => r.ISBN === isbn);
            if (record) {
                res.status(200).json(record);
            }
            else {
                res.status(404).json({ message: `Record with ISBN ${isbn} not found.` });
            }
        });
        app.listen(PORT, () => {
            console.log(` API Server is running on http://localhost:${PORT}`);
        });
    }
};

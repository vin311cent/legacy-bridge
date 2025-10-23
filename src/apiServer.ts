import express, { Request, Response } from 'express';
import { BookRecord } from './types';

let cachedRecords: BookRecord[] = [];

export const ApiServer = {
    /**
     * Pre-loads the data into memory for the API to serve.
     * @param data - The combined array of all parsed BookRecords.
     */
    init: (data: BookRecord[]) => {
        cachedRecords = data;
    },

    //Starts the REST API server.
    start: () => {
        const app = express();
        const PORT = 2000;

        // Check if port is working
        app.get('/healty',(req:Request, res:Response) => 
            res.send("Server is Online")
        );
        //  Retrieve all records "/api/records"
        app.get('/api/records', (req: Request, res: Response) => {
            res.status(200).json(cachedRecords);
        });

        // Retrieve a single record by ISBN
        app.get('/api/records/:isbn', (req: Request, res: Response) => {
            const isbn = req.params.isbn;
            const record = cachedRecords.find(r => r.ISBN === isbn);

            if (record) {
                res.status(200).json(record);
            } else {
                res.status(404).json({ message: `Record with ISBN ${isbn} not found.` });
            }
        });

        app.listen(PORT, () => {
            console.log(` API Server is running on http://localhost:${PORT}`);
        });
    }
}
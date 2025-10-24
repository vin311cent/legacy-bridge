"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// main.ts
const fileProcessor_1 = require("./fileProcessor");
async function runExport() {
    // ⚠️ IMPORTANT: Update this to the directory that contains your .dat files
    const inputDirectory = './data';
    // ⚠️ IMPORTANT: This path is relative to where you run the script (your current terminal directory)
    const outputFilePath = 'processed_books.json';
    console.log(`Starting data processing from: ${inputDirectory}`);
    try {
        // 1. Process the data
        const processedData = await (0, fileProcessor_1.processDirectory)(inputDirectory);
        // 2. Export the data to JSON
        if (processedData.length > 0) {
            await (0, fileProcessor_1.writeJsonFile)(processedData, outputFilePath);
        }
        else {
            console.log("No records found, skipping JSON export.");
        }
    }
    catch (error) {
        console.error("The data processing and export pipeline failed. Check the error details above.");
    }
}
runExport();

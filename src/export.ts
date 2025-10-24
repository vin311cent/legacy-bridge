// main.ts
import { processDirectory, writeJsonFile } from './fileProcessor';

async function runExport() {
    // ⚠️ IMPORTANT: Update this to the directory that contains your .dat files
    const inputDirectory = './data'; 
    
    // ⚠️ IMPORTANT: This path is relative to where you run the script (your current terminal directory)
    const outputFilePath = 'processed_books.json'; 

    console.log(`Starting data processing from: ${inputDirectory}`);
    
    try {
        // 1. Process the data
        const processedData = await processDirectory(inputDirectory);
        
        // 2. Export the data to JSON
        if (processedData.length > 0) {
            await writeJsonFile(processedData, outputFilePath);
        } else {
            console.log("No records found, skipping JSON export.");
        }
        
    } catch (error) {
        console.error("The data processing and export pipeline failed. Check the error details above.");
    }
}

runExport();
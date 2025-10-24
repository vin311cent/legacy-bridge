import * as fs from 'fs/promises';
import * as path from 'path';
import { BookRecord } from './types';
import { parseLine } from './parser';

/**
 * Processes all fixed-width DAT files in a given directory and combines the results.
 * @param directoryPath - The path to the input directory.
 * @returns A promise resolving to an array of all parsed BookRecords.
 */
export async function processDirectory(directoryPath: string): Promise<BookRecord[]> {
    const allRecords: BookRecord[] = [];
    
    try {
        const files = await fs.readdir(directoryPath);
        
        const datFiles = files.filter(file => file.endsWith('.dat'));
        
        console.log(`Found ${datFiles.length} .dat files to process.`);

        for (const fileName of datFiles) {
            const filePath = path.join(directoryPath, fileName);
            const content = await fs.readFile(filePath, { encoding: 'utf-8' });
            
            // Assuming each line is a record
            const lines = content.split('\n');
            
            for (const line of lines) {
                const record = parseLine(line);
                if (record) {
                    record.sourceFile = fileName; 
                    allRecords.push(record);
                }
            }
            console.log(`Processed ${fileName}.`);
        }
        
    } catch (error) {
        console.error(`Error processing directory ${directoryPath}:`, error);
        throw new Error("Failed to read or process files.");
    }

    return allRecords;
}

/**
 * Writes an array of BookRecords to a specified JSON file path.
 * @param records - The array of book records to write.
 * @param outputFilePath - The path to the output JSON file.
 */
export async function writeJsonFile(records: BookRecord[], outputFilePath: string): Promise<void> {
    try {
        // Convert the array of records into a formatted JSON string
        const jsonContent = JSON.stringify(records, null, 2);
        
        // Write the JSON string to the file system
        await fs.writeFile(outputFilePath, jsonContent, 'utf-8');
        
        console.log(`Successfully exported ${records.length} records to ${outputFilePath}`);
    } catch (error) {
        console.error(`Error writing JSON file to ${outputFilePath}:`, error);
        throw new Error("Failed to write data to JSON file.");
    }
}
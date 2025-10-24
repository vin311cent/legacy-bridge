"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.processDirectory = processDirectory;
exports.writeJsonFile = writeJsonFile;
const fs = __importStar(require("fs/promises"));
const path = __importStar(require("path"));
const parser_1 = require("./parser");
/**
 * Processes all fixed-width DAT files in a given directory and combines the results.
 * @param directoryPath - The path to the input directory.
 * @returns A promise resolving to an array of all parsed BookRecords.
 */
async function processDirectory(directoryPath) {
    const allRecords = [];
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
                const record = (0, parser_1.parseLine)(line);
                if (record) {
                    record.sourceFile = fileName;
                    allRecords.push(record);
                }
            }
            console.log(`Processed ${fileName}.`);
        }
    }
    catch (error) {
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
async function writeJsonFile(records, outputFilePath) {
    try {
        // Convert the array of records into a formatted JSON string
        const jsonContent = JSON.stringify(records, null, 2);
        // Write the JSON string to the file system
        await fs.writeFile(outputFilePath, jsonContent, 'utf-8');
        console.log(`Successfully exported ${records.length} records to ${outputFilePath}`);
    }
    catch (error) {
        console.error(`Error writing JSON file to ${outputFilePath}:`, error);
        throw new Error("Failed to write data to JSON file.");
    }
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseLine = parseLine;
// The fixed-width specifications based on the assignment table.
const SPEC = {
    ISBN: { start: 1, end: 13, length: 13, type: 'String' },
    Title: { start: 14, end: 113, length: 100, type: 'String' },
    Author: { start: 114, end: 163, length: 50, type: 'String' },
    PublishedYear: { start: 164, end: 167, length: 4, type: 'Integer' },
    Copies: { start: 168, end: 170, length: 3, type: 'Integer' },
};
/**
 * Parses a single line of fixed-width data into a BookRecord object.
 * This is a critical function that requires robust testing (TEST_PLAN.md).
 * * @param line - The fixed-width string line from the .dat file.
 * @returns A fully parsed BookRecord.
 */
function parseLine(line) {
    if (line.trim().length === 0) {
        return null; // Skip empty lines
    }
    try {
        // Helper to extract a substring based on 1-based start/end columns
        const extractField = (start, end) => {
            // Adjust to 0-based indexing for JavaScript substring: start - 1, end
            return line.substring(start - 1, end).trim();
        };
        const isbnString = extractField(SPEC.ISBN.start, SPEC.ISBN.end);
        const yearString = extractField(SPEC.PublishedYear.start, SPEC.PublishedYear.end);
        const copiesString = extractField(SPEC.Copies.start, SPEC.Copies.end);
        // --- Input Space Partitioning: Edge Case/Error Handling (Robustness) ---
        // Convert to required Integer types and handle conversion errors
        const publishedYear = parseInt(yearString, 10);
        const copies = parseInt(copiesString, 10);
        if (isNaN(publishedYear) || isNaN(copies) || isbnString.length === 0) {
            console.error(`Skipping invalid record. Year: ${yearString}, Copies: ${copiesString}`);
            // In a robust system, you might log this to an error file
            return null;
        }
        return {
            ISBN: isbnString,
            Title: extractField(SPEC.Title.start, SPEC.Title.end),
            Author: extractField(SPEC.Author.start, SPEC.Author.end),
            PublishedYear: publishedYear,
            Copies: copies,
        };
    }
    catch (e) {
        console.error("Error parsing line:", e);
        return null; // Handle unexpected errors gracefully
    }
}

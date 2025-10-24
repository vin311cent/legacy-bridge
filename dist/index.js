"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileProcessor_1 = require("./fileProcessor");
const apiServer_1 = require("./apiServer");
// The input directory should be passed as a command-line argument.
const INPUT_DIR_PATH = "./data";
if (!INPUT_DIR_PATH) {
    console.error(" Error: Please provide the path to the directory containing .dat files.");
    process.exit(1);
}
async function startService() {
    try {
        console.log(`Starting migration and API service...`);
        // 1. Run the core migration script (data transformation)
        const combinedRecords = await (0, fileProcessor_1.processDirectory)(INPUT_DIR_PATH);
        console.log(`Successfully migrated ${combinedRecords.length} total records.`);
        // 2. Initialize and start the REST API
        apiServer_1.ApiServer.init(combinedRecords);
        apiServer_1.ApiServer.start();
    }
    catch (error) {
        console.error("A critical error occurred during service startup:", error);
        process.exit(1);
    }
}
startService();

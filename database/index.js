const mongoose = require("mongoose");

// Importing logger utility and chalk for colorful logging
const { logger } = require("../utils");
const chalk = require("chalk");

/** Asynchronous function to connect to the MongoDB database */
async function connectDatabase(options) {
    try {
        // Extracting database connection string from environment variables
        const { DB_CONNECTION } = process.env;

        // Establishing connection to the MongoDB database
        const { connection } = await mongoose.connect(DB_CONNECTION);

        // Logging connection status if showLogger is true
        if (options.logger == true)
            logger.info([
                `Successfully connected to database: ${chalk.white.bold("MongoDB")}`,
                `* (URL) Connection: ${chalk.green.underline(connection._connectionString)}`,
            ]);
    } catch (error) {
        // Logging connection error and throwing an error
        const message = error.message ?? error;
        if (options.logger === true || options.stopFailed === true) {
            logger.error(`Failed to connect MongoDB: ${message}`);
        }
        // Shut down application instance if stopFailed option is enabled
        if (options.stopFailed === true) {
            logger.error("Shutting down application instance...");
            process.exit(1);
        }
        // Throw error regardless of options
        throw new Error(message);
    }
}

// Exporting the connectDatabase function
module.exports = connectDatabase;

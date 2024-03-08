const express = require("express");
const connectDatabase = require("./config/database");

const { errorResponder } = require("./middlewares/ErrorMiddleware");

// Connect to the database
connectDatabase({
    stopFailed: true, // Exit application on failed connect
    logger: true, // Enable logger
});

const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());
// Middleware for parsing URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Define routes
app.use("/api", require("./routes/api"));
app.use(require("./routes/auth"));

// Error handling middleware
app.use(errorResponder);
// Default route for handling unmatched routes
app.all("*", (_, res) => res.sendStatus(404));

module.exports = app;

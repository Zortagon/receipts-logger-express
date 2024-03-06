const express = require("express");
const routes = require("./routes");

const connectDatabase = require("./database");

const jwt = require("jsonwebtoken");

connectDatabase({
    // Enable exiting the application if connection fails
    stopFailed: true,
    // Enable logging connection status
    logger: true,
});

const app = express();

app.use(express.json());

// Use the defined routes
app.use("/", routes);

module.exports = app;

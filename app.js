const express = require("express");

const connectDatabase = require("./database");

const jwt = require("jsonwebtoken");
const { handleError, createError } = require("./middlewares/ErrorMiddleware");

connectDatabase({
    // Enable exiting the application if connection fails
    stopFailed: true,
    // Enable logging connection status
    logger: true,
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the defined routes
app.use("/api", require("./routes/api"));
app.use(require("./routes/auth"));

app.get("/", (req, res) => {
    createError(400, "wadw")
});
// app.use(handleError);
app.all("*", (_, res) => res.sendStatus(404));

module.exports = app;

const express = require("express");
const cookieParser = require("cookie-parser");

const { errorResponder } = require("./middlewares/ErrorMiddleware");

const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());
// Middleware for parsing URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/set-cookies", (req, res) => {
    res.cookie("newUser", { hello: true }, { maxAge: 1000 * 60 * 60, httpOnly: true });
    res.sendStatus(200);
});

app.get("/get-cookies", (req, res) => {
    const cookies = req.cookies;
    console.info(cookies)
    res.json(cookies);
});

// Define routes
app.use("/api", require("./routes/api"));
app.use(require("./routes/auth"));

// Error handling middleware
app.use(errorResponder);
// Default route for handling unmatched routes
app.all("*", (_, res) => res.sendStatus(404));

module.exports = app;

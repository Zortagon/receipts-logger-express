const express = require("express");
const connect = require("./database");

const app = express();

app.get("/", async (_, res) => {
    let collection = await connect.collection("posts");
    let results = await collection.find({}).limit(50).toArray();

    res.send(results).status(200);
});

module.exports = app;

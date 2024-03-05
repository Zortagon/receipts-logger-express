const express = require("express");
const connectDatabase = require("./database");

const Receipt = require("./models/Receipt");

connectDatabase({
    // Enable exiting the application if connection fails
    stopFailed: true,
    // Enable logging connection status
    logger: true,
});

const app = express();

app.get("/", async (_, res) => {
    const receipt = new Receipt({
        amount: 1500000,
    });
    receipt.save();
    //     receipt_number: "03012024-000002",
    // });
    // console.info(receipt);

    res.send({ success: new Date() }).status(200);
});

module.exports = app;

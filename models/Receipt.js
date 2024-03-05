const mongoose = require("mongoose");

const receiptSchema = new mongoose.Schema({
    receipt_number: {
        type: String,
        required: true,
        unique: true,
    },
    amount: {
        type: Number,
        min: 0,
        required: true,
    },
    created_at: {
        type: String,
        default: () => Date.now(),
        immutable: true,
    },
    updated_at: {
        type: String,
        default: () => Date.now(),
    },
});

receiptSchema.pre("save", function (next) {
    // this.amount = 10;
    return next();
});

receiptSchema.methods.generateNumber = function () {
    console.info(this.receipt_number);
    return "0";
};

module.exports = mongoose.model("ads_receipt", receiptSchema);

const express = require("express");
const router = express.Router();

const ReceiptController = require("../controllers/api/ReceiptController");

router.get("/receipts", ReceiptController.index);
router.post("/receipts", ReceiptController.create);

module.exports = router;

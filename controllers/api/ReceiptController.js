const Receipt = require("../../models/Receipt");

class ReceiptController {
    /**
     * Get all receipts.
     * @param {Request} req - Express request object (unused).
     * @param {Response} res - Express response object.
     */
    async index(_, res) {
        const receipts = await Receipt.find({})
            .select("amount receipt_number")
            .exec();
        res.send(receipts);
    }
    /**
     * Create a new receipt.
     * @param {Request} req - Express request object (unused).
     * @param {Response} res - Express response object.
     */
    async create(_, res) {
        try {
            const amountRange = [500000, 750000, 1250000, 1750000];
            const receipt = new Receipt({
                receipt_number: Date.now(),
                amount: amountRange[
                    Math.floor(Math.random() * amountRange.length)
                ],
            });
            await receipt.save();
            res.sendStatus(200);
        } catch (error) {
            logger.error(error);
            res.sendStatus(500);
        }
    }
}

module.exports = new ReceiptController();

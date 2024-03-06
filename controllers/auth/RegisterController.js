const User = require("../../models/User");

const { json } = require("express");
const { logger } = require("../../utils");

const {
    createError,
    handleError,
} = require("../../middlewares/ErrorMiddleware");

class RegisterController {
    /**
     * Create a new receipt.
     * @param {Request} req - Express request object (unused).
     * @param {Response} res - Express response object.
     */
    index(_, res) {
        res.status(200).send({ message: "Register" });
    }

    /**
     * Create a new receipt.
     * @param {Request} req - Express request object (unused).
     * @param {Response} res - Express response object.
     */
    async authenticate(req, res) {
        const { email, password } = req.body;
        try {
            const user = await User.create({ email, password });
            return res.status(201).json(user);
        } catch (error) {
            logger.error(error);
            return handleError(res, { code: 500, message: error.message });
        }
    }
}

module.exports = new RegisterController();

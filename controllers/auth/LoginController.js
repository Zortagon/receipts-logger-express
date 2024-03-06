class LoginController {
    /**
     * Create a new receipt.
     * @param {Request} req - Express request object (unused).
     * @param {Response} res - Express response object.
     */
    index(_, res) {
        return res.status(200).send("Login");
    }

    /**
     * Create a new receipt.
     * @param {Request} req - Express request object (unused).
     * @param {Response} res - Express response object.
     */
    async authenticate(req, res) {
        const { email, password } = req.body;
        return res.status(200).send("New Login");
    }
}

module.exports = new LoginController();

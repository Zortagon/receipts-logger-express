/*
 * Module exports containing handlers for GET and POST requests related to user registration and login.
 *
 * For GET requests:
 *   - register: Handler for GET request to register endpoint, returns a success message.
 *   - login: Handler for GET request to login endpoint, returns a success message.
 *
 * For POST requests:
 *   - register: Handler for POST request to register endpoint, performs user registration.
 *   - login: Handler for POST request to login endpoint, performs user login.
 */
const User = require("../models/User");
const logger = require("../utils/logger");

const { throwHttpError } = require("../middlewares/ErrorMiddleware");
const { error } = require("../utils/logger");

module.exports = {
    GET: {
        /**
         * Handler for GET request to register endpoint, returns a success message.
         * @param {Object} req - Express request object.
         * @param {Object} res - Express response object.
         */
        register: (req, res) => {
            return res.status(200).send({ message: "<Register>" });
        },
        /**
         * Handler for GET request to login endpoint, returns a success message.
         * @param {Object} req - Express request object.
         * @param {Object} res - Express response object.
         */
        login: (req, res) => {
            return res.status(200).send({ message: "Login" });
        },
    },
    POST: {
        /**
         * Handler for POST request to register endpoint, performs user registration.
         * @param {Object} req - Express request object.
         * @param {Object} res - Express response object.
         * @param next
         */
        register: async function (req, res, next) {
            // TODO: Implement user registration
            const { email, password } = res.locals.body;
            try {
                const userExist = await User.findOne({ email });
                if (userExist) {
                    const message = "Email already in use, please use a different email address.";
                    throwHttpError(409, message);
                }

                const user = await User.create({ email, password });

                return res.status(201).json({ email, password });
            } catch (error) {
                next(error);
            }
        },
        /**
         * Handler for POST request to login endpoint, performs user login.
         * @param {Object} req - Express request object.
         * @param {Object} res - Express response object.
         */
        login: async (req, res) => {
            // TODO: Implement user login
        },
    },
};

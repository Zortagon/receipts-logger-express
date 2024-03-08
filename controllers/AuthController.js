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
            return res.status(200).send({ message: "Register" });
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
         */
        register: async function (req, res, next) {
            // TODO: Implement user registration
            const { email, password } = req.body;
            try {
                {
                    if (!(email || password)) {
                        let message = "email field not in body";
                        if (!password) {
                            message = "password field not in body";
                        }
                        throwHttpError(400, message);
                    }
                    if (password) {
                        const minlength = User.schema.obj.password.minlength;
                        if (password.length < minlength) {
                            throwHttpError(400, "password min 6 chars");
                        }
                    }
                    const user = await User.findOne({ email });
                    if (user) {
                        throwHttpError(400, "user aldready exist");
                    }
                }
                // console.info(User.schema.obj);
                // await User.findOne({ email }).then((user) => {
                //     if (user) throwHttpError(400, "memek");
                // });
                // const user = await User.create({ email, password });
                return res.status(201).json(req.body);
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

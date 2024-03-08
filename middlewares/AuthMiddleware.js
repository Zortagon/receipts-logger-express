/**
 * Module handling user registration.
 * This module validates the request body, ensuring required fields are present
 * and have the correct data types before proceeding with user registration.
 */

const mongoose = require("mongoose");
const User = require("../models/User");

const { throwHttpError } = require("../middlewares/ErrorMiddleware");
const { keysCheck, getSchemaField, typeCheck } = require("../utils/helpers");

// Importing validation utilities
const { isCorrectEmail, sanitizeString } = require("../utils/validation");
const validator = require("validator");

module.exports = {
    POST: {
        /**
         * Handles user registration requests.
         * Validates request body, ensuring required fields are present
         * and have the correct data types before proceeding with user registration.
         * @param {object} req - Express request object.
         * @param {object} res - Express response object.
         * @param {function} next - Express next function.
         */
        register: async (req, res, next) => {
            // Destructuring the register method from methodsHandler
            const { method } = checkHandler;
            try {
                const { email, password } = req.body;
                const userSchema = User.schema.obj;

                // Check for required fields in the request body
                await checkHandler.keysCheck(req.body, method.REGISTER);

                // Validate data types of required fields in the request body
                await checkHandler.typeCheck(req.body, method.REGISTER);

                // Validate password length
                if (password.length < userSchema.password.minlength) {
                    const message = `Password must be at least ${userSchema.password.minlength} characters long`;
                    throwHttpError(400, message);
                }

                // Proceed to the next middleware if all validations pass
                res.locals.body = { email, password };
                next();
            } catch (error) {
                // Pass any caught errors to the error-handling middleware
                next(error);
            }
        },
    },
};

/**
 * Object containing methods for handling parameter checks.
 * @namespace checkHandler
 */
const checkHandler = {
    /**
     * Asynchronously checks if the required keys are present in the given parameter object.
     * Throws an HTTP error if any required key is missing.
     * @param {Object} paramObject - The object to check for required keys.
     * @param {Symbol} method - The method symbol indicating the type of check to perform (REGISTER or LOGIN).
     * @throws {Error} Throws an HTTP error if any required key is missing.
     */
    keysCheck: async function (paramObject, method = null) {
        if (method === null || !(paramObject instanceof Object)) return;

        const requiredKeys = [];

        if (method === this.method.REGISTER) {
            const schema = getSchemaField(User, { requiredOnly: true });
            Object.keys(schema).map((key) => {
                requiredKeys.push(key);
            });
        } else if (method === this.method.LOGIN) {
            // TODO: Add logic to populate requiredKeys at method.LOGIN
        }
        const { success, missing } = await keysCheck(paramObject, requiredKeys);
        if (!success) {
            const message = `Missing required fields: (${missing.join(", ")})`;
            throwHttpError(400, message);
        }
    },
    /**
     * Asynchronously checks if the types of the fields in the given parameter object match the expected types.
     * Throws an HTTP error if any field has an invalid type.
     * @param {Object} paramObject - The object to check for type validation.
     * @param {Symbol} method - The method symbol indicating the type of check to perform (REGISTER or LOGIN).
     * @throws {Error} Throws an HTTP error if any field has an invalid type.
     */
    typeCheck: async function (paramObject, method) {
        if (method === null || !(paramObject instanceof Object)) return;

        let typeSchema = {};

        if (method === this.method.REGISTER) {
            const options = { requiredOnly: true, typeOnly: true };
            typeSchema = getSchemaField(User, options);
        } else if (method === this.method.LOGIN) {
            // TODO: Add logic to create 'typeSchema' at method.LOGIN
        }

        const { success, invalid } = await typeCheck(paramObject, typeSchema);
        if (!success) {
            const invalidField = Object.keys(invalid[0])[0];
            const expectedType = invalid[0][invalidField].expected;
            const message = `Invalid type at required field '${invalidField}' (expected: '${expectedType}')`;
            throwHttpError(400, message);
        }
    },
    /**
     * Enumeration of method symbols used to identify the type of check to perform.
     * @enum {Symbol}
     * @readonly
     */
    method: Object.freeze({
        /**
         * Symbol representing the REGISTER method.
         */
        REGISTER: Symbol("REGISTER"),
        /**
         * Symbol representing the LOGIN method.
         */
        LOGIN: Symbol("LOGIN"),
    }),
};

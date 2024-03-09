/*
 * Module for handling HTTP errors and sending error responses.
 * Exports two functions:
 *   - throwHttpError: Throws an HTTP error with given code, message, and optional details.
 *   - errorResponder: Middleware function to handle HTTP errors and send error responses.
 *
 * @param {number} code - HTTP status code for the error.
 * @param {string} message - Message describing the error.
 * @param {Object} details - Optional details about the error.
 */
const http = require("http");

module.exports = {
    /**
     * Throws an HTTP error with the given code, message, and optional details.
     *
     * @param code - HTTP status code for the error.
     * @param message - Message describing the error.
     * @param details - Optional details about the error.
     */
    throwHttpError: function (
        code = 500,
        message = "An unexpected error occurred, please try again later",
        details = undefined,
    ) {
        const error = new Error();
        error.statusCode = code;
        error.message = message;
        error.details = details;
        throw error;
    },

    /**
     * Middleware function to handle HTTP errors and send error responses.
     *
     * @param {Error} error - Error object containing statusCode, message, and details properties.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @param {Function} next - Express next middleware function.
     */
    errorResponder: (error, req, res, next) => {
        // Extract properties from the error object
        const { statusCode, message, details } = error;
        const httpCode = statusCode === undefined ? 500 : statusCode;
        // Get description of the status code from HTTP module
        const codeDescription = http.STATUS_CODES[httpCode] ?? undefined;
        // Construct error response object
        const errorResponse = {
            success: false,
            error: {
                status_code: `${httpCode} ${codeDescription ? `(${codeDescription})` : ""}`.trim(),
                message,
                details,
            },
        };

        // Set response header and send error response with appropriate status code
        res.header("Content-Type", "application/json");
        return res.status(httpCode).json(errorResponse);
    },
};

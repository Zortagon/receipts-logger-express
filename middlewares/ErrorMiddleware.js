/*
 * Module for handling errors and creating error responses.
 * Exports two functions:
 *   - createError: Creates an error response with given code and message.
 *   - handleError: Handles an error response and sends it back with appropriate status code.
 * 
 * @param {Object} response - Express response object.
 * @param {number} code - HTTP status code for the error response.
 * @param {string} message - Message describing the error.
 */
module.exports = {
    /**
     * Create an error response with the given code and message.
     * Calls handleError internally to handle the error response.
     * 
     * @param {Object} response - Express response object.
     * @param {number} code - HTTP status code for the error response.
     * @param {string} message - Message describing the error.
     */
    createError: function (response, code, message) {
        this.handleError(response, { code, message });
    },

    /**
     * Handles an error response and sends it back with appropriate status code.
     * 
     * @param {Object} response - Express response object.
     * @param {Object} error - Error object containing code and message properties.
     */
    handleError: function (response, error) {
        // Extract code and message from the error object
        const [code, message] = [
            error.code ?? 500,
            error.message ??
                "An unexpected error occurred, please try again later",
        ];

        // Send error response with appropriate status code
        return response
            .status(code)
            .send({ success: false, error: { status_code: code, message } });
    },
};

const validator = require("validator");

/**
 * Checks if the given string is a valid email address.
 *
 * @param {string} str - The string to check for validity.
 * @returns {boolean} - Returns true if the string is a valid email address, otherwise false.
 */
function isCorrectEmail(str) {
    // Perform correction on the email string
    const strCorrection = validator.isEmail(str, {
        allow_utf8_local_part: false,
    });
    // If correction fails, return false
    if (!strCorrection) return false;
    // Perform regex check for email format
    return /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm.test(strCorrection);
}

/**
 * Sanitizes a string by trimming whitespace and escaping HTML entities.
 * @param {string} str - The string to sanitize.
 * @returns {string} The sanitized string.
 */
function sanitizeString(str) {
    if (typeof str !== "string") {
        return str;
    }
    const { escape, trim } = validator;
    return escape(trim(str));
}

/**
 * Recursively sanitizes all string values in the given object by trimming whitespace and escaping HTML entities.
 * @param {Object} inputObject - The object to sanitize.
 * @returns {Object} The sanitized object.
 */
function sanitizeObject(inputObject) {
    Object.entries(inputObject).forEach(([key, value]) => {
        if (typeof value === "string") {
            inputObject[key] = sanitizeString(value);
        } else if (typeof value === "object") {
            sanitizeObject(value);
        }
    });
    return inputObject;
}

module.exports = { isCorrectEmail, sanitizeString };

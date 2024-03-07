const chalk = require("chalk");

/**
 * Logger utility for printing messages with color-coded prefixes.
 */
const logger = {
    /**
     * Prints the given message with a specified prefix and color.
     * @param {string} prefix - The prefix to prepend to the message.
     * @param {string|string[]} message - The message or array of messages to print.
     * @param {string} color - The color of the message.
     */
    print: function (prefix, message, color) {
        if (Array.isArray(message)) {
            message.map((m) =>
                console.info(chalk[color](prefix, m.toString())),
            );
            return;
        }
        console.info(chalk[color](prefix, message.toString()));
        return;
    },
    /**
     * Prints an informational message.
     * @param {string|string[]} message - The message or array of messages to print.
     */
    info: function (message) {
        prefix = "[INFO]:";
        this.print(prefix, message, "white");
    },
    /**
     * Prints a warning message.
     * @param {string|string[]} message - The message or array of messages to print.
     */
    warn: function (message) {
        prefix = "[WARN]:";
        this.print(prefix, message, "yellow");
    },
    /**
     * Prints an error message.
     * @param {string|string[]} message - The message or array of messages to print.
     */
    error: function (message) {
        prefix = "[ERROR]:";
        this.print(prefix, message, "red");
    },
};

module.exports = logger;

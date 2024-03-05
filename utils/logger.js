// * Use a colorful library for terminal output
const chalk = require("chalk");

const logger = {
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
    info: function (message) {
        prefix = "[INFO]:";
        this.print(prefix, message, "white");
    },
    warn: function (message) {
        prefix = "[WARN]:";
        this.print(prefix, message, "yellow");
    },
    error: function (message) {
        prefix = "[ERROR]:";
        this.print(prefix, message, "red");
    },
};

module.exports = logger;

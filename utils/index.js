function getDateFormatted(date = new Date()) {
    return [
        String(date.getDate()).padStart(2, "0"),
        String(date.getMonth() + 1).padStart(2, "0"),
        date.getFullYear(),
    ].join("");
}

module.exports = { logger: require("./logger"), getDateFormatted };

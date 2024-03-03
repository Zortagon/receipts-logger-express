const { MongoClient } = require("mongodb");

const { DB_NAME, DB_URI } = process.env;
if (!DB_URI || !DB_NAME) {
    throw new Error(
        `Missing environment variable(s): ${!DB_URI ? "DB_URI" : null} ${!DB_NAME ? "DB_NAME" : null}`,
    );
}

const client = new MongoClient(DB_URI);

const connect = async () => {
    try {
        const conn = await client.connect();
        return conn.db(DB_NAME);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
};

module.exports = connect;

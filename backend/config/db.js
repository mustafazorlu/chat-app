const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const db_con = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MONGODB connected: ${db_con.connection.host} `);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit();
    }
};

module.exports = connectDB;

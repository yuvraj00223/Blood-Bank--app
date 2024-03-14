const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`Connected to MongoDB database at ${mongoose.connection.client.s.url}`.green);
    } catch (error) {
        console.error(`MongoDB Database Error: ${error.message}`.bgRed.white);
    }
};

module.exports = connectDB;

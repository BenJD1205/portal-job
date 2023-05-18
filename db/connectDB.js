const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected MongoDB success!");
    } catch (err) {
        console.log("Connected MongoDB fail!");
        process.exit(1);
    }
};

module.exports = connectDb;

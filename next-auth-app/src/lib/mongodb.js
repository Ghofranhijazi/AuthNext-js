// في src/lib/mongodb.js
import mongoose from "mongoose";

const connectDB = async () => {
    if (mongoose.connections[0].readyState) {
        return; // قاعدة البيانات متصلة مسبقاً
    }
    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

export default connectDB;

import mongoose from "mongoose";
import dotenv from 'dotenv';
import colors from 'colors';


dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`.bgMagenta);
    } catch (error) {
        console.log(`Error while DB connection : ${error.message}`.bgGreen.blue);
        process.exit();
    }
}

export default connectDB;
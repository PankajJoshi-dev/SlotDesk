import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB.");
  } catch (error) {
    console.error("Mongo DB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;

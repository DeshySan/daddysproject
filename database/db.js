import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://localhost:27017/daddy");
    console.log(`Connected to ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;

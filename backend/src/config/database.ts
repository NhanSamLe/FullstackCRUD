import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config'; 

const connectDB = async() => {
   try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log(`MongoDB connected, state: ${mongoose.connection.readyState}`);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    }

};
export default connectDB;

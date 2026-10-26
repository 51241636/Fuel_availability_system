import express, { NextFunction, Request, Response } from "express";
import connectDB from "./config/database";
import userRouter from "../src/routes/userRoutes";
// var cors = require('cors')
import cors from 'cors';
import "dotenv/config";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRouter from "./routes/authRoute";
import stationRouter from "./routes/fuelStationRoute";


const MONGO_URL = process.env.MONGO_URI || ""
const PORT: number = Number(process.env.PORT) || 3000;

const app = express();
const corsOptions: cors.CorsOptions = {
  origin: 'http://localhost:5173', // Allow only your React app's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Allow to transfer cookies with cross origin requests
};
app.use(cors(corsOptions));


app.use(express.json());

app.use(cookieParser())

connectDB()

app.use("/api",userRouter);
app.use("/api",authRouter)
app.use("/api",stationRouter)
app.use((err:Error ,req:Request, res:Response, next:NextFunction) => {
  console.log(err.message);
  res.status(500).json({ message:err.message });
});

// connectDB();
// app.use("/api",)


app.listen(process.env.PORT, () => {
    console.log("Server running on port 3000");
});
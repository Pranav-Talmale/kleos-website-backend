import path from "path";
import express from "express";
import dotenv from "dotenv";
import Razorpay from "razorpay";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import allowedOrigins from "./config/allowedOrigins.js";
import credentials from "./middleware/credentials.js";



const corsConfig = cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,PUT,POST",
  credentials: true, // Allow credentials like HTTP-only cookies
});

const port = process.env.PORT || 5000;

connectDB();

const razorPayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_APT_SECRET,
});

const app = express();
app.use(cookieParser());
app.set('trust proxy', 1);
app.use(credentials);
app.use(corsConfig);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/payment", paymentRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

export {
  razorPayInstance
};

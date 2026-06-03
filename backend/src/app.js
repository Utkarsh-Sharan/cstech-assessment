import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json({limit: "16kb"}));
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-type", "Authorization"],
    })
);

import authRoutes from "./routes/auth.routes.js";

app.use("/api/v1/auth", authRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        statusCode: err.statusCode || 500,
        message: err.message || "Something went wrong!",
        errors: err.errors || null,
        data: err.data || null,
        ...(process.env.NODE_ENV !== "production" && {stack: err.stack}),
    });
});

export default app;
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

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

export default app;
import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json({limit: "16kb"}));
app.use(cookieParser());

import authRoutes from "./routes/auth.routes.js";
import agentRoutes from "./routes/agent.routes.js";

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/agent", agentRoutes);

export default app;
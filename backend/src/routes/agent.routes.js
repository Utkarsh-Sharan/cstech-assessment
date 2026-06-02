import { Router } from "express";
import { createAgent } from "../controllers/agent.controllers.js";

const router = Router();

router.route("/create").post(createAgent);

export default router;
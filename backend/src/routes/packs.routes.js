
import { Router } from "express";
import { openPack } from "../controllers/packs.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router()

router.get("/open/:type", authMiddleware, openPack)

export default router
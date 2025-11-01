
import { Router } from "express";
import { createMazo, deleteMazo, getMazoByUser, updateMazo } from "../controllers/mazo.controller.js";

const router = Router()

router.post("/create", createMazo)
router.get("/get", getMazoByUser)
router.put("/update", updateMazo)
router.delete("/delete", deleteMazo)

export default router

import { Router } from "express";
import {
  allPlayers,
  createPlayer,
  deletePlayer,
  myPlayers,
  updatePlayer,
} from "../controllers/player.controller.js";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import { admin } from "../middlewares/admin.middleware.js";

const router = Router();

// público
router.get("/all", allPlayers);

// autenticado
router.get("/myPlayers", authMiddleware, myPlayers);

// admin
router.post("/add", authMiddleware, admin, createPlayer);
router.put("/update/:pid", authMiddleware, admin, updatePlayer);
router.delete("/delete/:pid", authMiddleware, admin, deletePlayer);

export default router;

import { Router } from "express";
import {
  allUsers,
  byMail,
  byUsername,
  deleteUser,
  login,
  logout,
  profile,
  register,
  updateUser,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

// POST
router.post("/register", register); // swagger-docs
router.post("/login", login); // swagger-docs
router.post("/logout", logout);

// GET
router.get("/profile", authMiddleware, profile); // swagger-docs
router.get("/allUsers", allUsers);
router.get("/byUsername/:username", byUsername);

// PUT
router.put("/updateUser/:uid", authMiddleware, updateUser);

// DELETE
router.delete("/deleteUser/:uid", deleteUser);

export default router;

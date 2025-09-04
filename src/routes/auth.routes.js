import { Router } from "express";
import { register, login, logout, profile} from "../controllers.js/auth.controllers.js";
import { authMiddleware } from "../middewares/auth.js";
import { adminVerify } from "../middewares/admin.js";

const router = Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.post("/auth/logout", logout);
router.get("/profile", authMiddleware, profile);

export default router;
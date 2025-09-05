import { Router } from "express";
import { register, login, logout, profile, updateProfile} from "../controllers.js/auth.controllers.js";
import { authMiddleware } from "../middewares/auth.js";
import { adminVerify } from "../middewares/admin.js";
import { ownerArticle } from "../middewares/owner.js";
import { loginValidations, registerValidations, updateProfileValidations } from "../middewares/validations/auth.validations.js";
import { validator } from "../middewares/validator.js";

const router = Router();

router.post("/auth/register", registerValidations, validator, register);
router.post("/auth/login", loginValidations, validator, login);
router.post("/auth/logout", logout);
router.get("/auth/profile", authMiddleware, profile);
router.put("/auth/profile/:id", authMiddleware, updateProfileValidations, validator,  updateProfile);

export default router;
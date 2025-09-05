import { Router } from "express";
import { authMiddleware } from "../middewares/auth.js";
import { adminVerify } from "../middewares/admin.js";
import { deleteUser, getUserBYId, getUsers, updateUser } from "../controllers.js/user.controller.js";
import { deleteUserValidations, getUserByIdValidations, updateUserValidations } from "../middewares/validations/user.validation.js";
import {validator} from "../middewares/validator.js"

const router = Router();

router.get("/users", authMiddleware, adminVerify, getUsers);
router.get("/users/:id", authMiddleware, adminVerify, getUserByIdValidations, validator, getUserBYId);
router.put("/users/:id", authMiddleware, adminVerify, updateUserValidations, validator, updateUser);
router.delete("/users/:id", authMiddleware, adminVerify, deleteUserValidations, validator, deleteUser);

export default router;
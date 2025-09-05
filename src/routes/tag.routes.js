import { Router } from "express";
import {validator} from "../middewares/validator.js"
import { authMiddleware } from "../middewares/auth.js";
import { createTag, deleteTag, getTagBYId, getTags, updateTag } from "../controllers.js/tag.controller.js";
import { adminVerify } from "../middewares/admin.js";
import { createTagValidations, deleteTagValidations, getTagByIdValidations, updateTagValidations } from "../middewares/validations/tag.validations.js";
const router = Router();

router.get("/tags", authMiddleware, getTags)
router.get("/tags/:id",authMiddleware, adminVerify, getTagByIdValidations, validator, getTagBYId);
router.post("/tags", authMiddleware, adminVerify, createTagValidations, validator, createTag);
router.put("/tags/:id", authMiddleware, adminVerify, updateTagValidations, validator, updateTag);
router.delete("/tags/:id", authMiddleware, adminVerify, deleteTagValidations, validator, deleteTag);

export default router;
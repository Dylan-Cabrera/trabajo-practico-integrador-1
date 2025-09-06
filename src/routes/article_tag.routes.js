import { Router } from "express";
import {validator} from "../middewares/validator.js"
import { authMiddleware } from "../middewares/auth.js";
import { ownerArticle } from "../middewares/owner.js";
import { createArticleTagValidations, deleteArticleTagValidations } from "../middewares/validations/article_tag.validations.js";
import { createArticleTag, deleteArticleTag } from "../controllers.js/article_tag.controller.js";

const router = Router();

router.post("/articles-tags", authMiddleware,  createArticleTagValidations, validator, createArticleTag);
router.delete("/articles-tags/:id", authMiddleware, deleteArticleTagValidations, validator, deleteArticleTag);

export default router; 
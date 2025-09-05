import { Router } from "express";
import {validator} from "../middewares/validator.js"
import { authMiddleware } from "../middewares/auth.js";
import { createArticle, deleteArticle, getArticleBYId, getArticleBYIdPrivate, getArticles, getArticlesPrivate, updateArticle } from "../controllers.js/article.controller.js";
import { createArticleValidations, deleteArticleValidations, getArticleByIdValidations, updateArticleValidations } from "../middewares/validations/article.validations.js";
import { ownerArticle } from "../middewares/owner.js";
const router = Router();

router.get("/articles", authMiddleware, getArticles);
router.get("/articles/:id", authMiddleware, getArticleByIdValidations, validator, getArticleBYId);
router.get("/articles/user", authMiddleware, getArticlesPrivate);
router.get("/articles/user/:id", authMiddleware, getArticleByIdValidations, validator, getArticleBYIdPrivate);
router.post("/articles", authMiddleware, createArticleValidations, validator, createArticle);
router.put("/articles/:id", authMiddleware, ownerArticle, updateArticleValidations, validator, updateArticle);
router.put("/articles/:id", authMiddleware, ownerArticle, deleteArticleValidations, validator, deleteArticle);


export default router;
import { ExpressValidator } from "express-validator";
import { body, param } from "express-validator";
import { TagModel } from "../../models/tag.model.js";
import { ArticleModel } from "../../models/article.model.js";
import { ArticleTagModel } from "../../models/article_tag.model.js";

export const createArticleTagValidations = [
    body("tag_id").isInt().withMessage("El id debe ser un número entero")
            .custom(async (value)=> {
                    const tag = await TagModel.findByPk(value);
                    if(!tag) {
                        throw new Error('No existe una tag con ese id')
                    }
                })
    ,
    body("article_id").isInt().withMessage("El id debe ser un número entero")
            .custom(async (value)=> {
                    const article = ArticleModel.findByPk(value);
                    if(!article) {
                        throw new Error('No existe un article con ese id')
                    }
                })
            .custom( async (value, {req})=> {
                    const article = ArticleModel.findByPk(value);
                    if(article.user_id != req.userLogged.id)  {
                        throw new Error('No autorizado')
                    }
                })
];

export const deleteArticleTagValidations = [
    param("id").isInt().withMessage("El id debe ser un número entero")
        .custom(async (value)=> {
                const articleTag = ArticleTagModel.findByPk(value);
                if(!articleTag) {
                    throw new Error('No existe un articleTag con ese id')
                }
            })
    
        .custom( async (value, {req}) => {
            const articleTag = await ArticleTagModel.findByPk(value);
            const article = await ArticleModel.findByPk(articleTag.article_id);
            if(!article) {
                throw new Error('No existe un article con ese id')
            }
            if(article.user_id != req.userLogged.id) {
                throw new Error('No autorizado')
            }
        })
];
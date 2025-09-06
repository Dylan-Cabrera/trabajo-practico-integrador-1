import { ExpressValidator } from "express-validator";
import { body, param } from "express-validator";
import { ArticleModel } from "../../models/article.model.js";
import { UserModel } from "../../models/user.model.js";

export const getArticleByIdValidations = [
    param("id").isInt().withMessage("El id debe ser un número entero")
        .custom(async (value)=> {
                const article = ArticleModel.findByPk(value);
                if(!article) {
                    throw new Error('No existe un article con ese id')
                }
            })
];

export const createArticleValidations = [
    body("title").notEmpty().withMessage("El title no puede estar vacío")
    .isLength({min: 3, max: 200}).withMessage("El title debe tener entre 3 y 200 carácteres")
    ,
    body("content").notEmpty().withMessage("El contentt no puede estar vacío")
    .isLength({min: 50}).withMessage("El content debe tener mínimo 50 carácteres")
    ,
    body("excerpt").notEmpty().withMessage("El excerpt no puede estar vacío")
    .isLength({max: 500}).withMessage("El excerpt debe tener mínimo 50 carácteres")
    ,
    body("status")
    .custom(
        async(value) => {
            const status = ["published", "archived"]
            if(!status.includes(value)) {
                throw new Error("Status invalido")
            }
        }
    )

];

export const updateArticleValidations = [
    param("id").isInt().withMessage("El id debe ser un número entero")
        .custom(async (value)=> {
                const article = ArticleModel.findByPk(value);
                if(!article) {
                    throw new Error('No existe un article con ese id')
                }
            })
        .optional()
    ,
    body("title").notEmpty().withMessage("El title no puede estar vacío")
    .isLength({min: 3, max: 200}).withMessage("El title debe tener entre 3 y 200 carácteres")
    .optional()
    ,
    body("content").notEmpty().withMessage("El constent no puede estar vacío")
    .isLength({min: 50}).withMessage("El content debe tener mínimo 50 carácteres")
    .optional()
    ,
    body("excerpt").notEmpty().withMessage("El excerpt no puede estar vacío")
    .isLength({max: 500}).withMessage("El excerpt debe tener mínimo 50 carácteres")
    .optional()
    ,
    body("status")
    .custom(
        async(value) => {
            const status = ["published", "archived"]
            if(!status.includes(value)) {
                throw new Error("Status invalido")
            }
        }
    )
    .optional()
];

export const deleteArticleValidations = [
    param("id").isInt().withMessage("El id debe ser un número entero")
        .custom(async (value)=> {
                const article = ArticleModel.findByPk(value);
                if(!article) {
                    throw new Error('No existe un article con ese id')
                }
            })
];
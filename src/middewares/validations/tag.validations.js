import { ExpressValidator } from "express-validator";
import { body, param } from "express-validator";
import { TagModel } from "../../models/tag.model.js";

export const createTagValidations = [
    body("name").notEmpty().withMessage("El nombre no puede estar vacío")
    .matches(/^[^\s]+$/).withMessage("El nombre de usuario no puede contener espacios")
    .isLength({min: 2, max: 30})
]

export const updateTagValidations = [
    body("name").notEmpty().withMessage("El nombre no puede estar vacío")
    .matches(/^[^\s]+$/).withMessage("El nombre de usuario no puede contener espacios")
    .isLength({min: 2, max: 30})
]

export const getTagByIdValidations = [
    param("id").isInt().withMessage("El id debe ser un número entero")
        .custom(async (value)=> {
                const tag = TagModel.findByPk(value);
                if(!tag) {
                    throw new Error('No existe una tag con ese id')
                }
            })
]

export const deleteTagValidations = [
    param("id").isInt().withMessage("El id debe ser un número entero")
        .custom(async (value)=> {
                const tag = TagModel.findByPk(value);
                if(!tag) {
                    throw new Error('No existe una tag con ese id')
                }
            })
]
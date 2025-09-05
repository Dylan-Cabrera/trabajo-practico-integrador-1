import { ExpressValidator } from "express-validator";
import { body, param } from "express-validator";
import { Op } from "sequelize";
import { UserModel } from "../../models/user.model.js";

export const getUserByIdValidations = [
    param("id").isInt().withMessage("El id debe ser un número entero")
    .custom(async (value)=> {
            const user = UserModel.findByPk(value);
            if(!user) {
                throw new Error('No existe un usuario con ese id')
            }
        })
];

export const updateUserValidations = [
    param("id").isInt().withMessage("El id debe ser un número entero")
    .custom(async (value)=> {
            const user = UserModel.findByPk(value);
            if(!user) {
                throw new Error('No existe un usuario con ese id')
            }
        })
    ,
    body("username").notEmpty().withMessage("El username no puede estar vacío")
        .isAlphanumeric()
        .isLength({min: 2, max: 20 })
        .custom(
            async(value, {req}) => {
                const user = await UserModel.findOne({
                    where: {
                        username: value,
                        id: {[Op.ne]: req.params.id}
                    }
                });
    
                if(user) {
                    throw new Error("Ya existe un User con ese nombre")
                }
            }
        )
        .optional()
    ,
    body("email").notEmpty().withMessage("El campo email no puede estar vacío")
        .isEmail().withMessage("Formato de email invalido")
        .custom(
            async(value, {req}) => {
                const email = await UserModel.findOne({
                    where: {
                        email: value,
                        id: { [Op.ne] : req.params.id}
                    }
                });
    
                if(email) {
                    throw new Error("Email ya registrado")
                }
            }
        )
        .optional()
        ,
        body("role")
    .custom(
        async(value) => {
            const roles = ["user", "admin"]
            if(!roles.includes(value)) {
                throw new Error("Role invalido")
            }
        }
    )
        ,
        body("password").notEmpty().withMessage("El campo contraseña no puede estar vacío")
        .optional()
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/).withMessage("La contraseña debe tener al menos una mayúscula, una mínuscula, un número y 8 carácteres")
];

export const deleteUserValidations = [
    param("id").isInt().withMessage("El id debe ser un número entero")
    .custom(async (value)=> {
            const user = UserModel.findByPk(value);
            if(!user) {
                throw new Error('No existe un usuario con ese id')
            }
        })
];
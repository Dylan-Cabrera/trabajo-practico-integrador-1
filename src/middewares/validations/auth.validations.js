import { ExpressValidator } from "express-validator";
import { body, param } from "express-validator";
import { ProfileModel } from "../../models/profile.model.js";
import { UserModel } from "../../models/user.model.js";

export const registerValidations = [
    body("username").notEmpty().withMessage("El username no puede estar vacío")
    .isAlphanumeric()
    .isLength({min: 2, max: 20 })
    .custom(
        async(value) => {
            const user = await UserModel.findOne({
                where: {
                    username: value
                }
            });

            if(user) {
                throw new Error("Ya existe un User con ese nombre")
            }
        }
    )
    ,
    body("first_name")
    .trim()
    .notEmpty().withMessage("El nombre no puede estar vacío")
    .isString()
    .isLength({min: 2, max: 50 })
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/).withMessage("El nombre solo admite letras y espacios") //solo letras
    ,
    body("last_name")
    .trim()
    .notEmpty().withMessage("El apellido no puede estar vacío")
    .isString()
    .isLength({min: 2, max: 50 })
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/).withMessage("El apellido solo admite letras y espacios")
    ,
    body("password").notEmpty().withMessage("El campo contraseña no puede estar vacío")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/).withMessage("La contraseña debe tener al menos una mayúscula, una mínuscula, un número y 8 carácteres")
    ,
    body("email").notEmpty().withMessage("El campo email no puede estar vacío")
    .isEmail().withMessage("Formato de email invalido")
    .custom(
        async(value) => {
            const email = await UserModel.findOne({
                where: {
                    email: value
                }
            });

            if(email) {
                throw new Error("Email ya registrado")
            }
        }
    )
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

]

export const loginValidations = [
    body("username").notEmpty().withMessage("El username no puede estar vacío")
    .isAlphanumeric()
    .custom(
        async(value) => {
            const user = await UserModel.findOne({
                where: {
                    username: value
                }
            });

            if(!user) {
                throw new Error("Usuario no encontrado")
            }
        }
    )
    ,
    body("password").notEmpty().withMessage("El campo contraseña no puede estar vacío")
]


export const updateProfileValidations = [
    param("id").isInt().withMessage("EL id debe ser un entero")
    .custom(
        async (value) => {
            const profile = await ProfileModel.findByPk(value);
            if(!profile) {
                throw new Error("Profile no encontrado")
            }
    }
    )
    ,
    body("first_name")
    .trim()
    .notEmpty().withMessage("El nombre no puede estar vacío")
    .isString()
    .isLength({min: 2, max: 50 }).withMessage("El nombre debe tener un mínimo de 2 y un máximo de 50 carácteres")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/).withMessage("El nombre solo admite letras y espacios")
    .optional()
    ,
    body("last_name")
    .trim()
    .notEmpty().withMessage("El apellido no puede estar vacío")
    .isString()
    .isLength({min: 2, max: 50 }).withMessage("El apellido debe tener un mínimo de 2 y un máximo de 50 carácteres")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?:\s[A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/).withMessage("El apellido solo admite letras y espacios")
    .optional()
    ,
    body("biography")
    .trim()
    .notEmpty().withMessage("La biografíia no puede estar vacía")
    .isString()
    .isLength({min: 2, max: 50 })
    .optional()
    ,
    body("avatar_url")
    .isURL()
    .optional()
    ,
    body("birth_date").isDate().withMessage("Formato de fecha invalido")
    .optional()
]
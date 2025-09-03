import { ExpressValidator } from "express-validator";
import { body, param } from "express-validator";

export const registerValidations = [
    body("username").notEmpty().withMessage()
]
import { UserModel } from "../models/user.model.js";
import { ProfileModel } from "../models/profile.model.js";
import jwt from "jsonwebtoken";
import bcryp from "bcrypt"
import { sequelize } from "../config/database.js";
import { bcrypHash } from "../helpers/bcryp.helper.js";

export const register = async(req,res) => {
    const {username, email, password, role, first_name, last_name} = req.body;
    const transaction = await sequelize.transaction();
    try {
        const hashedPassword= await bcrypHash(password);

        const user = await UserModel.create({
           username: username,
           email: email,
           password: hashedPassword,
            role: role
        }, 
        {
            transaction
        });

        console.log(user.dataValues.id)
        
        await ProfileModel.create({
            first_name: first_name,
            last_name: last_name,
            user_id: user.dataValues.id
        },
        {
            transaction
        });

        await transaction.commit();

        res.status(201).json({
            msg: "Usuario creado exitosamente"
        })
        
        
    } catch (error) {
        await transaction.rollback();
        res.status(500).json({error}),
        console.error(error)
    }
};

export const login = async(req,res) => {
    const {username, password} = req.body;
    try {
        
    } catch (error) {
        
    }
};

export const logout = async(req,res) => {
    try {
        
    } catch (error) {
        
    }
};
import { UserModel } from "../models/user.model.js";
import { ProfileModel } from "../models/profile.model.js";
import { sequelize } from "../config/database.js";
import { bcrypCompare, bcrypHash } from "../helpers/bcryp.helper.js";
import { generateToken } from "../helpers/jwt.helper.js";
import { matchedData } from "express-validator";

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
        const user = await UserModel.findOne({
            where: {username: username},
            include: {
                model: ProfileModel,
                as: "profile",
                attributes: ["first_name", "last_name"]
            }
        });
        if(!user) {
            return res.status(401).json({
                msg: "Credenciales inválidas"
            })
        };
        console.log(user)

        const validPassword = await bcrypCompare(password, user.dataValues.password);
        if(!validPassword){
            return res.status(401).json({
                msg: "Credenciales inválidas"
            })
        };

        const token = generateToken(user);

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000* 60* 60
        })

        return res.status(200).json({
            msg: "Logueado correctamente"
        })

    } catch (error) {
         res.status(500).json({error})
    }
};

export const logout = async(req,res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({
            msg: "Logout exitoso"
        })
    } catch (error) {
         res.status(500).json({error})
    }
};

export const profile = async (req,res) => {
    
    try {
        const user = req.userLogged;
        console.log(user)
        res.status(200).json({
            first_name: user.first_name,
            last_name: user.last_name
        })
    } catch (error) {
        res.status(500).json({
            msg: "Error interno de servidor"
        })
        console.log(error)
    }
};

export const updateProfile = async (req,res) => {
    try {
        //const data = matchedData(req, {locations: ["body"]});
        const profile= await ProfileModel.update(req.body, {
        where: {
            id: req.params.id
        }
    });
    res.status(200).json(profile);
    

    } catch (error) {
         res.status(500).json({
            msg: "Error interno del servidor" + error
         })
    }
};
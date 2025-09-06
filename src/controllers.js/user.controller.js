import { Model, where } from "sequelize";
import { UserModel } from "../models/user.model.js";
import { ProfileModel } from "../models/profile.model.js";
import { ArticleModel } from "../models/article.model.js";
import { bcrypHash } from "../helpers/bcryp.helper.js";

export const getUsers = async (req,res) => {
    try {
        const users = await UserModel.findAll({
            include: {
                model: ProfileModel,
                as: "profile",
                attributes: {
                    exclude: ["user_id"]
                }
            }
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json("Error interno del servidor" + error)
    }
};

export const getUserBYId = async (req,res) => {
    try {
        const user = await UserModel.findByPk(req.params.id, {
            attributes: ["username", "email"] ,
            include: [
                {
                model: ProfileModel,
                as: "profile",
                attributes: {
                    exclude: ["user_id", "updatedAt","createdAt", "updatedAt" ]
                }
            }, 
            {
                model: ArticleModel,
                as: "articles",
                attributes: {
                    exclude: ["tag_id", "user_id", "createdAt", "updatedAt"]
                }
            }
            ]
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json("Error interno del servidor" + error)
    }
};

export const updateUser = async (req,res) => {
    const {password, email, username} = req.body;
    const id = await req.params.id;
    try {
        const hashedPassword= await bcrypHash(password);

        const update = await UserModel.update({username, email, hashedPassword}, {where: {
            id: id
        }});

        if(update){
            const user = await UserModel.findByPk(req.params.id);
            res.status(200).json(user);
        }

    } catch (error) {
        res.status(500).json("Error interno del servidor" + error)
    }
};



export const deleteUser = async (req,res) => {
    try {
        const user = await UserModel.findByPk(req.params.id);4
        await user.destroy();
        res.status(200).json({
            msg: "Usuario eliminado con exito"
        })
    } catch (error) {
        res.status(500).json("Error interno del servidor, error:" + error);
    }
};
//verificar si el elemento le pertenece al usuario

import { ArticleModel } from "../models/article.model.js";
import { ProfileModel } from "../models/profile.model.js";

export const ownerArticle = async (req, res, next) => {
    try {
        const user = req.userLogged;

        const article = await ArticleModel.findByPk(req.params.id);
        if(!article) {
            res.status(404).json("Article no encontrado")
        }
    
        console.log(article)
        if(!(user.role === "admin")) {
            if(!(article.dataValues.user_id === user.id)) {
                return res.status(403).json({
                    msg: "Usuario no autorizado"
                });

            }
        };
        
        next();

    } catch (error) {
        res.status(500).json({
            msg: "Error al verificar owner" + error
        })}};

export const ownerProfile = async (req, res, next) => {
    try {
        const user = req.userLogged;

        const profile = await ProfileModel.findByPk(req.params.id);
    
        if(profile.user_id != user.id) {
            return res.status(403).json({
                msg: "Usuario no autorizado"
            })}

        next();

    } catch (error) {
        res.status(500).json({
            msg: "Erro al verificar owner" + error
        })}}



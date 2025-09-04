//verificar si el elemento le pertenece al usuario

import { ArticleModel } from "../models/article.model.js";
import { ProfileModel } from "../models/profile.model.js";

export const ownerVerify = (req, res, next) => {
    try {
        const user = req.userLogged;

    
        const recurso = ArticleModel.findByPk(req.params.id) || ProfileModel.findByPk(req.params.id);

        if(recurso.dataValues.user_id != user.id) {
            return res.status(403).json({
                msg: "Usuario no autorizado"
            })
        };

        next();

    } catch (error) {
        res.status(500).json({
            msg: ""
        })
    }
};
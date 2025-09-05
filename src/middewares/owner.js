//verificar si el elemento le pertenece al usuario

import { ArticleModel } from "../models/article.model.js";


export const ownerArticle = async (req, res, next) => {
    try {
        const user = req.userLogged;

        const article = await ArticleModel.findByPk(req.params.id);
    
        if(article.user_id != user.id) {
            return res.status(403).json({
                msg: "Usuario no autorizado"
            })}

        next();

    } catch (error) {
        res.status(500).json({
            msg: "Erro al verificar owner" + error
        })}}


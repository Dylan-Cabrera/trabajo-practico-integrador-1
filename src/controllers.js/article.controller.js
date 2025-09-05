import { where } from "sequelize";
import { ArticleModel } from "../models/article.model.js";

export const updateArticle = async (req,res) => {
    const {title, content, excerpt, status} = req.body;
    try {
    
        const update = await ArticleModel.update({title, content, excerpt, status}, {where: {
            id: req.params.id
        }});

        if(update){
            const article = await ArticleModel.findByPk(req,params.id);
            res.status(200).json(article);
        }

    } catch (error) {
        res.status(500).json("Error interno del servidor" + error)
    }
};

export const getArticles = async (req,res) => {
    try {
        const articles = await ArticleModel.findAll();
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json("Error interno del servidor" + error)
    }
};

export const getArticleBYId = async (req,res) => {
    try {
        const article = await ArticleModel.findByPk(req.params.id);
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json("Error interno del servidor" + error)
    }
};

export const getArticlesPrivate = async (req,res) => {
    try {
        const user = req.userLogged;
        const articles = await ArticleModel.findAll({
            where: { 
                user_id: user.id
            }
        });
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json("Error interno del servidor" + error)
    }
};

export const getArticleBYIdPrivate = async (req,res) => {
    try {
        const user = req.userLogged;
        const article = await ArticleModel.findByPk(req.params.id, {
            where: { 
                user_id: user.id
            }
        });
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json("Error interno del servidor" + error)
    }
};




const deleteArticle = async (req,res) => {
    try {
        const article = await ArticleModel.findByPk(req.params.id);
        await article.destroy();
        res.status(200).json({
            msg: "Articulo eliminado con exito"
        })
    } catch (error) {
        res.status(500).json("Error interno del servidor" + error);
    }
};

import { ArticleTagModel } from "../models/article_tag.model.js";


export const createArticleTag = async (req,res) => {
    const {article_id, tag_id} = req.body;
    try {
        const articleTag = await ArticleTagModel.create({article_id, tag_id});
        res.status(201).json(articleTag)
    } catch (error) {
        res.status(500).json("Error interno del servidor" + error)
    }  
};

export const deleteArticleTag = async (req,res) => {
    try {
        const articleTag = await ArticleTagModel.findByPk(req.params.id);
        await articleTag.destroy();
        res.status(200).json({
            msg: "article_tag eliminado con exito"
        })
    } catch (error) {
        res.status(500).json("Error interno del servidor" + error);
    }
};
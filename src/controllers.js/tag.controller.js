import { TagModel } from "../models/tag.model.js";

export const createTag = async (req,res) => {
    const {name} = req.body;
    try {
        const tag = await TagModel.create({name});
        res.status(201).json(tag)
    } catch (error) {
        res.status(500).json("Error interno del servidor" + error)
    }  
};

export const getTags = async (req,res) => {
    try {
        const tags = await TagModel.findAll();
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json("Error interno del servidor" + error)
    }
};

export const getTagBYId = async (req,res) => {
    try {
        const tag = await TagModel.findByPk(req.params.id);
        res.status(200).json(tag);
    } catch (error) {
        res.status(500).json("Error interno del servidor" + error)
    }
};

export const updateTag = async (req,res) => {
    const {name} = req.body;
    try {
    
        const update = await TagModel.update({name}, {where: {
            id: req.params.id
        }});

        if(update){
            const tag = await TagModel.findByPk(req.params.id);
            res.status(200).json(tag);
        }

    } catch (error) {
        res.status(500).json("Error interno del servidor" + error)
    }
};



export const deleteTag = async (req,res) => {
    try {
        const tag = await TagModel.findByPk(req.params.id);
        await tag.destroy();
        res.status(200).json({
            msg: "Usuario eliminado con exito"
        })
    } catch (error) {
        res.status(500).json("Error interno del servidor" + error);
    }
};
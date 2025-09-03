import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import { ArticleModel } from "./article.model.js";
import { TagModel } from "./tag.model.js";

export const ArticleTagModel = sequelize.define(
    "article_tag", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    }
);

ArticleModel.belongsToMany(TagModel, {
    through: ArticleTagModel,
    as: "tags",
    foreignKey: "article_id",
    onDelete: "CASCADE"
});

TagModel.belongsToMany(ArticleModel, {
    through: ArticleTagModel,
    as: "articles",
    foreignKey: "tag_id",
    onDelete: "CASCADE"
});

ArticleTagModel.belongsTo(ArticleModel, {
    as: "articles",
    foreignKey: "article_id"
});

ArticleTagModel.belongsTo(TagModel, {
    as: "tags",
    foreignKey: "tag_id"
});
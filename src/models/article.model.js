import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import { UserModel } from "./user.model.js";

export const ArticleModel = sequelize.define(
    "Article", {
        title: {
            type: DataTypes.STRING(200),
            len: [3,200],
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            min: 50,
            allowNull: false,
        },
        excerpt: {
            type: DataTypes.STRING(500),
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM("published", "archived"),
            defaultValue: "published",
            allowNull: false
        },
    }
);

ArticleModel.belongsTo(UserModel, {
    as: "user",
    foreignKey: "user_id"
    
});

UserModel.hasMany(ArticleModel, {
    as: "articles",
    foreignKey: "user_id"
});

UserModel.addHook("afterDestroy", async (user) => {
    try {
        const article = await ArticleModel.findOne({ where: {
            user_id: user.id
        }})

        await article.destroy()
    } catch (error) {
        console.log(error)
    }
})
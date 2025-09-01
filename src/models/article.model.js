import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

export const ArticleModel = sequelize.define(
    "Ariticle", {
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
            type: DataTypes.ENUM("publishe", "archived"),
            defaultValue: "published",
            allowNull: false
        },
    }
);
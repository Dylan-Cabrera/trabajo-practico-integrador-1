
import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

export const TagModel = sequelize.define(
    "Tagodel", {
        name: {
            type: DataTypes.STRING(30),
            lem: [2,30],
            allowNull: false 
        }
    }
);
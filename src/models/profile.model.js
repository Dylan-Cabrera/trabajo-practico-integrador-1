import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

export const ProfileModel = sequelize.define(
    "Profile", {
        first_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        biography: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        avatar_url: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        birth_date: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }
);
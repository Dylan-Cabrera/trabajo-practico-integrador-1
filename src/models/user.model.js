import { sequelize } from "../config/database.js";
import { DataTypes, ENUM } from "sequelize";

export const UserModel = sequelize.define(
    "User", {
        username: {
            type: DataTypes.STRING(20),
            unique: true,
            len: [3,20],
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            unique: true,
            validate: {
                isEmail: true
            },
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM("user", "admin"),
            defaultValue: "user",
            allowNull: false
        }
    },
    {
        paranoid: true
    }
);
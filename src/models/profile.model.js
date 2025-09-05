import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import { UserModel } from "./user.model.js";

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


ProfileModel.belongsTo(UserModel, {
    as: "user",
    foreignKey: "user_id"
});

UserModel.hasOne(ProfileModel, {
    as: "profile",
    foreignKey: "user_id"
});


UserModel.addHook("afterDestroy", async (user) => {
    try {

        const profile = await ProfileModel.findOne({where: {
        user_id: user.id
    }}, 
    )

    await profile.destroy();

    
    } catch (error) {
        console.log(error)
    }
    
});
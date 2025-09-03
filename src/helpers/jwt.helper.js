import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (user)=> {
    const token = jwt.sign({
        id: user.dataValues.id,
        role: user.dataValues.role
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "1h"
    }
    );

    return token;
};

export const verifyToken = (req,res,next) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)

    } catch (error) {
        throw new Error("Error al verifycar el token", error.message)
    }
};
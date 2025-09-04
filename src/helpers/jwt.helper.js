import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (user)=> {
    const token = jwt.sign({
        id: user.id,
        role: user.role,
        first_name: user.profile.first_name,
        last_name: user.profile.last_name,

    },
    process.env.JWT_SECRET,
    {
        expiresIn: "1h"
    }
    );

    return token;
};

export const verifyToken = (token) => {
    try {

        //devuelve el payload del token
        const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET) 

        return tokenDecoded;

    } catch (error) {
        throw new Error("Error al verificar el token: " + error.message);
    }
};
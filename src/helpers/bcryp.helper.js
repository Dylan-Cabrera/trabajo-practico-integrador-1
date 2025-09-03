import bcryp from "bcrypt";

export const bcrypHash = async (password) => {
    try {
        const hashedPassword = bcryp.hash(password, 15);
        return hashedPassword;
    } catch (error) {
        console.log("Error en el hash")
    }
};

export const bcrypCompare = async (password, hashedPassword) => {
    try {
        const comparedPassword =  bcryp.compare(password, hashedPassword);
        return comparedPassword;
    } catch (error) {
        
    }
};
import { verifyToken } from "../helpers/jwt.helper.js";


//devuelve el payload del token
//para poder acceder mediante un req desde los modulos posteriores en las rutas
export const authMiddleware = async (req, res, next)=> {
    try {
        //obtener el token de la cookie
        const token = req.cookies["token"];

        if(!token) {
            return res.status(401).json({ msg: "No autenticado"});
        };
       

        const decode = verifyToken(token);

        //Almacenzar los datos del usuario
        req.userLogged = decode;
        

        next();
    } catch (error) {
        res.status(500).json({msg:  "Error interno del servidor", error});
        console.log(error)
    }
};


//verificar si el usuario es admin
//para las rutas de admin

export const adminVerify = (req, res, next) => {
    try {
        const user = req.userLogged;

        if(!user) {
            return res.status(401).json({
                msg: "No autenticado"
            })
        };

        console.log(user.role)
        if(user.role != "admin") {
            res.status(403).json({
                msg: "Acceso no autorizado"
            })
        }

        next();
    } catch (error) {
        
    }
}
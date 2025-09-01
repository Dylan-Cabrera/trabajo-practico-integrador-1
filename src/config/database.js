import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    }
);

export const startDB = () => {
    try {
        sequelize.authenticate();
        console.log("Base de datos conectada correctamente");
        sequelize.sync({alter:true});
    } catch (error) {
        console.log("Error al conectar con la base de datos");
        process.exit(1); //si falla la conexión a la db termina la ejecución del programa
    }
};
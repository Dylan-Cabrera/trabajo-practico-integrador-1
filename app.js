import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { startDB } from "./src/config/database.js";
import "./src/models/article.model.js"
import "./src/models/article_tag.model.js"
import "./src/models/tag.model.js"
import "./src/models/profile.model.js"
import "./src/models/user.model.js"


startDB();
const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000"
}));


app.listen(PORT, () => {
    console.log(`Escuchando servidor en el puerto ${PORT}`)
});

//ENTREGA DE AUTORIZACION-ENV

import express from "express";
import "./config/db.js";
import UserRouter from "./routers/user.router.js";
import AuthRouter from "./routers/auth.router.js";
import { isAuth } from "./middlewares/auth.middleware.js";

import dotenv from "dotenv";
//FIX para usar dirname
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//TODO PASAR LOS .ENV A OTRO LADO
dotenv.config({
  path: process.env.MODO === "DEV" ? __dirname + "/.env1" : __dirname + "/.env2",
});

console.log(process.env, process.argv);

const app = express();


//HBS
import { engine } from "express-handlebars";
app.set("views", "./src/views");
app.set("view engine", "hbs");

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "main.hbs",
    layoutsDir: __dirname + "/views",
    partialsDir: __dirname + "/views/partials",
  }),
);
//

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", UserRouter);
app.use("/login", AuthRouter);

app.get("/auth", isAuth, (req, res) => {
  console.log("Usuario autorizado", req.user);
  console.log("Estas autenticado");
  res.send("Estas autenticado");
});

app.get("/info", (req, res) => {
  res.render("main", {
    messageArgv: process.argv,
    messageEnv: process.env
  });
});

const PORT = process.env.PORT;
const server = app.listen(PORT, () =>
  console.log(`🚀 Server started on port http://localhost:${PORT}`),
);
server.on("error", (err) => console.log(err));
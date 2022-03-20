import { Request, Response } from "express";
let Contenedor = require('./class/Contenedor');
const contenedor = new Contenedor('productos.txt')

const express = require('express')
const app = express()
const { engine } = require("express-handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", "./src/views");
app.set("view engine", "pug");

app.get("/", (req: Request, res: Response) => {
  async function run() {
    const productos = await contenedor.getAll()
    res.render("productos", {
      message: "Productos Dispo",
      listOfElements: productos
    });
  }
  run()
});

app.post("/", (req: Request, res: Response) => {
  res.render("index", {
    message: "Formulario de ingreso",
  });
});

const PORT = 8084;
const server = app.listen(PORT, () =>
  console.log(`🚀 Server started on port http://localhost:${PORT}`),
);
server.on("error", (error:any) => console.log(error));
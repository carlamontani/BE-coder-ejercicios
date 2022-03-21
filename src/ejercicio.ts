import { Request, Response } from "express";
let Contenedor = require('./class/Contenedor');
const contenedor = new Contenedor('productos.txt');

const express = require('express')
const app = express()
const { engine } = require("express-handlebars");

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"));

const routerProductos = express.Router();

app.set("views", "./src/views");
app.set("view engine", "hbs");

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layout",
    partialsDir: __dirname + "/views/partials",
  }),
);


//http://localhost:8088/productos
routerProductos.get("/", (req: Request, res: Response) => {
  //res.status(200).json(productos);
  async function run() {
    const productos = await contenedor.getAll()
    res.render("form", {
      message: "Ingrese producto nuevo"
    });
  }
  run()
});

//POST
routerProductos.post("/", (req: Request, res: Response) => {
  const { body } = req;
  async function run() {
    await contenedor.save(body)
    const productos = await contenedor.getAll()
    res.render("main", {
      message: "Productos Disponibles",
      listOfElements: productos,
      productos,
      existe: true,
    });
  }
  run()
});

app.use("/productos", routerProductos)

const PORT = 8088
const server = app.listen(PORT, () =>
console.log(`Server en port http://localhost:8088`)
)

server.on('error', (error:any) => console.log(error))

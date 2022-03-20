import { Request, Response } from "express";
let Contenedor = require('./class/Contenedor');
const contenedor = new Contenedor('productos.txt')

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
    res.render("main", {
      productos,
      existe: true,
    });
  }
  run()
});

//http://localhost:8088/productos/3
routerProductos.get("/:id", (req: Request, res: Response) => {
  const idRequested = Number(req.params.id)

  async function run() {
    const result = await contenedor.getById(idRequested)
    console.log(result)
    if (result.length === 1) { 
      res.render("main", {
        productos: result,
        existe: true,
      })
    } else {
      res.status(404).json({
        error: 'producto no encontrado',
      })
    }
  }
  run()
});

//POST
routerProductos.post("/", (req: Request, res: Response) => {
  const { body } = req;
  /*
  const lastProduct = productos.slice(-1)[0]

  productos.push({...body, id : lastProduct.id+1})

  res.status(200).json({
    productos,
  });*/

  async function run() {
    res.status(200).json(await contenedor.save(body)) //devuelve el nuevo id generado, cambiar si quiero devolver la lista nueva
  }
  run()
});

//PUT
routerProductos.put("/:id", (req: Request, res: Response) => {
  const { body } = req;
  const { params } = req;

  async function run() {
    res.status(200).json(await contenedor.update(body, params)) //devuelve el nuevo id generado, cambiar si quiero devolver la lista nueva
  }
  run()
});

//delete
routerProductos.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  /*
  for (var i = 0; i < productos.length; i++) {
    var obj = productos[i];

    if (Number(id) === obj.id) {
      productos.splice(i, 1);
    }
  }

  res.status(200).json({
    productos,
  });*/

  async function run() {
    res.status(200).json(await contenedor.deleteById(id)) //ver que onda los ids
  }
  run()
});

app.use("/productos", routerProductos)

const PORT = 8088
const server = app.listen(PORT, () =>
console.log(`Server en port http://localhost:8088`)
)

server.on('error', (error:any) => console.log(error))

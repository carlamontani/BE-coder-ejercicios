import { Request, Response } from "express";
let Products = require('./class/Products');
const productos = new Products('productos.txt');

const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//app.use(express.static("./src/public"))

const routerProductos = express.Router();
const routerCarrito = express.Router();


routerProductos.get("/", (req: Request, res: Response) => {
  //res.status(200).json(productos);
  async function run() {
    res.status(200).json(await productos.getAll())
  }
  run()
});

routerProductos.get("/:id", (req: Request, res: Response) => {
  const idRequested = Number(req.params.id)

  async function run() {
    const result = await productos.getById(idRequested)
    if (result.length === 1) { 
      res.status(200).json({
        productoBuscado: result,
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
    res.status(200).json(await productos.save(body)) //devuelve el nuevo id generado, cambiar si quiero devolver la lista nueva
  }
  run()
});

//PUT
routerProductos.put("/:id", (req: Request, res: Response) => {
  const { body } = req;
  const { params } = req;

  async function run() {
    res.status(200).json(await productos.update(body, params)) //devuelve el nuevo id generado, cambiar si quiero devolver la lista nueva
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
    res.status(200).json(await productos.deleteById(id)) //ver que onda los ids
  }
  run()
});



app.use("/api/productos", routerProductos)

app.use("/api/carrito", routerCarrito)

const PORT = 8088
const server = app.listen(PORT, () =>
console.log(`Server en port http://localhost:${PORT}`)
)

server.on('error', (error:any) => console.log(error))
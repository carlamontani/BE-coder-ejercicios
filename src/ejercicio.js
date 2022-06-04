//clase productos
//let Products = require('./class/Products');
//const productos = new Products('productos.txt'); //txt con productos
// EJERCICIO VIEJO

//express
import express from "express";
import { Router } from "express";
import cors from "cors";

//mongoose
import "./config/db.js";
import { ProductsModel } from "./modules/products.modules.js";

//expres-cors
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//puerto
const port = process.env.PORT|| 8087;

//router
const routerProductos = express.Router();
const routerCarrito = express.Router();

//data nueva

Router
const product1 = {
  title: "Hamborger",
  price: 100,
  thumbnail: "https://picsum.photos/200?random=1",
  description: "bebida gaseosa sabor pomelo",
  stock: 20,
};


/* --------------------------------- CREATE --------------------------------- */

async function createUser() {
  try {
    const response = await ProductsModel.create([product1]);
    return response
  } catch (error) {
    console.log(error);
  }
}

/* -------------------------------- READ ALL -------------------------------- */
async function readAll() {
  try {
    const response = await ProductsModel.find();
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

// readAll();

//GET ALL
routerProductos.get("/", (req, res) => {
  const read = async () => {
    try {
      const response = await readAll();
      res.status(200).json(response)
    } catch (error) {
      console.log(error);
    }
  }
  read()
});

//GET ONE
routerProductos.get("/:id", (req, res) => {
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

//POST - CREATE - de producto1
routerProductos.post("/", (req, res) => {
  const create = async () => {
    try {
      const response = await createUser();
      res.status(200).json(response)
    } catch (error) {
      console.log(error);
    }
  }
  create()
  /* FUNCION ANTERIOR
  const { body } = req;

  async function run() {
    res.status(200).json(await productos.save(body)) //devuelve el nuevo id generado, cambiar si quiero devolver la lista nueva
  }
  run()*/
});

//PUT
routerProductos.put("/:id", (req, res) => {
  const { body } = req;
  const { params } = req;

  async function run() {
    res.status(200).json(await productos.update(body, params)) //devuelve el nuevo id generado, cambiar si quiero devolver la lista nueva
  }
  run()
});

//delete
routerProductos.delete("/:id", (req, res) => {
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
    res.status(200).json(await productos.deleteById(id))
  }
  run()
});


///FIN - LOS ROUTERS OTRA VEZ
app.use("/api/products", routerProductos)

app.use("/api/carrito", routerCarrito)

//SERVERS
const server = app.listen(port, () =>
console.log(`Server en port http://localhost:${port}`)
)

server.on('error', (error) => console.log(error))
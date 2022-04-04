const cors = require ("cors");
let Products = require('./class/Products');
const productos = new Products('productos.txt');

const express = require('express')
const app = express()
app.use(cors());

const port = process.env.PORT|| 8087;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//app.use(express.static("./src/public"))

const routerProductos = express.Router();
const routerCarrito = express.Router();


routerProductos.get("/", (req, res) => {
  //res.status(200).json(productos);
  async function run() {
    res.status(200).json(await productos.getAll())
  }
  run()
});

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

//POST
routerProductos.post("/", (req, res) => {
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
    res.status(200).json(await productos.deleteById(id)) //ver que onda los ids
  }
  run()
});

app.use("/api/productos", routerProductos)

app.use("/api/carrito", routerCarrito)

const server = app.listen(port, () =>
console.log(`Server en port http://localhost:${port}`)
)

server.on('error', (error) => console.log(error))
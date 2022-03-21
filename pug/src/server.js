let Contenedor = require('./class/Contenedor');
const contenedor = new Contenedor('productos.txt')

const express = require("express");
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routerProductos = express.Router();

app.set("views", "./src/views");
app.set("view engine", "pug");

routerProductos.post('/', (req, res) => {
  const { body } = req;
  async function run() {
    await contenedor.save(body)
    const productos = await contenedor.getAll()
    res.render("product_display", {
      message: "Productos Disponibles",
      listOfElements: productos,
    });
  }
  run()
});

routerProductos.get("/", (req, res) => {
  async function run() {
    const productos = await contenedor.getAll()
    res.render("form", {
      message: "Ingrese producto nuevo",
    });
  }
  run()
});

app.use("/productos", routerProductos)

const PORT = 8084;
const server = app.listen(PORT, () =>
  console.log(`🚀 Server started on port http://localhost:${PORT}`),
);
server.on("error", (err) => console.log(err));
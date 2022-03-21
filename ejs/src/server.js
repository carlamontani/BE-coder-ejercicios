let Contenedor = require('./class/Contenedor');
const contenedor = new Contenedor('productos.txt')
const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routerProductos = express.Router();

app.set("views", "./src/views");
app.set("view engine", "ejs");

routerProductos.post("/", (req, res) => {
  const { body } = req;
  async function run() {
    await contenedor.save(body)
    const productos = await contenedor.getAll()
    res.render("pages/index", {
      productos,
    });
  }
  run()
});

routerProductos.get("/", (req, res) => {
  async function run() {
    const productos = await contenedor.getAll()
    res.render("pages/form", {
      message: "Ingrese producto nuevo",
    });
  }
  run()
});

routerProductos.get("/about", (req, res) => {
  res.render("pages/about", {});
});


app.use("/productos", routerProductos)
const PORT = 8099;
const server = app.listen(PORT, () =>
  console.log(`🚀 Server started on port http://localhost:${PORT}`),
);
server.on("error", (err) => console.log(err));
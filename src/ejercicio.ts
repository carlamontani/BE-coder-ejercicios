import { Request, Response } from "express";
let Contenedor = require('./class/Contenedor');
const contenedor = new Contenedor('productos.txt');

const express = require('express')
const http = require("http");
const app = express()
const server = http.createServer(app);
const { Server } = require("socket.io");
const { engine } = require("express-handlebars");

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//app.use(express.static("./src/public"));

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

const io = new Server(server);

const products = [
  {
    title: "Agua",
    price: "100",
    thumbnail: "https://picsum.photos/200"
  }
];

io.on("connection", (socket:any) => {
  console.log("💻 Nuevo usuario conectado!");

  io.sockets.emit("messageBack", products);
  socket.on("disconnect", () => {
    console.log("❌ Usuario desconectado");
  });
  socket.on("mensajeRespuesta", (data:any) => {
    console.log(data);
  });

  socket.on("messageFront", (data:any) => {
    products.push(data);
    io.sockets.emit("messageBack", products);
  });
});

//http://localhost:8088/productos
routerProductos.get("/", (req: Request, res: Response) => {
  //res.status(200).json(productos);
  async function run() {
    await contenedor.getAll()
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
server.listen(PORT, () => console.log(`🚀 Server started on port http://localhost:${PORT}`));


server.on('error', (error:any) => console.log(error))

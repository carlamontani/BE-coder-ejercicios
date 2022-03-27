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

const messages = [
  {
    author: "Diego",
    text: "Hola",
  },
  {
    author: "Jorge",
    text: "Como estan?",
  },
  {
    author: "Ana",
    text: "Hola grupo",
  },
];

io.on("connection", (socket:any) => {
  // Mensaje de bienvenida cuando se conecta un cliente nuevo
  console.log("💻 Nuevo usuario conectado!");
  socket.emit("mensajeConexion", "Bienvenidos a mi ejercicio de websockets 🔥 🔥 🔥 ");
  //Enviamos todos los mensajes al nuevo cliente cuando se conecta
  io.sockets.emit("messageBack", messages);
  socket.on("disconnect", () => {
    console.log("❌ Usuario desconectado");
  });
  socket.on("mensajeRespuesta", (data:any) => {
    console.log(data);
  });

  //Recibimos los mensajes desde el frontend
  socket.on("messageFront", (data:any) => {
    messages.push(data);
    // io.sockets.emit("message", data);
    io.sockets.emit("messageBack", messages);
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

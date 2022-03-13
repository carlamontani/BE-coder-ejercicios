const express = require('express')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const routerProductos = express.Router();

let productos = [
  {
    title: "La Sirenita",
    price: 45,
    thumbnail: "https://picsum.photos/200/300?random=1",
    id: 1
  },
  {
    title: "Tres chanchitos",
    price: 50,
    thumbnail: "https://picsum.photos/200/300?random=2",
    id: 2
  },
  {
    title: "Caperucita",
    price: 30,
    thumbnail: "https://picsum.photos/200/300?random=3",
    id: 3
  }
]


routerProductos.get("/", (req, res) => {
  res.status(200).json(productos);
});

routerProductos.get("/:id", (req, res) => {
  const idRequested = Number(req.params.id)
  const result = productos.filter(producto => producto.id === idRequested);
  
  if (result.length === 1) { 
    res.status(200).json({
      productoBuscado: result,
    })
  } else {
    res.status(404).json({
      error: 'producto no encontrado',
    })
  }
});

//post
routerProductos.post("/", (req, res) => {
  const { body } = req;
  productos.push(body)

  res.status(200).json({
    productos,
  });
});

//put
routerProductos.put("/:id", (req, res) => {
  const { body } = req;
  const { params } = req;
  //console.log(body, Number(params.id)) 

  productos.forEach(producto => {
    if (Number(params.id) === producto.id) { //ver spread operators
      producto.title = body.title,
      producto.price = body.price,
      producto.thumbnail = body.thumbnail,
      producto.id = Number(params.id)
    }
  });

  console.log(productos)
  res.status(200).json({
    productos,
  });
});

//delete
routerProductos.delete("/:id", (req, res) => {
  const { id } = req.params;

  productos.forEach(producto => {
    if (Number(id) === producto.id) {
      productos.splice(id-1, 1)
    } else {
      //newList.push(producto) //REF // validaciones
    }
  });

  res.status(200).json({
    productos,
  });
});

app.use("/productos", routerProductos)
const PORT = 8080

const server = app.listen(PORT, () =>
console.log(`Server en port http://localhost:8080`)
)

server.on('error', (err) => console.log(err))


//agregar ids
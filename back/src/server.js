import express from "express"
import dotenv from "dotenv"
import cors from "cors"
//import newsRouter from "./routers/news.router.js"
import productsRouter from "./routers/products.router.js"
import ordersRouter from "./routers/orders.router.js"

dotenv.config()

/*
const corsOptions = {
  origin: "http://localhost:3000", //esto se agrega para que desde el front no de error de cors
}
const whitelist = ["laala.com", "http://localhost:3000"]
const corsOptions = {
  origin: function(origin, callback) {
    if(whitelist.indexOf(origin) !== -1){
      callback(null,true)
    } else {
      callback(new Error("not allowed by cors"))
    }
  }
}*/

const app = express()
//app.use(cors(corsOptions))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.use("/products", productsRouter)
/*
app.get('/', (req, res) => {
  res.status(200).send('holaaaa')
})*/

app.use("/orders", ordersRouter) //ordenes

const PORT = process.env.PORT || 3030
const server = app.listen(PORT, () =>
  console.log(`Server en port http://localhost:${PORT}`)
)

server.on('error', (err) => console.log(err))
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"))

const personas = []
const mascotas = []

const routerPersonas = express.Router();
const routerMascotas = express.Router();


//router personas

routerPersonas.get("/", (req,res) =>{
    res.status(200).json({personas})
})

routerPersonas.post("/", (req,res) =>{
    const {body} = req
    personas.push(body)
    res.status(200).send("persona agregada")
})


//router mascotas

routerMascotas.get("/", (req,res) =>{
    res.status(200).json({mascotas})
})

routerMascotas.post("/", (req,res) =>{
    const {body} = req
    mascotas.push(body)
    res.status(200).send("mascota agregada")
})

/////
app.use("/api/mascotas", routerPersonas)
app.use("/api/mascotas", routerMascotas)


const PORT = 3033;
const server = app.listen(PORT, () =>
    console.log(`Server en port http://localhost:${PORT}`)
);
server.on("error", (err) => console.log(err))
const express = require('express')

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

///GET - OBTENER INFORMACION

app.get('/api/mensaje', (req,res) => {
    res.status(200).send("mensaje get");
})

app.get('/api/usuario', (req,res) => {
    const { dni, nombre } = req.query; //los recibe como strings
    console.log(dni, nombre)
    res.status(200).json({mensaje: "cono", nombre, dni});
})

app.get('/api/usuario/:dni/:dni2', (req,res) => {
    const { dni, dni2 } = req.params; //los recibe como strings
    console.log(dni)
    res.status(200).json({mensaje: "cono", dni, dni2});
})

///POST - ENVIAR - HAY QUE ENVIAR BODY POST

app.post("/api/usuario", (req,res) => {
    const { body } = req;
    console.log(req.body)
    console.log(body)
})

///PUT -ACTUALIZAR --devuelve la data coregida

app.put("/api/usuario/:id", (req,res) => {
    const { id } = req.params;
    const { body } = req;
    console.log(id, body, "ksksk");
    res.status(200).json({id, body});
})

///DELETE

app.delete("/api/usuario/:id", (req,res) => {
    console.log("delete req recibido")
    const { id } = req.params;

    res.json({
        result: 'ok',
        id: id
    })
})


const PORT = 3000

const server = app.listen(PORT, () =>
console.log(`Server en port http://localhost:3000`)
)

server.on('error', (err) => console.log(err))


//postman 

//bodyy - raw - json
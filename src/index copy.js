const express = require('express');

const app = express();

app.use(express.json());

//app.use(express.json)

let frase = "Hola q onda wachin"

app.get("/api/frase", (req, res) => {
    res.status(200).json({
        frase,
    });
})

app.put("/api/palabras/:pos",(req, res) => {
    const {}
})
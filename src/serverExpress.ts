import { Request, Response } from "express";
let Contenedor = require('./class/Contenedor');


const contenedor = new Contenedor('productos.txt')


const express = require('express');

const app = express();

app.get('/', (req: Request, res: Response) => {
    res.send("<h1 style='color:blue'>Bienvenidos al servidor express</h1>")
})

app.get('/productos', (req: Request, res: Response) => {
    async function run() {
        res.json(await contenedor.getAll())
    }
    run()
})

app.get('/productoRandom', (req: Request, res: Response) => {
    async function run() {
        res.json(await contenedor.returnRandom())
    }
    run()
})

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidooor en http://localhost:${PORT}`)
})


server.on('error', (error:any) => console.log(error))
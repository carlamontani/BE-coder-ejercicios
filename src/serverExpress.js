"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Contenedor = require('./class/Contenedor');
const contenedor = new Contenedor('productos.txt');
const express = require('express');
const app = express();
app.get('/', (req, res) => {
    res.send("<h1 style='color:blue'>Bienvenidos al servidor express</h1>");
});
app.get('/productos', (req, res) => {
    async function run() {
        res.json(await contenedor.getAll());
    }
    run();
});
app.get('/productoRandom', (req, res) => {
    async function run() {
        res.json(await contenedor.returnRandom());
    }
    run();
});
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`Servidooor en http://localhost:${PORT}`);
});
server.on('error', (error) => console.log(error));
//# sourceMappingURL=serverExpress.js.map
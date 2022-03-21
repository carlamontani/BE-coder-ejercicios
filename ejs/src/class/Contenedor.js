var fs = require('fs');

module.exports = class Contenedor {
    productos;
    maxId;
    archivo;
    constructor(nombreArchivo) {
        this.productos = [];
        this.maxId = 0;
        this.archivo = nombreArchivo;
    }
    async save(producto) {
        await this.getAll();
        this.maxId++;
        producto.id = this.maxId;
        this.productos.push(producto);
        try {
            await fs.promises.writeFile(`./src/${this.archivo}`, JSON.stringify(this.productos));
            return this.maxId;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getById(id) {
        try {
            const result = this.productos.filter(item => item.id == id);
            return result[0];
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async getAll() {
        try {
            const productos = JSON.parse(await fs.promises.readFile(`./src/${this.archivo}`, 'utf-8'));
            this.productos = productos;
            this.productos.map((producto) => {
                if (producto.id && this.maxId < producto.id)
                    this.maxId = producto.id;
            });
            return this.productos;
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async deleteById(id) {
        await this.getAll();
        const result = this.productos.filter(item => item.id != id);
        this.productos = result;
        try {
            await fs.promises.writeFile(`./src/${this.archivo}`, JSON.stringify(this.productos));
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async deleteAll() {
        this.productos = [];
        try {
            await fs.promises.writeFile(`./src/${this.archivo}`, JSON.stringify([]));
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async returnRandom() {
        try {
            await this.getAll();
            let listIds = this.productos.map(choice => ({ id: choice.id }));
            let random = Math.floor(Math.random() * listIds.length);
            let randomId = listIds[random].id;
            return await this.getById(randomId);
        }
        catch (error) {
            throw new Error(error);
        }
    }
};
//# sourceMappingURL=Contenedor.js.map
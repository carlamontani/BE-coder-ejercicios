var fs = require('fs');
/*
type ProductoType = {
    id?: number,
    timestamp?: string,
    title: string,
    description: string,
    code: string,
    thumbnail: string,
    price: number,
    stock: number
}

interface ContenedorType {
    productos: ProductoType[]
    maxId: number
    archivo: string
    save(producto: ProductoType): Promise<number>
    getById(id: number): Promise<ProductoType[]>
    getAll(): Promise<ProductoType[]>
    deleteById(id: number): Promise<void>
    deleteAll(): Promise<void>
}*/

module.exports =  class Contenedor {
    //productos: ProductoType[]
    //maxId: number
    //archivo: string

    constructor(nombreArchivo) {
        this.productos = []
        this.maxId = 0
        this.archivo = nombreArchivo
    }

    async save(producto){
        await this.getAll()
        this.maxId++
        producto.id = this.maxId
        this.productos.push(producto)
        try {
            await fs.promises.writeFile(
                `./src/data/${this.archivo}`,
                JSON.stringify(this.productos),
            )
            return this.maxId
        } catch (error) {
            throw new Error(error)
        }
    }

    async getById(id) {
        try {
            const productos = JSON.parse(
                await fs.promises.readFile(`./src/data/${this.archivo}`, 'utf-8'),
            )
            const result = productos.filter(item => item.id == id);
            return result
        } catch (error) {
            throw new Error(error)
        }
    }

    async getAll() {
        try {
            const productos = JSON.parse(
                await fs.promises.readFile(`./src/data/${this.archivo}`, 'utf-8'),
            )
            this.productos = productos
            this.productos.map((producto) => {
                if (producto.id && this.maxId < producto.id)
                    this.maxId = producto.id
            })
            return this.productos
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteById(id){
        await this.getAll()
        const result = this.productos.filter(item => item.id != id);
        this.productos = result
        try {
            await fs.promises.writeFile(
                `./src/data/${this.archivo}`,
                JSON.stringify(this.productos),
            )
        } catch (error) {
            throw new Error(error)
        }
    }

    async deleteAll() {
        this.productos = []
        try {
            await fs.promises.writeFile(
                `./src/data/${this.archivo}`,
                JSON.stringify([]),
            )
        } catch (error) {
            throw new Error(error)
        }
    }

    async returnRandom(){
        try {
            await this.getAll()
            let listIds = this.productos.map(choice => ({ id: choice.id }));
            let random = Math.floor(Math.random() * listIds.length);
            let randomId = listIds[random].id;
            return await this.getById(randomId)
        } catch (error) {
            throw new Error(error)
        }
    }

    async update(body, params){
        await this.getAll()
        this.productos.forEach(producto => {
            if (Number(params.id) === producto.id) {
                  producto.title = body.title,
                  producto.price = body.price,
                  producto.thumbnail = body.thumbnail,
                  producto.id = Number(params.id)
            }
        });
            try {
                await fs.promises.writeFile(
                    `./src/data/${this.archivo}`,
                    JSON.stringify(this.productos),
                )
            } catch (error) {
                throw new Error(error)
            }
    }
}

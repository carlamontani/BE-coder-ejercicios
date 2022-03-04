import fs from 'fs'

type ProductoType = {
    id?: number
    title: string
    price: number
    thumbnail: string
}

interface ContenedorType {
    productos: ProductoType[]
    maxId: number
    archivo: string
    save(producto: ProductoType): Promise<number>
    getById(id: number): Promise<ProductoType>
    getAll(): Promise<ProductoType[]>
    deleteById(id: number): Promise<void>
    deleteAll(): Promise<void>
}

module.exports =  class Contenedor implements ContenedorType {
    productos: ProductoType[]
    maxId: number
    archivo: string

    constructor(nombreArchivo: string) {
        this.productos = []
        this.maxId = 0
        this.archivo = nombreArchivo
    }

    async save(producto: ProductoType): Promise<number> {
        await this.getAll()
        this.maxId++
        producto.id = this.maxId
        this.productos.push(producto)
        try {
            await fs.promises.writeFile(
                `./src/${this.archivo}`,
                JSON.stringify(this.productos),
            )
            return this.maxId
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async getById(id: number | undefined): Promise<ProductoType> {
        try {
            const result = this.productos.filter(item => item.id == id);
            return result[0]
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async getAll(): Promise<ProductoType[]> {
        try {
            const productos: ProductoType[] = JSON.parse(
                await fs.promises.readFile(`./src/${this.archivo}`, 'utf-8'),
            )
            this.productos = productos
            this.productos.map((producto: ProductoType) => {
                if (producto.id && this.maxId < producto.id)
                    this.maxId = producto.id
            })
            return this.productos
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async deleteById(id: number): Promise<void> {
        await this.getAll()
        const result = this.productos.filter(item => item.id != id);
        this.productos = result
        try {
            await fs.promises.writeFile(
                `./src/${this.archivo}`,
                JSON.stringify(this.productos),
            )
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async deleteAll(): Promise<void> {
        this.productos = []
        try {
            await fs.promises.writeFile(
                `./src/${this.archivo}`,
                JSON.stringify([]),
            )
        } catch (error: any) {
            throw new Error(error)
        }
    }

    async returnRandom(): Promise<any> {
        try {
            await this.getAll()
            let listIds = this.productos.map(choice => ({ id: choice.id }));
            let random = Math.floor(Math.random() * listIds.length);
            let randomId = listIds[random].id;
            return await this.getById(randomId)
        } catch (error: any) {
            throw new Error(error)
        }
    }
}
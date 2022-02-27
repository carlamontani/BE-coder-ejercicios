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

class Contenedor implements ContenedorType {
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

    async getById(id: number): Promise<ProductoType> {
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
}

const contenedor = new Contenedor('productos.txt')

const p1: ProductoType = {
    title: 'Book',
    price: 100,
    thumbnail: '#',
}

const p2: ProductoType = {
    title: 'Magazine',
    price: 20,
    thumbnail: '#',
}

const p3: ProductoType = {
    title: 'Album',
    price: 150,
    thumbnail: '#',
}

async function run() {
    await contenedor.deleteAll()
    await contenedor.save(p1)
    await contenedor.save(p2)

    console.log(await contenedor.save(p3))

    await contenedor.deleteById(1)
    await contenedor.save(p1)
    console.log( await contenedor.getById(3))
}

run()

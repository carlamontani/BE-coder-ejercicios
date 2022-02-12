interface Libro {
    titulo: string,
    autor: string,
}
class Usuario {
    nombre: string;
    apellido: string;
    libros: Array<Libro>;
    mascotas: String[];
    constructor (nombre:string, apellido:string, libros:Array<Libro>, mascotas:String[]) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() { return `${this.nombre} ${this.apellido}` }

    addMascota(mascota:String):void {
        this.mascotas.push(mascota);
    }

    countMascotas():Number {
        return this.mascotas.length;
    }

    addBook(titulo:string, autor:string):void {
        this.libros.push({titulo, autor})
    }

    getBookNames():String[] {
        const prueba = this.libros.map(libro => libro.titulo)
        return prueba
    }
}

const usuario1 = new Usuario("Elio", "Montani", [{titulo: "Cujo", autor:"Stephen King"},{titulo: "Harry Potter", autor:"la Sra"}], ['Blue', 'Anastasia']);

console.log(usuario1.getFullName())
usuario1.addMascota('Sofia(RIP)')
console.log(usuario1.countMascotas())
usuario1.addBook("El gran Gatsby", "F Scott Fitzgerald")
console.log(usuario1.getBookNames())
console.log(usuario1)
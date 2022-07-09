import mongoose from 'mongoose'
import { asDto } from '../dtos/UserDTO.js'

const userSchema = new mongoose.Schema({
    id: { type: Number },
    userName: { type: String },
    password: { type: String },
    email: { type: String }
});

export default class UserDaoDb {

    constructor(cnxStr) {
        this.cnxStr = cnxStr
        this.personas = mongoose.model('User', userSchema)
    }

    async init() {
        await mongoose.connect(this.cnxStr)
        console.log('personas dao en mongodb -> listooooo')
    }

    async disconnect() {
        await mongoose.disconnect()
        console.log('personas dao en mongodb -> cerrado')
    }

    async getAll() {
        const personas = await this.personas.find({})
        return asDto(personas)
    }

    async getById(idBuscado) {
        const persona = await this.personas.findOne({ id: idBuscado })
        return asDto(persona)
    }

    async save(personaNueva) {
        await this.personas.create(personaNueva)
        return asDto(personaNueva)
    }

    async deleteById(idParaBorrar) {
        const borrada = await this.personas.findOneAndDelete({ id: idParaBorrar })
        return asDto(borrada)
    }

    async deleteAll() {
        await this.personas.deleteMany({})
    }

    async updateById(idParaReemplazar, nuevaPersona) {
        const actualizada = await this.personas.findOneAndUpdate({ id: idParaReemplazar }, { $set: nuevaPersona })
        return asDto(actualizada)
    }
}

import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    cedula: {type: String, required:true, unique: true},
    password: {type: String, required:true},
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    rol: {type: String, enum: ['usuario', 'admin'], default: 'usuario'}
})

export default mongoose.model("User", userSchema)
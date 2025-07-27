import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    descripcion: {
        type: String,
        default: ""
    },
    icono: {
        type: String,
        default: "📦"
    },
    activa: {
        type: Boolean,
        default: true
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

const Category = mongoose.model("Category", categorySchema);
export default Category;

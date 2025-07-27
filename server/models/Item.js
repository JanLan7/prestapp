import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        default: ""
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    disponible: {
        type: Boolean,
        default: true
    },
    alquiladoPor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    fechaAlquiler: {
        type: Date,
        default: null
    },
    propiedadesAdicionales: {
        type: Map,
        of: String,
        default: new Map()
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

const Item = mongoose.model("Item", itemSchema);
export default Item;

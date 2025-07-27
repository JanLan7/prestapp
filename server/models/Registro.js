import mongoose from "mongoose";
import { obtenerFechaParaguay } from "../utils/timezone.js";

const registroSchema = new mongoose.Schema({
    // Campos para compatibilidad con el sistema actual
    tipo: {
        type: String,
        enum: ['alquiler', 'devolucion'],
        required: true
    },
    elemento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    },
    // Nuevos campos para el sistema mejorado
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fechaAlquiler: {
        type: Date,
        default: obtenerFechaParaguay,
        required: true
    },
    fechaDevolucion: {
        type: Date,
        default: null
    },
    fecha: {
        type: Date,
        default: obtenerFechaParaguay
    },
    observaciones: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});

// Middleware para sincronizar campos
registroSchema.pre('save', function(next) {
    // Sincronizar elemento e item
    if (!this.item && this.elemento) {
        this.item = this.elemento;
    }
    if (!this.elemento && this.item) {
        this.elemento = this.item;
    }
    
    // Sincronizar fecha y fechaAlquiler
    if (!this.fechaAlquiler && this.fecha) {
        this.fechaAlquiler = this.fecha;
    }
    if (!this.fecha && this.fechaAlquiler) {
        this.fecha = this.fechaAlquiler;
    }
    
    next();
});

export default mongoose.model("Registro", registroSchema);

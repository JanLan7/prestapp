import mongoose from "mongoose";

const instrumentSchema = new mongoose.Schema({
    nombre: { type: String, required: true, unique: true }, // Evita duplicados por nombre
    disponible: { type: Boolean, default: true },
    alquiladoPor: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }
});

export default mongoose.model("Instrument", instrumentSchema);
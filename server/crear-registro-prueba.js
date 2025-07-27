// Script para crear registros de prueba para hoy
import mongoose from "mongoose";
import dotenv from "dotenv";
import Registro from "./models/Registro.js";
import Item from "./models/Item.js";
import User from "./models/User.js";
import { obtenerFechaParaguay } from "./utils/timezone.js";

dotenv.config();

// Configurar zona horaria para Paraguay
process.env.TZ = 'America/Asuncion';

mongoose.connect(process.env.MONGO_URL)
.then(async () => {
    console.log("✅ Conectado a MongoDB");
    
    // Obtener un item y usuario para crear registros de prueba
    const item = await Item.findOne();
    const usuario = await User.findOne({ rol: 'usuario' });
    
    if (!item || !usuario) {
        console.log("❌ No se encontraron items o usuarios para crear registros de prueba");
        process.exit(1);
    }
    
    console.log("📦 Item encontrado:", item.nombre);
    console.log("👤 Usuario encontrado:", usuario.nombre);
    
    // Crear un registro de alquiler para hoy
    const fechaHoy = obtenerFechaParaguay();
    console.log("📅 Fecha de hoy (Paraguay):", fechaHoy);
    
    const registroPrueba = new Registro({
        tipo: 'alquiler',
        elemento: item._id,
        item: item._id,
        usuario: usuario._id,
        fecha: fechaHoy,
        fechaAlquiler: fechaHoy,
        fechaDevolucion: null
    });
    
    await registroPrueba.save();
    console.log("✅ Registro de prueba creado:", registroPrueba._id);
    
    // Verificar que se guardó correctamente
    const verificacion = await Registro.findById(registroPrueba._id);
    console.log("🔍 Verificación - Fecha guardada:", verificacion.fecha);
    console.log("🔍 Verificación - Fecha alquiler:", verificacion.fechaAlquiler);
    
    console.log("✅ Script completado");
    process.exit(0);
})
.catch(err => {
    console.error("❌ Error:", err);
    process.exit(1);
});

// Script para probar alquiler y devolución
import mongoose from "mongoose";
import dotenv from "dotenv";
import Item from "./models/Item.js";
import User from "./models/User.js";
import Registro from "./models/Registro.js";
import { obtenerFechaParaguay } from "./utils/timezone.js";

dotenv.config();
process.env.TZ = 'America/Asuncion';

mongoose.connect(process.env.MONGO_URL)
.then(async () => {
    console.log("✅ Conectado a MongoDB");
    
    // Obtener un item disponible y un usuario
    const item = await Item.findOne({ disponible: true });
    const usuario = await User.findOne({ rol: 'usuario' });
    
    if (!item || !usuario) {
        console.log("❌ No se encontraron items disponibles o usuarios");
        process.exit(1);
    }
    
    console.log("📦 Item seleccionado:", item.nombre);
    console.log("👤 Usuario seleccionado:", usuario.nombre);
    
    // 1. Simular alquiler
    console.log("\n🔄 === SIMULANDO ALQUILER ===");
    
    item.disponible = false;
    item.alquiladoPor = usuario._id;
    item.fechaAlquiler = obtenerFechaParaguay();
    await item.save();
    
    const registroAlquiler = new Registro({
        tipo: 'alquiler',
        elemento: item._id,
        item: item._id,
        usuario: usuario._id,
        fecha: obtenerFechaParaguay(),
        fechaAlquiler: obtenerFechaParaguay(),
        fechaDevolucion: null
    });
    await registroAlquiler.save();
    
    console.log("✅ Registro de alquiler creado:", registroAlquiler._id);
    
    // 2. Simular devolución
    console.log("\n🔄 === SIMULANDO DEVOLUCIÓN ===");
    
    // Marcar el registro de alquiler como devuelto
    registroAlquiler.fechaDevolucion = obtenerFechaParaguay();
    await registroAlquiler.save();
    
    // Crear registro separado de devolución
    const registroDevolucion = new Registro({
        tipo: 'devolucion',
        elemento: item._id,
        item: item._id,
        usuario: usuario._id,
        fecha: obtenerFechaParaguay(),
        fechaAlquiler: obtenerFechaParaguay(),
        fechaDevolucion: obtenerFechaParaguay()
    });
    await registroDevolucion.save();
    
    console.log("✅ Registro de devolución creado:", registroDevolucion._id);
    
    // Actualizar item
    item.disponible = true;
    item.alquiladoPor = null;
    item.fechaAlquiler = null;
    await item.save();
    
    // 3. Verificar registros
    console.log("\n📊 === VERIFICACIÓN DE REGISTROS ===");
    
    const todosLosRegistros = await Registro.find({
        usuario: usuario._id,
        $or: [
            { _id: registroAlquiler._id },
            { _id: registroDevolucion._id }
        ]
    }).sort({ fecha: -1 });
    
    console.log("Total de registros creados:", todosLosRegistros.length);
    todosLosRegistros.forEach((reg, index) => {
        console.log(`  ${index + 1}. Tipo: ${reg.tipo}, Fecha: ${reg.fecha}, FechaDevolucion: ${reg.fechaDevolucion}`);
    });
    
    console.log("\n✅ Prueba completada - Ahora deberías ver 2 movimientos en el historial");
    process.exit(0);
})
.catch(err => {
    console.error("❌ Error:", err);
    process.exit(1);
});

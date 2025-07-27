import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import instrumentRoutes from "./routes/instruments.js";
import categoryRoutes from "./routes/categories.js";
import itemRoutes from "./routes/items.js";
import userDashboardRoutes from "./routes/user-dashboard.js";
import Instrument from "./models/Instrument.js";
import Category from "./models/Category.js";
import Item from "./models/Item.js";
import User from "./models/User.js";
import bcrypt from "bcryptjs";
import cors from "cors";

// Configurar zona horaria para Paraguay (GMT-3)
process.env.TZ = 'America/Asuncion';

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/instrument", instrumentRoutes); // Mantener para compatibilidad
app.use("/api/categories", categoryRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/user-dashboard", userDashboardRoutes);

// Conexión a MongoDB y carga inicial
mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URL)
.then(async () => {
    console.log("✅ Conectado a Mongo");

    // Crear categorías por defecto si no existen
    const categoriaCount = await Category.countDocuments();
    console.log(`📊 Categorías existentes: ${categoriaCount}`);
    
    if (categoriaCount === 0) {
        await Category.insertMany([
            { 
                nombre: "Instrumentos Musicales", 
                descripcion: "Instrumentos para práctica y aprendizaje musical",
                icono: "🎸"
            },
            { 
                nombre: "Llaves", 
                descripcion: "Llaves de acceso a diferentes espacios",
                icono: "🔑"
            }
        ]);
        console.log("📂 Categorías por defecto creadas");
    }

    // Migrar instrumentos existentes al nuevo sistema si es necesario
    const itemCount = await Item.countDocuments();
    const instrumentCount = await Instrument.countDocuments();
    
    console.log(`📊 Items existentes: ${itemCount}, Instrumentos: ${instrumentCount}`);
    
    if (itemCount === 0 && instrumentCount > 0) {
        console.log("🔄 Migrando instrumentos al nuevo sistema...");
        
        const categoriaInstrumentos = await Category.findOne({ nombre: "Instrumentos Musicales" });
        const instrumentos = await Instrument.find();
        
        for (const instrumento of instrumentos) {
            await Item.create({
                nombre: instrumento.nombre,
                categoria: categoriaInstrumentos._id,
                disponible: instrumento.disponible,
                alquiladoPor: instrumento.alquiladoPor,
                fechaAlquiler: instrumento.alquiladoPor ? new Date() : null
            });
        }
        console.log("✅ Migración de instrumentos completada");
    }

    // Solo insertar instrumentos de ejemplo si no hay elementos en el sistema
    if (itemCount === 0 && instrumentCount === 0) {
        const categoriaInstrumentos = await Category.findOne({ nombre: "Instrumentos Musicales" });
        const categoriaLlaves = await Category.findOne({ nombre: "Llaves" });
        
        await Item.insertMany([
            // Instrumentos
            { nombre: "Guitarra Yamaha C40", categoria: categoriaInstrumentos._id, disponible: true },
            { nombre: "Guitarra Yamaha F310", categoria: categoriaInstrumentos._id, disponible: true },
            { nombre: "Flauta Traversa Yamaha YFL-222", categoria: categoriaInstrumentos._id, disponible: true },
            { nombre: "Flauta Traversa Yamaha YFL-221", categoria: categoriaInstrumentos._id, disponible: true },
            
            // Llaves
            { nombre: "Llave Aula 101", categoria: categoriaLlaves._id, disponible: true, descripcion: "Acceso al aula principal" },
            { nombre: "Llave Laboratorio", categoria: categoriaLlaves._id, disponible: true, descripcion: "Acceso al laboratorio de informática" },
            { nombre: "Llave Sala de Profesores", categoria: categoriaLlaves._id, disponible: true, descripcion: "Acceso a la sala de profesores" },
            { nombre: "Llave Almacén", categoria: categoriaLlaves._id, disponible: true, descripcion: "Acceso al almacén general" }
        ]);
        console.log("🎸🔑 Elementos de ejemplo cargados");
    }

    // Crear usuario administrador por defecto si no existe
    const adminExists = await User.findOne({ cedula: "admin" });
    if (!adminExists) {
        const hashedPassword = await bcrypt.hash("admin123", 10);
        await User.create({
            cedula: "admin",
            password: hashedPassword,
            nombre: "Administrador",
            apellido: "Sistema",
            rol: "admin"
        });
        console.log("👤 Usuario administrador creado (cedula: admin, password: admin123)");
    }

    const PORT = process.env.PORT || 5000;
    if (process.env.NODE_ENV !== 'production') {
        app.listen(PORT, () => console.log(`🚀 Servicio corriendo en puerto ${PORT}`));
    }
})
.catch(err => console.log("Error en Mongo", err));

export default app;
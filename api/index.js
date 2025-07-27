import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "../server/routes/auth.js";
import categoryRoutes from "../server/routes/categories.js";
import itemRoutes from "../server/routes/items.js";
import userDashboardRoutes from "../server/routes/user-dashboard.js";
import Category from "../server/models/Category.js";
import Item from "../server/models/Item.js";
import User from "../server/models/User.js";
import bcrypt from "bcryptjs";

process.env.TZ = 'America/Asuncion';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/user-dashboard", userDashboardRoutes);

let isConnected = false;

async function connectDB() {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("✅ Conectado a MongoDB");
    
    await initializeData();
  } catch (error) {
    console.error("Error conectando a MongoDB:", error);
  }
}

async function initializeData() {
  try {
    const categoriaCount = await Category.countDocuments();
    
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

    const itemCount = await Item.countDocuments();
    
    if (itemCount === 0) {
      const categoriaInstrumentos = await Category.findOne({ nombre: "Instrumentos Musicales" });
      const categoriaLlaves = await Category.findOne({ nombre: "Llaves" });
      
      await Item.insertMany([
        { nombre: "Guitarra Yamaha C40", categoria: categoriaInstrumentos._id, disponible: true },
        { nombre: "Guitarra Yamaha F310", categoria: categoriaInstrumentos._id, disponible: true },
        { nombre: "Flauta Traversa Yamaha YFL-222", categoria: categoriaInstrumentos._id, disponible: true },
        { nombre: "Flauta Traversa Yamaha YFL-221", categoria: categoriaInstrumentos._id, disponible: true },
        { nombre: "Llave Aula 101", categoria: categoriaLlaves._id, disponible: true, descripcion: "Acceso al aula principal" },
        { nombre: "Llave Laboratorio", categoria: categoriaLlaves._id, disponible: true, descripcion: "Acceso al laboratorio de informática" }
      ]);
      console.log("🎸🔑 Elementos de ejemplo cargados");
    }

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
      console.log("👤 Usuario administrador creado");
    }
  } catch (error) {
    console.error("Error inicializando datos:", error);
  }
}

export default async function handler(req, res) {
  await connectDB();
  return app(req, res);
}

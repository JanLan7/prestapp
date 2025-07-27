import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Category from "../models/Category.js";
import User from "../models/User.js";
import Item from "../models/Item.js";

const router = express.Router();

//middleware de auth
function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ error: "Token requerido" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: "Token invalido" });
        req.userId = user.id;
        req.userRol = user.rol;
        next();
    });
}

//middleware para verificar admin
function verifyAdmin(req, res, next) {
    if (req.userRol !== 'admin') {
        return res.status(403).json({ error: "Acceso denegado. Solo administradores" });
    }
    next();
}

// Obtener todas las categorías
router.get("/", async (req, res) => {
    try {
        const categorias = await Category.find({ activa: true }).sort({ nombre: 1 });
        res.json(categorias);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener categorías" });
    }
});

// Obtener todas las categorías (incluyendo inactivas) - Solo admin
router.get("/todas", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const categorias = await Category.find().sort({ nombre: 1 });
        res.json(categorias);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener categorías" });
    }
});

// Crear nueva categoría - Solo admin
router.post("/crear", verifyToken, verifyAdmin, async (req, res) => {
    const { nombre, descripcion, icono } = req.body;

    try {
        const categoria = new Category({
            nombre,
            descripcion: descripcion || "",
            icono: icono || "📦"
        });

        await categoria.save();
        res.status(201).json({ msg: "Categoría creada exitosamente", categoria });
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).json({ error: "Ya existe una categoría con ese nombre" });
        } else {
            res.status(400).json({ error: "Error al crear categoría" });
        }
    }
});

// Actualizar categoría - Solo admin
router.put("/actualizar/:id", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const { nombre, descripcion, icono, activa } = req.body;
        
        const categoria = await Category.findByIdAndUpdate(
            req.params.id,
            { nombre, descripcion, icono, activa },
            { new: true }
        );

        if (!categoria) {
            return res.status(404).json({ error: "Categoría no encontrada" });
        }

        res.json({ msg: "Categoría actualizada exitosamente", categoria });
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).json({ error: "Ya existe una categoría con ese nombre" });
        } else {
            res.status(500).json({ error: "Error al actualizar categoría" });
        }
    }
});

// Eliminar categoría con triple seguridad - Solo admin
router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const { adminPassword } = req.body;
        
        if (!adminPassword) {
            return res.status(400).json({ error: "Contraseña de administrador requerida" });
        }

        // Verificar contraseña del admin
        const admin = await User.findById(req.userId);
        if (!admin || admin.rol !== 'admin') {
            return res.status(403).json({ error: "No autorizado" });
        }

        const isValidPassword = await bcrypt.compare(adminPassword, admin.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: "Contraseña de administrador incorrecta" });
        }

        // Buscar la categoría
        const categoria = await Category.findById(req.params.id);
        if (!categoria) {
            return res.status(404).json({ error: "Categoría no encontrada" });
        }

        // Verificar si hay elementos en esta categoría
        const elementosEnCategoria = await Item.find({ categoria: req.params.id });
        
        if (elementosEnCategoria.length > 0) {
            // Si hay elementos, preguntar si quiere eliminarlos también
            const elementosAlquilados = elementosEnCategoria.filter(item => !item.disponible);
            
            if (elementosAlquilados.length > 0) {
                return res.status(400).json({ 
                    error: `No se puede eliminar la categoría. Hay ${elementosAlquilados.length} elemento(s) actualmente alquilado(s). Debes gestionar las devoluciones primero.`,
                    elementosAlquilados: elementosAlquilados.map(item => ({
                        nombre: item.nombre,
                        alquiladoPor: item.alquiladoPor
                    }))
                });
            }

            // Eliminar todos los elementos de la categoría primero
            await Item.deleteMany({ categoria: req.params.id });
        }

        // Eliminar la categoría
        await Category.findByIdAndDelete(req.params.id);

        res.json({ 
            msg: `Categoría "${categoria.nombre}" eliminada exitosamente${elementosEnCategoria.length > 0 ? ` junto con ${elementosEnCategoria.length} elemento(s)` : ''}`,
            elementosEliminados: elementosEnCategoria.length
        });

    } catch (err) {
        console.error('Error al eliminar categoría:', err);
        res.status(500).json({ error: "Error al eliminar categoría" });
    }
});

// Ruta anterior (desactivar en lugar de eliminar) - mantener como backup
router.delete("/eliminar/:id", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const categoria = await Category.findById(req.params.id);
        
        if (!categoria) {
            return res.status(404).json({ error: "Categoría no encontrada" });
        }

        // En lugar de eliminar, marcar como inactiva
        categoria.activa = false;
        await categoria.save();

        res.json({ msg: "Categoría desactivada exitosamente" });
    } catch (err) {
        res.status(500).json({ error: "Error al eliminar categoría" });
    }
});

export default router;

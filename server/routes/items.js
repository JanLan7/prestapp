import express from "express";
import jwt from "jsonwebtoken";
import Item from "../models/Item.js";
import Category from "../models/Category.js";
import User from "../models/User.js";
import Registro from "../models/Registro.js";
import { obtenerFechaParaguay, inicioDelDiaParaguay, finDelDiaParaguay } from "../utils/timezone.js";

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

// Obtener todos los elementos
router.get("/", async (req, res) => {
    try {
        const { categoria } = req.query;
        let filtro = {};
        
        if (categoria) {
            filtro.categoria = categoria;
        }

        const items = await Item.find(filtro)
            .populate('categoria', 'nombre icono')
            .populate('alquiladoPor', 'cedula nombre apellido')
            .sort({ nombre: 1 });
            
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener elementos" });
    }
});

// Obtener elementos por categoría
router.get("/categoria/:categoriaId", async (req, res) => {
    try {
        const items = await Item.find({ categoria: req.params.categoriaId })
            .populate('categoria', 'nombre icono')
            .populate('alquiladoPor', 'cedula nombre apellido')
            .sort({ nombre: 1 });
            
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener elementos" });
    }
});

// Crear nuevo elemento - Solo admin
router.post("/crear", verifyToken, verifyAdmin, async (req, res) => {
    const { nombre, descripcion, categoria, propiedadesAdicionales } = req.body;

    try {
        // Verificar que la categoría existe
        const categoriaExiste = await Category.findById(categoria);
        if (!categoriaExiste) {
            return res.status(404).json({ error: "Categoría no encontrada" });
        }

        const item = new Item({
            nombre,
            descripcion: descripcion || "",
            categoria,
            propiedadesAdicionales: propiedadesAdicionales || {}
        });

        await item.save();
        
        const itemCompleto = await Item.findById(item._id)
            .populate('categoria', 'nombre icono');
            
        res.status(201).json({ msg: "Elemento creado exitosamente", item: itemCompleto });
    } catch (err) {
        res.status(400).json({ error: "Error al crear elemento" });
    }
});

// Actualizar elemento - Solo admin
router.put("/actualizar/:id", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const { nombre, descripcion, categoria, propiedadesAdicionales } = req.body;

        if (categoria) {
            const categoriaExiste = await Category.findById(categoria);
            if (!categoriaExiste) {
                return res.status(404).json({ error: "Categoría no encontrada" });
            }
        }

        const item = await Item.findByIdAndUpdate(
            req.params.id,
            { nombre, descripcion, categoria, propiedadesAdicionales },
            { new: true }
        ).populate('categoria', 'nombre icono');

        if (!item) {
            return res.status(404).json({ error: "Elemento no encontrado" });
        }

        res.json({ msg: "Elemento actualizado exitosamente", item });
    } catch (err) {
        res.status(500).json({ error: "Error al actualizar elemento" });
    }
});

// Eliminar elemento - Solo admin
router.delete("/eliminar/:id", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        
        if (!item) {
            return res.status(404).json({ error: "Elemento no encontrado" });
        }

        res.json({ msg: "Elemento eliminado exitosamente" });
    } catch (err) {
        res.status(500).json({ error: "Error al eliminar elemento" });
    }
});

// Alquilar elemento
router.post("/alquilar/:id", verifyToken, async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ error: "Elemento no encontrado" });
        }

        if (!item.disponible) {
            return res.status(400).json({ error: "Elemento no disponible" });
        }

        item.disponible = false;
        item.alquiladoPor = req.userId;
        item.fechaAlquiler = obtenerFechaParaguay();
        await item.save();

        // Crear registro de alquiler
        const registro = new Registro({
            tipo: 'alquiler',
            elemento: item._id,
            item: item._id,  // Para compatibilidad con el dashboard de usuario
            usuario: req.userId,
            fecha: obtenerFechaParaguay(),
            fechaAlquiler: obtenerFechaParaguay(),  // Para compatibilidad con el dashboard de usuario
            fechaDevolucion: null  // Null indica que está activo
        });
        await registro.save();

        res.json({ msg: "Elemento alquilado con éxito" });
    } catch (err) {
        res.status(500).json({ error: "Error al alquilar elemento" });
    }
});

// Alquilar elemento por admin (usando cédula)
router.post("/alquilar-admin/:id", verifyToken, verifyAdmin, async (req, res) => {
    const { cedula } = req.body;
    
    try {
        const item = await Item.findById(req.params.id).populate('categoria', 'nombre');
        if (!item) {
            return res.status(404).json({ error: "Elemento no encontrado" });
        }

        if (!item.disponible) {
            return res.status(400).json({ error: "Elemento no disponible" });
        }

        const usuario = await User.findOne({ cedula });
        if (!usuario) {
            return res.status(404).json({ error: "Usuario no encontrado con esa cédula" });
        }

        item.disponible = false;
        item.alquiladoPor = usuario._id;
        item.fechaAlquiler = obtenerFechaParaguay();
        await item.save();

        // Crear registro de alquiler
        const registro = new Registro({
            tipo: 'alquiler',
            elemento: item._id,
            item: item._id,  // Para compatibilidad con el dashboard de usuario
            usuario: usuario._id,
            fecha: obtenerFechaParaguay(),
            fechaAlquiler: obtenerFechaParaguay(),  // Para compatibilidad con el dashboard de usuario
            fechaDevolucion: null  // Null indica que está activo
        });
        await registro.save();
        
        console.log('📝 Registro creado:', {
            tipo: registro.tipo,
            usuario: registro.usuario,
            item: registro.item,
            fechaAlquiler: registro.fechaAlquiler,
            fechaDevolucion: registro.fechaDevolucion
        });

        res.json({ msg: `${item.categoria.nombre} "${item.nombre}" alquilado exitosamente a ${usuario.nombre} ${usuario.apellido}` });
    } catch (err) {
        res.status(500).json({ error: "Error al alquilar elemento" });
    }
});

// Devolver elemento - Solo admin
router.post("/devolver/:id", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const item = await Item.findById(req.params.id).populate('categoria', 'nombre').populate('alquiladoPor', 'cedula nombre apellido');
        
        if (!item) {
            return res.status(404).json({ error: "Elemento no encontrado" });
        }

        // Guardar información del usuario antes de limpiar
        const usuarioAnterior = item.alquiladoPor;

        item.disponible = true;
        item.alquiladoPor = null;
        item.fechaAlquiler = null;
        await item.save();

        // Actualizar el registro de alquiler existente marcándolo como devuelto
        if (usuarioAnterior) {
            // Primero, marcar el registro de alquiler como devuelto
            await Registro.findOneAndUpdate(
                {
                    elemento: item._id,
                    usuario: usuarioAnterior._id,
                    fechaDevolucion: null  // Solo registros activos
                },
                {
                    fechaDevolucion: obtenerFechaParaguay()
                    // NO cambiar el tipo - mantenerlo como 'alquiler'
                }
            );

            // Crear un registro separado de devolución
            const registroDevolucion = new Registro({
                tipo: 'devolucion',
                elemento: item._id,
                item: item._id,
                usuario: usuarioAnterior._id,
                fecha: obtenerFechaParaguay(),
                fechaAlquiler: obtenerFechaParaguay(), // Misma fecha para devolución
                fechaDevolucion: obtenerFechaParaguay() // Se marca como devuelto inmediatamente
            });
            await registroDevolucion.save();
            
            console.log('📝 Registro de devolución creado:', {
                tipo: registroDevolucion.tipo,
                usuario: registroDevolucion.usuario,
                item: registroDevolucion.item,
                fecha: registroDevolucion.fecha
            });
        }

        res.json({ msg: `${item.categoria.nombre} "${item.nombre}" devuelto exitosamente` });
    } catch (err) {
        res.status(500).json({ error: "Error al devolver elemento" });
    }
});

// Obtener todos los alquileres - Solo admin
router.get("/alquileres", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const { categoria } = req.query;
        let filtro = { disponible: false };
        
        if (categoria) {
            filtro.categoria = categoria;
        }

        const alquileres = await Item.find(filtro)
            .populate('categoria', 'nombre icono')
            .populate('alquiladoPor', 'cedula nombre apellido')
            .sort({ fechaAlquiler: -1 });
            
        res.json(alquileres);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener alquileres" });
    }
});

// Obtener registros de movimientos (historial completo)
router.get("/registros", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const { fechaInicio, fechaFin } = req.query;
        let filtroFecha = {};

        if (fechaInicio && fechaFin) {
            // Usar las utilidades de zona horaria para Paraguay
            const inicio = inicioDelDiaParaguay(fechaInicio);
            const fin = finDelDiaParaguay(fechaFin);

            filtroFecha.fecha = {
                $gte: inicio,
                $lte: fin
            };
            
            console.log(`🔍 Filtro de fecha aplicado:`);
            console.log(`📅 Desde: ${fechaInicio} -> ${inicio.toISOString()}`);
            console.log(`📅 Hasta: ${fechaFin} -> ${fin.toISOString()}`);
        } else {
            console.log('📋 Sin filtro de fecha - mostrando todos los registros');
        }

        const registros = await Registro.find(filtroFecha)
            .populate({
                path: 'elemento',
                select: 'nombre',
                populate: {
                    path: 'categoria',
                    select: 'nombre icono'
                }
            })
            .populate('usuario', 'cedula nombre apellido')
            .sort({ fecha: -1 });
        
        console.log(`📊 Registros encontrados: ${registros.length}`);
        res.json(registros);
    } catch (err) {
        console.error("Error al obtener registros:", err);
        res.status(500).json({ error: "Error al obtener registros de movimientos" });
    }
});

export default router;

import express from "express";
import { verifyToken } from "./auth.js";
import Registro from "../models/Registro.js";
import Item from "../models/Item.js";
import { obtenerFechaParaguay, crearFiltroFecha } from "../utils/timezone.js";

const router = express.Router();

// Obtener el historial personal del usuario
router.get("/mi-historial", verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        const { fecha } = req.query;
        
        let filtroFecha = {};
        if (fecha) {
            filtroFecha = {
                fechaAlquiler: crearFiltroFecha(fecha)
            };
        }
        // Sin filtro de fecha por defecto - mostrar todo el historial

        const historial = await Registro.find({
            usuario: userId,
            ...filtroFecha
        })
        .populate('item', 'nombre descripcion')
        .populate('usuario', 'nombre apellido cedula')
        .sort({ fechaAlquiler: -1 });

        res.json(historial);
    } catch (err) {
        console.error("Error al obtener historial personal:", err);
        res.status(500).json({ error: "Error al obtener historial personal" });
    }
});

// Obtener instrumentos actualmente prestados al usuario
router.get("/mis-prestamos", verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        
        console.log('🔍 === DIAGNÓSTICO PRÉSTAMOS ACTIVOS ===');
        console.log('👤 Usuario ID consultando:', userId);
        
        // Primero verificar TODOS los registros del usuario
        const todosLosRegistros = await Registro.find({ usuario: userId })
            .populate('item', 'nombre descripcion')
            .sort({ fechaAlquiler: -1 });
        
        console.log('� TODOS los registros del usuario:', todosLosRegistros.length);
        todosLosRegistros.forEach((registro, index) => {
            console.log(`  ${index + 1}. ${registro.item?.nombre || 'Item no encontrado'} - fechaDevolucion: ${registro.fechaDevolucion} - Tipo: ${registro.tipo}`);
        });

        // Ahora buscar solo los activos (sin fecha de devolución)
        const prestamosActivos = await Registro.find({
            usuario: userId,
            fechaDevolucion: null
        })
        .populate('item', 'nombre descripcion')
        .sort({ fechaAlquiler: -1 });

        console.log('📦 Préstamos ACTIVOS encontrados:', prestamosActivos.length);
        prestamosActivos.forEach((prestamo, index) => {
            console.log(`  ACTIVO ${index + 1}. ${prestamo.item?.nombre} - Alquilado: ${prestamo.fechaAlquiler}`);
        });
        
        console.log('🔍 === FIN DIAGNÓSTICO ===');

        res.json(prestamosActivos);
    } catch (err) {
        console.error("Error al obtener préstamos activos:", err);
        res.status(500).json({ error: "Error al obtener préstamos activos" });
    }
});

// Devolver un instrumento (solo el propio usuario)
router.put("/devolver/:registroId", verifyToken, async (req, res) => {
    try {
        const { registroId } = req.params;
        const userId = req.userId;

        // Verificar que el registro pertenece al usuario
        const registro = await Registro.findOne({
            _id: registroId,
            usuario: userId,
            fechaDevolucion: null
        });

        if (!registro) {
            return res.status(404).json({ error: "Registro no encontrado o ya devuelto" });
        }

        // Marcar el registro de alquiler como devuelto
        registro.fechaDevolucion = obtenerFechaParaguay();
        await registro.save();

        // Crear un registro separado de devolución
        const registroDevolucion = new Registro({
            tipo: 'devolucion',
            elemento: registro.item,
            item: registro.item,
            usuario: userId,
            fecha: obtenerFechaParaguay(),
            fechaAlquiler: obtenerFechaParaguay(), // Misma fecha para devolución
            fechaDevolucion: obtenerFechaParaguay() // Se marca como devuelto inmediatamente
        });
        await registroDevolucion.save();
        
        console.log('📝 Registro de devolución creado (usuario):', {
            tipo: registroDevolucion.tipo,
            usuario: registroDevolucion.usuario,
            item: registroDevolucion.item,
            fecha: registroDevolucion.fecha
        });

        // Actualizar estado del item
        await Item.findByIdAndUpdate(registro.item, { 
            disponible: true,
            alquiladoPor: null
        });

        const registroCompleto = await Registro.findById(registro._id)
            .populate('item', 'nombre descripcion')
            .populate('usuario', 'nombre apellido cedula');

        res.json({ 
            msg: "Instrumento devuelto exitosamente", 
            registro: registroCompleto 
        });
    } catch (err) {
        console.error("Error al devolver instrumento:", err);
        res.status(500).json({ error: "Error al devolver instrumento" });
    }
});

export default router;

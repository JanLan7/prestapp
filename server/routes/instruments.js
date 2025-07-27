import express from "express"
import jwt from "jsonwebtoken"
import Instrument from "../models/Instrument.js"
import User from "../models/User.js"

const router = express.Router()

//middleware de auth
function verifyToken(req,res,next){
    const token = req.headers.authorization
    if(!token) return res.status(401).json({error: "Token requerido"})

    jwt.verify(token, process.env.JWT_SECRET, (err, user) =>{
        if(err) return res.status(403).json({error: "Token invalido"})
        req.userId = user.id
        req.userRol = user.rol
        next()
    })
}

//middleware para verificar admin
function verifyAdmin(req, res, next) {
    if (req.userRol !== 'admin') {
        return res.status(403).json({error: "Acceso denegado. Solo administradores"})
    }
    next()
}

//obtener instrumentos
router.get("/", async(req,res)=>{
    const instrumentos = await Instrument.find()
    res.json(instrumentos)
})

//alquilar instrumentos

router.post("/alquilar/:id", verifyToken, async(req,res)=>{
    const instrumento = await Instrument.findById(req.params.id)

    if(!instrumento.disponible){
        return res.status(400).json({error: "Instrumento no disponible"})
    }

    instrumento.disponible = false
    instrumento.alquiladoPor = req.userId
    await instrumento.save()

    res.json({msg: "Instrumento alquilado con exito"})

})

// Rutas específicas para administradores

//crear instrumento (solo admin)
router.post("/crear", verifyToken, verifyAdmin, async(req, res) => {
    const { nombre } = req.body
    
    try {
        const instrumento = new Instrument({ nombre, disponible: true })
        await instrumento.save()
        res.status(201).json({msg: "Instrumento creado exitosamente", instrumento})
    } catch (err) {
        res.status(400).json({error: "Error al crear instrumento"})
    }
})

//devolver instrumento (solo admin)
router.post("/devolver/:id", verifyToken, verifyAdmin, async(req, res) => {
    try {
        const instrumento = await Instrument.findById(req.params.id)
        
        if (!instrumento) {
            return res.status(404).json({error: "Instrumento no encontrado"})
        }

        instrumento.disponible = true
        instrumento.alquiladoPor = null
        await instrumento.save()

        res.json({msg: "Instrumento devuelto exitosamente"})
    } catch (err) {
        res.status(500).json({error: "Error al devolver instrumento"})
    }
})

//eliminar instrumento (solo admin)
router.delete("/eliminar/:id", verifyToken, verifyAdmin, async(req, res) => {
    try {
        const instrumento = await Instrument.findByIdAndDelete(req.params.id)
        
        if (!instrumento) {
            return res.status(404).json({error: "Instrumento no encontrado"})
        }

        res.json({msg: "Instrumento eliminado exitosamente"})
    } catch (err) {
        res.status(500).json({error: "Error al eliminar instrumento"})
    }
})

//obtener todos los alquileres (solo admin)
router.get("/alquileres", verifyToken, verifyAdmin, async(req, res) => {
    try {
        const instrumentos = await Instrument.find({ disponible: false }).populate('alquiladoPor', 'cedula nombre apellido')
        res.json(instrumentos)
    } catch (err) {
        res.status(500).json({error: "Error al obtener alquileres"})
    }
})

//alquilar instrumento por admin (usando cédula)
router.post("/alquilar-admin/:id", verifyToken, verifyAdmin, async(req, res) => {
    console.log('🔧 Endpoint alquilar-admin llamado'); // Debug
    console.log('📋 Params:', req.params); // Debug
    console.log('📋 Body:', req.body); // Debug
    console.log('👤 Usuario admin:', req.user); // Debug
    
    const { cedula } = req.body
    
    try {
        console.log('🔍 Buscando instrumento con ID:', req.params.id); // Debug
        const instrumento = await Instrument.findById(req.params.id)
        console.log('🎸 Instrumento encontrado:', instrumento); // Debug
        
        if (!instrumento) {
            console.log('❌ Instrumento no encontrado'); // Debug
            return res.status(404).json({error: "Instrumento no encontrado"})
        }

        if (!instrumento.disponible) {
            console.log('❌ Instrumento no disponible'); // Debug
            return res.status(400).json({error: "Instrumento no disponible"})
        }

        // Buscar usuario por cédula
        console.log('🔍 Buscando usuario con cédula:', cedula); // Debug
        const usuario = await User.findOne({ cedula })
        console.log('👤 Usuario encontrado:', usuario); // Debug
        
        if (!usuario) {
            console.log('❌ Usuario no encontrado'); // Debug
            return res.status(404).json({error: "Usuario no encontrado con esa cédula"})
        }

        console.log('✅ Actualizando instrumento...'); // Debug
        instrumento.disponible = false
        instrumento.alquiladoPor = usuario._id
        await instrumento.save()
        console.log('✅ Instrumento actualizado correctamente'); // Debug

        res.json({msg: `Instrumento alquilado exitosamente a ${usuario.nombre} ${usuario.apellido}`})
    } catch (err) {
        console.error('💥 Error en alquilar-admin:', err); // Debug
        res.status(500).json({error: "Error al alquilar instrumento"})
    }
})

export default router
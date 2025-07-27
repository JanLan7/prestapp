import express, { Router } from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

const router = express.Router()

//middleware de auth para rutas de admin
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

//registro
router.post("/register", async(req,res)=>{
    const{cedula, password, nombre, apellido, rol = 'usuario'} = req.body

    try {
        const hashed = await bcrypt.hash(password, 10)
        const user = new User({cedula, password: hashed, nombre, apellido, rol})
        await user.save()
        res.status(201).json({msg: "Usuario creado"})
        
    } catch (err) {
        res.status(400).json({error: "Error al registrar"})
        
    }
})

//login 

router.post("/login", async(req,res)=>{
    const {cedula,password} = req.body

    try {
        const user = await User.findOne({cedula})
        if(!user) return res.status(404).json({error: "Usuario no encontrado"})

        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) return res.status(401).json({error: "Contraseña incorrecta"})

        const token = jwt.sign({id: user._id, rol: user.rol}, process.env.JWT_SECRET)
        res.json({token, rol: user.rol})
        
    } catch (err) {
        res.status(500).json({error: "Error interno"})
        
    }
})

// Obtener perfil del usuario actual
router.get("/perfil", verifyToken, async(req, res) => {
    try {
        const usuario = await User.findById(req.userId).select('cedula nombre apellido rol')
        if (!usuario) {
            return res.status(404).json({error: "Usuario no encontrado"})
        }
        res.json(usuario)
    } catch (err) {
        res.status(500).json({error: "Error al obtener perfil del usuario"})
    }
})

// Rutas específicas para administradores

//obtener todos los usuarios (solo admin)
router.get("/usuarios", verifyToken, verifyAdmin, async(req, res) => {
    try {
        const usuarios = await User.find({ rol: 'usuario' }).select('cedula nombre apellido')
        res.json(usuarios)
    } catch (err) {
        res.status(500).json({error: "Error al obtener usuarios"})
    }
})

//buscar usuario por cédula (solo admin)
router.get("/usuario/:cedula", verifyToken, verifyAdmin, async(req, res) => {
    try {
        const usuario = await User.findOne({ cedula: req.params.cedula, rol: 'usuario' }).select('cedula nombre apellido')
        if (!usuario) {
            return res.status(404).json({error: "Usuario no encontrado"})
        }
        res.json(usuario)
    } catch (err) {
        res.status(500).json({error: "Error al buscar usuario"})
    }
})

//crear usuario desde admin
router.post("/crear-usuario", verifyToken, verifyAdmin, async(req, res) => {
    const { cedula, password, nombre, apellido } = req.body

    try {
        const hashed = await bcrypt.hash(password, 10)
        const user = new User({ cedula, password: hashed, nombre, apellido, rol: 'usuario' })
        await user.save()
        res.status(201).json({ msg: "Usuario creado exitosamente" })
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).json({ error: "Ya existe un usuario con esa cédula" })
        } else {
            res.status(400).json({ error: "Error al crear usuario" })
        }
    }
})

//eliminar usuario (solo admin)
router.delete("/eliminar-usuario/:cedula", verifyToken, verifyAdmin, async(req, res) => {
    try {
        const { cedula } = req.params

        // No permitir eliminar el usuario admin
        if (cedula === 'admin') {
            return res.status(400).json({error: "No se puede eliminar el usuario administrador"})
        }

        const usuario = await User.findOneAndDelete({ cedula, rol: 'usuario' })
        
        if (!usuario) {
            return res.status(404).json({error: "Usuario no encontrado"})
        }

        res.json({msg: `Usuario ${usuario.nombre} ${usuario.apellido} eliminado exitosamente`})
    } catch (err) {
        console.error('Error al eliminar usuario:', err)
        res.status(500).json({error: "Error al eliminar usuario"})
    }
})

// Verificar contraseña del administrador para operaciones críticas
router.post("/verify-admin", verifyToken, verifyAdmin, async(req, res) => {
    try {
        const { password } = req.body
        
        if (!password) {
            return res.status(400).json({error: "Contraseña requerida"})
        }

        // Buscar el usuario admin que está haciendo la solicitud
        const admin = await User.findById(req.userId)
        
        if (!admin || admin.rol !== 'admin') {
            return res.status(403).json({error: "No autorizado"})
        }

        // Verificar la contraseña
        const isValid = await bcrypt.compare(password, admin.password)
        
        if (!isValid) {
            return res.status(401).json({error: "Contraseña incorrecta"})
        }

        res.json({msg: "Contraseña verificada correctamente"})
    } catch (err) {
        console.error('Error al verificar contraseña admin:', err)
        res.status(500).json({error: "Error al verificar contraseña"})
    }
})

// Actualizar usuario (solo admin)
router.put("/actualizar-usuario/:cedula", verifyToken, verifyAdmin, async(req, res) => {
    try {
        const { cedula } = req.params
        const { nombre, apellido, password } = req.body

        // No permitir actualizar el usuario admin
        if (cedula === 'admin') {
            return res.status(400).json({error: "No se puede actualizar el usuario administrador desde esta función"})
        }

        // Buscar el usuario
        const usuario = await User.findOne({ cedula, rol: 'usuario' })
        
        if (!usuario) {
            return res.status(404).json({error: "Usuario no encontrado"})
        }

        // Preparar datos de actualización
        const datosActualizacion = {
            nombre: nombre || usuario.nombre,
            apellido: apellido || usuario.apellido
        }

        // Si se proporciona una nueva contraseña, encriptarla
        if (password && password.trim()) {
            const hashedPassword = await bcrypt.hash(password, 10)
            datosActualizacion.password = hashedPassword
        }

        // Actualizar el usuario
        const usuarioActualizado = await User.findOneAndUpdate(
            { cedula, rol: 'usuario' },
            datosActualizacion,
            { new: true }
        ).select('cedula nombre apellido')

        if (!usuarioActualizado) {
            return res.status(404).json({error: "Usuario no encontrado"})
        }

        res.json({
            msg: `Usuario ${usuarioActualizado.nombre} ${usuarioActualizado.apellido} actualizado exitosamente`,
            usuario: usuarioActualizado
        })
    } catch (err) {
        console.error('Error al actualizar usuario:', err)
        if (err.code === 11000) {
            res.status(400).json({error: "Ya existe un usuario con esa información"})
        } else {
            res.status(500).json({error: "Error al actualizar usuario"})
        }
    }
})

export { verifyToken, verifyAdmin }
export default router
# 🏢 PRESTAPP - Sistema de Gestión de Préstamos Profesional

**PRESTAPP** es un sistema completo de gestión de préstamos y alquileres diseñado para instituciones educativas, empresas y organizaciones que necesitan controlar el flujo de equipos, instrumentos y recursos compartidos. Desarrollado con tecnologías modernas y enfoque en la experiencia del usuario.

[![React](https://img.shields.io/badge/React-18.0+-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.0+-339933?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-47A248?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express-4.18+-000000?style=for-the-badge&logo=express)](https://expressjs.com/)

---

## 🎯 **Características Principales**

### 🔐 **Sistema de Autenticación Avanzado**
- **Autenticación JWT**: Seguridad robusta con tokens de sesión
- **Roles Diferenciados**: Administradores y usuarios finales con permisos específicos
- **Sesiones Persistentes**: Mantenimiento automático de sesiones activas
- **Logout Seguro**: Invalidación completa de tokens al cerrar sesión

### 📊 **Panel de Administración Completo**
- **Dashboard Centralizado**: Vista unificada de todas las operaciones del sistema
- **Gestión de Usuarios**: CRUD completo con búsqueda por cédula
- **Gestión de Categorías**: Sistema dinámico con iconos personalizables
- **Gestión de Elementos**: Control total del inventario por categorías
- **Estadísticas en Tiempo Real**: Contadores automáticos y métricas del sistema

### 🎨 **Interfaz de Usuario Moderna**
- **Diseño Glassmorphism**: Efectos visuales modernos con transparencias y desenfoque
- **Responsive Design**: Adaptable a dispositivos móviles, tablets y escritorio
- **Navegación Intuitiva**: UX optimizada para facilitar el flujo de trabajo
- **Feedback Visual**: Confirmaciones, alertas y estados en tiempo real
- **Iconografía Bootstrap**: Iconos profesionales y consistentes

### 📋 **Gestión de Categorías Dinámica**
- **Categorías Personalizables**: Crear categorías según las necesidades específicas
- **Iconos Emoji**: Selector visual de emojis para identificación rápida
- **Edición en Vivo**: Modificar nombre, descripción e icono sin interrupciones
- **Eliminación Segura**: Confirmaciones antes de eliminar categorías
- **Vista de Tarjetas**: Interfaz visual para navegación intuitiva

### 🛠️ **Gestión de Elementos/Inventario**
- **CRUD Completo**: Crear, leer, actualizar y eliminar elementos
- **Asignación por Categoría**: Organización automática del inventario
- **Estados Dinámicos**: Disponible, alquilado, en mantenimiento
- **Información Detallada**: Nombre, descripción y datos adicionales
- **Reasignación de Categorías**: Mover elementos entre categorías

### 👥 **Gestión Avanzada de Usuarios**
- **Registro Completo**: Cédula, nombre, apellido y contraseña
- **Búsqueda por Cédula**: Localización rápida de usuarios registrados
- **Edición de Perfiles**: Actualización de datos personales
- **Lista Expandible**: Vista completa de todos los usuarios registrados
- **Eliminación Controlada**: Confirmaciones de seguridad

### 🔄 **Sistema de Préstamos y Devoluciones**
- **Alquiler por Cédula**: Asignación de elementos mediante identificación
- **Control de Disponibilidad**: Validación automática de elementos disponibles
- **Información del Prestamista**: Registro completo de quién tiene cada elemento
- **Devoluciones Controladas**: Proceso guiado para recuperar elementos
- **Estados Visuales**: Indicadores claros de estado de cada elemento

### 📈 **Historial y Seguimiento Completo**
- **Registro de Movimientos**: Trazabilidad completa de todos los préstamos
- **Filtros Inteligentes**: Por fecha, usuario, elemento o estado
- **Historial Personal**: Vista individual para cada usuario
- **Estadísticas Globales**: Métricas del sistema en tiempo real
- **Exportación de Datos**: Información lista para reportes

### 📱 **Panel de Usuario Final**
- **Vista Personal**: Dashboard específico para usuarios no administrativos
- **Mis Préstamos Activos**: Lista de elementos actualmente en posesión
- **Mi Historial**: Registro personal de todos los movimientos
- **Información Detallada**: Fechas de préstamo, devolución y estados
- **Interfaz Simplificada**: Diseño enfocado en la información esencial

---

## 🚀 **Inicio Rápido**

### **Opción 1: Script Automático (Recomendado)**
```powershell
# Ejecutar desde el directorio raíz
.\start.ps1
```

### **Opción 2: Inicio Manual**

**1. Configuración del Backend:**
```bash
cd server
npm install
npm start
```

**2. Configuración del Frontend:**
```bash
cd cliente
npm install
npm run dev
```

**3. Acceso al Sistema:**
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

---

## 🛠️ **Stack Tecnológico**

### **Frontend**
- **React 18+**: Biblioteca de componentes moderna
- **Vite**: Herramienta de construcción rápida
- **CSS3**: Estilos modernos con Glassmorphism
- **Bootstrap Icons**: Iconografía profesional
- **Responsive Design**: Compatible con todos los dispositivos

### **Backend**
- **Node.js**: Entorno de ejecución JavaScript
- **Express.js**: Framework web minimalista
- **JWT**: Autenticación mediante tokens
- **bcryptjs**: Encriptación de contraseñas
- **CORS**: Configuración de políticas de origen cruzado

### **Base de Datos**
- **MongoDB**: Base de datos NoSQL orientada a documentos
- **Mongoose**: ODM para modelado de datos elegante

### **Herramientas de Desarrollo**
- **dotenv**: Gestión de variables de entorno
- **Nodemon**: Recarga automática en desarrollo
- **PowerShell Scripts**: Automatización de inicio

---

## 📁 **Arquitectura del Proyecto**

```
PRESTAPP/
├── 📂 cliente/                    # Frontend React Application
│   ├── 📂 src/
│   │   ├── 📄 App-simple.jsx     # Componente principal de la aplicación
│   │   ├── 📄 main.jsx           # Punto de entrada de React
│   │   ├── 📂 components/        # Componentes reutilizables
│   │   │   ├── 📄 AdminDashboard.jsx          # Panel de administración
│   │   │   ├── 📄 UserDashboardComplete.jsx   # Panel de usuario
│   │   │   ├── 📄 Auth.jsx                    # Componente de autenticación
│   │   │   ├── 📄 CategoryManagement.jsx      # Gestión de categorías
│   │   │   ├── 📄 ElementsManagement.jsx      # Gestión de elementos
│   │   │   ├── 📄 UserManagement.jsx          # Gestión de usuarios
│   │   │   ├── 📄 ActiveRentals.jsx           # Alquileres activos
│   │   │   ├── 📄 MovementHistory.jsx         # Historial de movimientos
│   │   │   ├── 📄 RentalForm.jsx              # Formulario de alquiler
│   │   │   ├── 📄 AddElementForm.jsx          # Formulario agregar elemento
│   │   │   ├── 📄 EditElementForm.jsx         # Formulario editar elemento
│   │   │   ├── 📄 StatsGrid.jsx               # Grid de estadísticas
│   │   │   ├── 📄 UserStatsGrid.jsx           # Estadísticas de usuario
│   │   │   └── 📄 EmojiSelector.jsx           # Selector de emojis
│   │   ├── 📂 hooks/             # Custom React Hooks
│   │   │   ├── 📄 useDataManagement.js        # Hook de gestión de datos
│   │   │   └── 📄 useUIState.js               # Hook de estado de UI
│   │   ├── 📂 services/          # Servicios de API
│   │   │   └── 📄 ApiService.js               # Servicio de comunicación API
│   │   ├── 📂 utils/             # Utilidades
│   │   │   └── 📄 timezone.js                 # Gestión de zona horaria
│   │   └── 📂 assets/            # Recursos estáticos
│   ├── 📄 index.html             # Plantilla HTML principal
│   ├── 📄 package.json           # Dependencias del frontend
│   └── 📄 vite.config.js         # Configuración de Vite
│
├── 📂 server/                     # Backend Node.js Application
│   ├── 📄 index.js               # Servidor principal Express
│   ├── 📂 models/                # Modelos de datos MongoDB
│   │   ├── 📄 User.js                         # Modelo de usuario
│   │   ├── 📄 Category.js                     # Modelo de categoría
│   │   ├── 📄 Item.js                         # Modelo de elemento/item
│   │   └── 📄 Registro.js                     # Modelo de movimientos
│   ├── 📂 routes/                # Rutas de la API REST
│   │   ├── 📄 auth.js                         # Autenticación y autorización
│   │   ├── 📄 categories.js                   # Operaciones de categorías
│   │   ├── 📄 items.js                        # Operaciones de elementos
│   │   ├── 📄 instruments.js                  # Compatibilidad instrumentos
│   │   └── 📄 user-dashboard.js               # API específica usuarios
│   ├── 📂 utils/                 # Utilidades del servidor
│   │   └── 📄 timezone.js                     # Gestión de zona horaria
│   ├── 📄 package.json           # Dependencias del backend
│   └── 📄 .env                   # Variables de entorno (crear)
│
├── 📄 start.ps1                  # Script de inicio automatizado
├── 📄 package.json               # Configuración del proyecto raíz
└── 📄 README.md                  # Documentación del proyecto
```

---

## ⚙️ **Configuración del Sistema**

### **Variables de Entorno (server/.env)**
```env
# Configuración de Base de Datos
MONGO_URL=mongodb://localhost:27017/prestapp
MONGODB_URI=mongodb://localhost:27017/prestapp

# Configuración de Autenticación
JWT_SECRET=tu_clave_secreta_muy_segura_aqui

# Configuración del Servidor
PORT=5000
NODE_ENV=development

# Configuración de Zona Horaria
TZ=America/Asuncion
```

### **Puertos del Sistema**
- **Frontend Development**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`
- **MongoDB**: `mongodb://localhost:27017`

---

## 📋 **Guía de Usuario Completa**

### **🔐 Acceso al Sistema**

**1. Cuenta de Administrador:**
- **Usuario**: Configurado en la primera ejecución
- **Rol**: Administrador con acceso completo
- **Funciones**: Gestión total del sistema

**2. Cuentas de Usuario:**
- **Registro**: Solo a través del administrador
- **Rol**: Usuario final con vista de solo lectura
- **Funciones**: Consulta de préstamos e historial personal

### **👨‍💼 Funcionalidades de Administrador**

**📊 Dashboard Principal:**
- Vista general del sistema con estadísticas en tiempo real
- Acceso rápido a todas las funcionalidades
- Contadores de usuarios, categorías, elementos y préstamos activos

**👥 Gestión de Usuarios:**
- ➕ **Crear Usuario**: Registro con cédula, nombre, apellido y contraseña
- 🔍 **Buscar Usuario**: Localización rápida por número de cédula
- ✏️ **Editar Usuario**: Modificación de datos personales (excepto cédula)
- 🗑️ **Eliminar Usuario**: Eliminación con confirmación de seguridad
- 📋 **Lista Expandible**: Vista completa de todos los usuarios registrados

**📁 Gestión de Categorías:**
- ➕ **Crear Categoría**: Definir nueva categoría con nombre, descripción e icono
- 🎨 **Selector de Emojis**: Interfaz visual para elegir iconos representativos
- ✏️ **Editar Categoría**: Modificar cualquier aspecto de la categoría
- 🗑️ **Eliminar Categoría**: Eliminación controlada con verificaciones
- 🖼️ **Vista de Tarjetas**: Interfaz visual para navegación intuitiva

**🛠️ Gestión de Elementos:**
- ➕ **Agregar Elemento**: Crear nuevo elemento asignado a una categoría
- ✏️ **Editar Elemento**: Modificar nombre, descripción y reasignar categoría
- 🗑️ **Eliminar Elemento**: Eliminación con confirmación de seguridad
- 🔄 **Alquilar Elemento**: Asignar elemento a usuario mediante cédula
- ↩️ **Devolver Elemento**: Procesar devolución y liberar elemento
- 📊 **Estados Visuales**: Indicadores claros de disponibilidad

**📋 Gestión de Préstamos:**
- 📦 **Alquileres Activos**: Vista completa de todos los préstamos vigentes
- ↩️ **Proceso de Devolución**: Interfaz guiada para recuperar elementos
- 👤 **Información del Prestamista**: Datos completos de quien posee cada elemento
- 🔄 **Actualización en Tiempo Real**: Sincronización automática de estados

**📈 Historial y Reportes:**
- 📊 **Historial Completo**: Registro de todos los movimientos del sistema
- 🔍 **Filtros Avanzados**: Por fecha (hoy, ayer, semana, mes, personalizado)
- 📅 **Filtro por Rango**: Selección de fechas específicas
- 🧹 **Limpiar Filtros**: Restablecer vista completa
- 📊 **Estadísticas**: Métricas automáticas del sistema

### **👤 Funcionalidades de Usuario Final**

**🏠 Panel Personal:**
- 📊 **Estadísticas Personales**: Resumen de actividad del usuario
- 📦 **Mis Préstamos Activos**: Lista de elementos actualmente en posesión
- 📅 **Fechas de Préstamo**: Información detallada de cuándo se realizó cada préstamo
- ⏱️ **Estado en Tiempo Real**: Actualización automática de información

**📋 Mi Historial:**
- 📊 **Historial Personal**: Registro completo de todos los movimientos del usuario
- 🔍 **Filtro por Fecha**: Buscar movimientos por fecha específica
- 📅 **Información Detallada**: Fechas de préstamo, devolución y estados
- 🧹 **Limpiar Filtros**: Ver historial completo sin restricciones

---

## 🔧 **Instalación y Configuración Detallada**

### **Prerrequisitos**
- **Node.js** 18.0+ ([Descargar](https://nodejs.org/))
- **MongoDB** 6.0+ ([Descargar](https://www.mongodb.com/try/download/community))
- **Git** ([Descargar](https://git-scm.com/))

### **Instalación Paso a Paso**

**1. Clonar el Repositorio:**
```bash
git clone <url-del-repositorio>
cd prestapp
```

**2. Configurar el Backend:**
```bash
cd server
npm install
```

**3. Configurar Variables de Entorno:**
```bash
# Crear archivo .env en la carpeta server
cp .env.example .env
# Editar las variables según tu configuración
```

**4. Configurar el Frontend:**
```bash
cd ../cliente
npm install
```

**5. Iniciar MongoDB:**
```bash
# Asegúrate de que MongoDB esté ejecutándose
mongod
```

**6. Ejecutar el Sistema:**
```bash
# Opción A: Script automático (desde raíz)
.\start.ps1

# Opción B: Manual
# Terminal 1 (Backend)
cd server && npm start

# Terminal 2 (Frontend)
cd cliente && npm run dev
```

---

## 🔒 **Seguridad y Mejores Prácticas**

### **Autenticación y Autorización**
- **JWT Tokens**: Autenticación segura con tokens de corta duración
- **Verificación de Roles**: Middleware de verificación en todas las rutas protegidas
- **Validación de Entrada**: Sanitización de todos los inputs del usuario
- **Encriptación de Contraseñas**: Hash seguro con bcryptjs

### **Protección de Datos**
- **Variables de Entorno**: Configuración sensible fuera del código
- **Validación del Backend**: Verificación de datos en el servidor
- **Manejo de Errores**: Respuestas controladas sin exposición de información

### **Mejores Prácticas Implementadas**
- **Separación de Responsabilidades**: Arquitectura MVC clara
- **Código Modular**: Componentes y funciones reutilizables
- **Documentación Completa**: Comentarios profesionales en todo el código
- **Manejo de Estados**: Gestión centralizada con custom hooks

---

## 📊 **Flujo de Trabajo Recomendado**

### **Configuración Inicial del Sistema**

**1. Primer Acceso:**
- Acceder con credenciales de administrador
- Configurar información básica del sistema
- Crear las primeras categorías necesarias

**2. Configuración de Inventario:**
- Definir categorías según necesidades (Instrumentos, Herramientas, Equipos, etc.)
- Agregar elementos a cada categoría con descripciones detalladas
- Verificar que todos los elementos estén correctamente categorizados

**3. Gestión de Usuarios:**
- Registrar usuarios del sistema con sus datos completos
- Verificar que las cédulas sean únicas y correctas
- Realizar pruebas de acceso con usuarios creados

### **Operación Diaria del Sistema**

**1. Procesamiento de Préstamos:**
- Verificar disponibilidad del elemento solicitado
- Buscar usuario por cédula
- Procesar alquiler y verificar confirmación
- Informar al usuario sobre la transacción

**2. Gestión de Devoluciones:**
- Revisar alquileres activos pendientes
- Procesar devoluciones de elementos
- Verificar estado del elemento devuelto
- Actualizar disponibilidad en el sistema

**3. Monitoreo y Reportes:**
- Revisar estadísticas diarias del sistema
- Filtrar historial por fechas específicas
- Identificar elementos con mayor rotación
- Generar reportes para seguimiento

---

## 🎯 **Casos de Uso Específicos**

### **🎓 Instituciones Educativas**
- **Instrumentos Musicales**: Préstamo de guitarras, teclados, equipos de audio
- **Equipos de Laboratorio**: Microscopios, calculadoras, material científico
- **Material Deportivo**: Balones, raquetas, equipos deportivos
- **Recursos Audiovisuales**: Proyectores, laptops, equipos de sonido

### **🏢 Empresas y Oficinas**
- **Equipos Tecnológicos**: Laptops, tablets, cámaras, equipos de grabación
- **Herramientas de Trabajo**: Taladros, llaves, equipos de medición
- **Material de Oficina**: Calculadoras, presentadores, material especializado
- **Equipos de Seguridad**: Cascos, chalecos, equipos de protección

### **🏥 Instituciones de Salud**
- **Equipos Médicos**: Tensiómetros, estetoscopios, termómetros
- **Material Especializado**: Equipos de diagnóstico, instrumental médico
- **Recursos de Capacitación**: Material educativo, simuladores
- **Equipos de Emergencia**: Botiquines, equipos de primeros auxilios

---

## 🚀 **Escalabilidad y Futuras Mejoras**

### **Características Planificadas**
- **Notificaciones Push**: Alertas automáticas para devoluciones
- **Códigos QR**: Identificación rápida de elementos
- **Reportes PDF**: Exportación de reportes detallados
- **API REST Completa**: Integración con sistemas externos
- **App Móvil**: Versión nativa para dispositivos móviles

### **Optimizaciones Técnicas**
- **Cache Redis**: Mejora de rendimiento en consultas frecuentes
- **Búsqueda Avanzada**: Filtros más sofisticados y búsqueda por texto
- **Backup Automático**: Respaldos programados de la base de datos
- **Monitoreo del Sistema**: Métricas de rendimiento y uso

---

## 🤝 **Contribución y Soporte**

### **Desarrollo y Mantenimiento**
- **Código Abierto**: Contribuciones bienvenidas
- **Documentación**: Código completamente documentado
- **Estándares**: Siguiendo mejores prácticas de desarrollo
- **Testing**: Pruebas unitarias e integración

### **Soporte Técnico**
- **Documentación Completa**: Guías detalladas para usuarios y desarrolladores
- **Código Auto-documentado**: Comentarios profesionales en todo el sistema
- **Ejemplos Prácticos**: Casos de uso reales incluidos
- **Configuración Asistida**: Scripts de inicio automatizados

---

## 📄 **Licencia y Términos**

Este sistema está desarrollado para uso institucional y empresarial. Todos los derechos reservados.

---

## 🏆 **Créditos**

**PRESTAPP** - Sistema de Gestión de Préstamos Profesional
- **Desarrollo**: Sistema completo MERN Stack
- **Diseño**: Interfaz moderna con enfoque en UX/UI
- **Arquitectura**: Escalable y mantenible
- **Documentación**: Completa y profesional

*Desarrollado con ❤️ para optimizar la gestión de recursos compartidos*

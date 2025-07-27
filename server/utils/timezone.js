// Utilidades para manejo de zona horaria de Paraguay (GMT-3)

// Función para obtener la fecha actual en Paraguay
export function obtenerFechaParaguay() {
    // Usar el timezone de Paraguay directamente
    const ahora = new Date();
    return new Date(ahora.toLocaleString("en-US", {timeZone: "America/Asuncion"}));
}

// Función para convertir una fecha a la zona horaria de Paraguay
export function convertirAParaguay(fecha) {
    if (!fecha) return null;
    const fechaObj = new Date(fecha);
    return new Date(fechaObj.toLocaleString("en-US", {timeZone: "America/Asuncion"}));
}

// Función para obtener el inicio del día en Paraguay
export function inicioDelDiaParaguay(fecha = null) {
    const fechaBase = fecha ? new Date(fecha + 'T00:00:00') : new Date();
    
    // Si tenemos una fecha específica, crear el inicio del día
    if (fecha) {
        // Crear fecha en UTC para el inicio del día en Paraguay
        const fechaUTC = new Date(fecha + 'T03:00:00.000Z'); // Paraguay GMT-3, so 03:00 UTC = 00:00 Paraguay
        return fechaUTC;
    }
    
    // Para fecha actual, obtener inicio del día en Paraguay
    const fechaParaguay = new Date(fechaBase.toLocaleString("en-US", {timeZone: "America/Asuncion"}));
    fechaParaguay.setHours(0, 0, 0, 0);
    return fechaParaguay;
}

// Función para obtener el fin del día en Paraguay  
export function finDelDiaParaguay(fecha = null) {
    const fechaBase = fecha ? new Date(fecha + 'T23:59:59') : new Date();
    
    // Si tenemos una fecha específica, crear el fin del día
    if (fecha) {
        // Crear fecha en UTC para el fin del día en Paraguay
        const fechaUTC = new Date(fecha + 'T02:59:59.999Z'); // Paraguay GMT-3, so 02:59:59 UTC = 23:59:59 Paraguay
        fechaUTC.setDate(fechaUTC.getDate() + 1); // Siguiente día en UTC
        return fechaUTC;
    }
    
    // Para fecha actual, obtener fin del día en Paraguay
    const fechaParaguay = new Date(fechaBase.toLocaleString("en-US", {timeZone: "America/Asuncion"}));
    fechaParaguay.setHours(23, 59, 59, 999);
    return fechaParaguay;
}

// Función para formatear fecha para mostrar en Paraguay
export function formatearFechaParaguay(fecha, incluirHora = true) {
    if (!fecha) return '';
    
    const fechaObj = new Date(fecha);
    
    const opciones = {
        timeZone: 'America/Asuncion', // Zona horaria de Paraguay
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    };
    
    if (incluirHora) {
        opciones.hour = '2-digit';
        opciones.minute = '2-digit';
        opciones.second = '2-digit';
        opciones.hour12 = false; // Formato 24 horas
    }
    
    return fechaObj.toLocaleString('es-PY', opciones);
}

// Función para crear filtros de fecha considerando Paraguay
export function crearFiltroFecha(fechaString) {
    if (!fechaString) return {};
    
    // Crear fecha en la zona horaria de Paraguay
    const fechaLocal = new Date(fechaString + 'T00:00:00');
    const fechaParaguay = new Date(fechaLocal.toLocaleString("en-US", {timeZone: "America/Asuncion"}));
    
    const fechaInicio = new Date(fechaParaguay);
    fechaInicio.setHours(0, 0, 0, 0);
    
    const fechaFin = new Date(fechaParaguay);
    fechaFin.setHours(23, 59, 59, 999);
    
    return {
        $gte: fechaInicio,
        $lte: fechaFin
    };
}

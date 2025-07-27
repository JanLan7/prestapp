// Utilidades para el manejo de fechas en el frontend (Paraguay GMT-3)

// Función para formatear fecha para mostrar en Paraguay
export const formatearFechaParaguay = (fecha, incluirHora = true) => {
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
};

// Función para obtener fecha local de Paraguay
export const obtenerFechaLocalParaguay = () => {
    const ahora = new Date();
    return ahora.toLocaleString('sv-SE', { 
        timeZone: 'America/Asuncion' 
    }).split(' ')[0]; // Solo la fecha en formato YYYY-MM-DD
};

// Función para convertir fecha a input date
export const convertirParaInput = (fecha) => {
    if (!fecha) return '';
    
    const fechaObj = new Date(fecha);
    const fechaParaguay = new Date(fechaObj.toLocaleString('en-US', { 
        timeZone: 'America/Asuncion' 
    }));
    
    const año = fechaParaguay.getFullYear();
    const mes = String(fechaParaguay.getMonth() + 1).padStart(2, '0');
    const dia = String(fechaParaguay.getDate()).padStart(2, '0');
    
    return `${año}-${mes}-${dia}`;
};

// Función para obtener el nombre del día en español
export const obtenerNombreDia = (fecha) => {
    if (!fecha) return '';
    
    const fechaObj = new Date(fecha);
    return fechaObj.toLocaleDateString('es-PY', { 
        weekday: 'long',
        timeZone: 'America/Asuncion'
    });
};

// Función para comparar si es hoy (en Paraguay)
export const esHoy = (fecha) => {
    if (!fecha) return false;
    
    const fechaObj = new Date(fecha);
    const hoy = new Date();
    
    const fechaParaguay = fechaObj.toLocaleDateString('es-PY', { 
        timeZone: 'America/Asuncion' 
    });
    const hoyParaguay = hoy.toLocaleDateString('es-PY', { 
        timeZone: 'America/Asuncion' 
    });
    
    return fechaParaguay === hoyParaguay;
};

// Función para comparar si es ayer (en Paraguay)
export const esAyer = (fecha) => {
    if (!fecha) return false;
    
    const fechaObj = new Date(fecha);
    const ayer = new Date();
    ayer.setDate(ayer.getDate() - 1);
    
    const fechaParaguay = fechaObj.toLocaleDateString('es-PY', { 
        timeZone: 'America/Asuncion' 
    });
    const ayerParaguay = ayer.toLocaleDateString('es-PY', { 
        timeZone: 'America/Asuncion' 
    });
    
    return fechaParaguay === ayerParaguay;
};

// Función para obtener tiempo relativo (hace X tiempo)
export const tiempoRelativo = (fecha) => {
    if (!fecha) return '';
    
    const fechaObj = new Date(fecha);
    const ahora = new Date();
    
    // Convertir ambas fechas a la zona horaria de Paraguay
    const fechaParaguay = new Date(fechaObj.toLocaleString('en-US', { 
        timeZone: 'America/Asuncion' 
    }));
    const ahoraParaguay = new Date(ahora.toLocaleString('en-US', { 
        timeZone: 'America/Asuncion' 
    }));
    
    const diferencia = ahoraParaguay - fechaParaguay;
    const minutos = Math.floor(diferencia / (1000 * 60));
    const horas = Math.floor(diferencia / (1000 * 60 * 60));
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    
    if (minutos < 1) {
        return 'Hace unos momentos';
    } else if (minutos < 60) {
        return `Hace ${minutos} minuto${minutos > 1 ? 's' : ''}`;
    } else if (horas < 24) {
        return `Hace ${horas} hora${horas > 1 ? 's' : ''}`;
    } else if (dias < 7) {
        return `Hace ${dias} día${dias > 1 ? 's' : ''}`;
    } else {
        return formatearFechaParaguay(fecha, false);
    }
};

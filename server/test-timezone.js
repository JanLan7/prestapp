// Script de prueba para verificar el manejo correcto de fechas con zona horaria de Paraguay

import { obtenerFechaParaguay, formatearFechaParaguay, crearFiltroFecha } from './utils/timezone.js';

console.log('🕐 === PRUEBA DE ZONA HORARIA PARAGUAY (GMT-3) ===');
console.log('');

// Fecha actual en UTC
const fechaUTC = new Date();
console.log('🌍 Fecha UTC:', fechaUTC.toISOString());
console.log('🌍 Fecha local del sistema:', fechaUTC.toString());

// Fecha ajustada para Paraguay
const fechaParaguay = obtenerFechaParaguay();
console.log('🇵🇾 Fecha Paraguay (GMT-3):', fechaParaguay.toString());

// Formateo para mostrar
console.log('');
console.log('📅 Formateado Paraguay:', formatearFechaParaguay(fechaParaguay));
console.log('📅 Formateado solo fecha:', formatearFechaParaguay(fechaParaguay, false));

// Comparación de zonas horarias
const diferenciaHoras = (fechaUTC.getTime() - fechaParaguay.getTime()) / (1000 * 60 * 60);
console.log('');
console.log('⏰ Diferencia horaria:', Math.round(diferenciaHoras), 'horas');
console.log('✅ Configuración correcta para Paraguay (GMT-3):', Math.round(diferenciaHoras) === 3 ? 'SÍ' : 'NO');

// Prueba de filtros
console.log('');
console.log('🔍 === PRUEBA DE FILTROS DE FECHA ===');
const filtro = crearFiltroFecha('2025-07-19');
console.log('Filtro para 2025-07-19:', filtro);

console.log('');
console.log('✅ Script de prueba completado');

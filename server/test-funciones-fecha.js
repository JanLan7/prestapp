// Probar funciones de fecha
import { inicioDelDiaParaguay, finDelDiaParaguay, obtenerFechaParaguay } from './utils/timezone.js';

console.log('🧪 === PRUEBA DE FUNCIONES DE FECHA ===');

// Fecha de prueba: 2025-07-19
const fechaPrueba = '2025-07-19';

console.log('📅 Fecha de prueba:', fechaPrueba);
console.log('🌅 Inicio del día (Paraguay):', inicioDelDiaParaguay(fechaPrueba));
console.log('🌇 Fin del día (Paraguay):', finDelDiaParaguay(fechaPrueba));

console.log('');
console.log('📅 Fecha actual de Paraguay:', obtenerFechaParaguay());

// Simular el rango que se está usando en el filtro
const inicio = inicioDelDiaParaguay(fechaPrueba);
const fin = finDelDiaParaguay(fechaPrueba);

console.log('');
console.log('🔍 Rango de filtro:');
console.log('  Desde:', inicio.toISOString());
console.log('  Hasta:', fin.toISOString());

// Verificar si nuestra fecha de prueba está en el rango
const fechaRegistro = new Date('2025-07-19T19:17:18.000Z');
console.log('');
console.log('📝 Fecha del registro:', fechaRegistro.toISOString());
console.log('✅ ¿Está en el rango?', fechaRegistro >= inicio && fechaRegistro <= fin);

console.log('');
console.log('✅ Prueba completada');

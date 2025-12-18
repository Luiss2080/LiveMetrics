/**
 * Formatea un número a dos decimales
 */
export function formatearDecimal(numero) {
  return Number(numero).toFixed(2)
}

/**
 * Formatea un número con separadores de miles
 */
export function formatearMiles(numero) {
  return new Intl.NumberFormat('es-ES').format(numero)
}

/**
 * Formatea un porcentaje
 */
export function formatearPorcentaje(numero) {
  return `${numero}%`
}

/**
 * Formatea una fecha a hora local
 */
export function formatearHora(fecha) {
  return new Date(fecha).toLocaleTimeString('es-ES')
}

/**
 * Obtiene el color según el valor del porcentaje
 */
export function obtenerColorSegunValor(valor) {
  if (valor < 30) return '#4ade80' // Verde
  if (valor < 70) return '#fbbf24' // Amarillo
  return '#f87171' // Rojo
}

/**
 * Genera datos de métricas aleatorios para pruebas
 */
export function generarMetricasAleatorias() {
  return {
    timestamp: new Date().toISOString(),
    cpu: Math.floor(Math.random() * 100),
    memoria: Math.floor(Math.random() * 100),
    peticiones: Math.floor(Math.random() * 1000),
    usuariosActivos: Math.floor(Math.random() * 500)
  }
}

/**
 * Genera un array de colores para gráficos
 */
export function generarPaletaColores(cantidad) {
  const colores = [
    '#ff6384',
    '#36a2eb',
    '#ffce56',
    '#4bc0c0',
    '#9966ff',
    '#ff9f40'
  ]
  // Si se piden más colores que los definidos, se cicla la paleta en vez de
  // devolver menos colores de los solicitados (dejaría categorías sin color).
  return Array.from({ length: cantidad }, (_, i) => colores[i % colores.length])
}

/**
 * Genera etiquetas numéricas secuenciales
 */
export function generarEtiquetas(cantidad) {
  return Array.from({ length: cantidad }, (_, i) => `${i + 1}`)
}

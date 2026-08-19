/**
 * Formatea un porcentaje (ej: 45.2 -> "45.2%")
 */
export const formatearPorcentaje = (valor) => {
  if (valor === null || valor === undefined) return '0%';
  return `${Number(valor).toFixed(1)}%`;
};

/**
 * Formatea un número grande (ej: 1200 -> "1.2k")
 */
export const formatearNumeroGrande = (numero) => {
  if (numero === null || numero === undefined) return '0';
  return new Intl.NumberFormat('es-ES', {
    notation: 'compact',
    compactDisplay: 'short'
  }).format(numero);
};

/**
 * Retorna el color de estado según el porcentaje (verde, amarillo, rojo)
 */
export const obtenerColorEstado = (valor) => {
  if (valor >= 80) return 'var(--estado-peligro)';
  if (valor >= 50) return 'var(--estado-alerta)';
  return 'var(--estado-exito)';
};

/**
 * Formatea solo la hora de una fecha ISO
 */
export const formatearHora = (fechaIso) => {
  const fecha = new Date(fechaIso);
  return fecha.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

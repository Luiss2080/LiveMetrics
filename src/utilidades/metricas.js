// Lectura de metricas segun el contrato del servidor (ver server/metricas.js).
// La memoria llega en la clave `memoria` (no `ram`).
export const porcentajeMemoria = (metricas) => metricas?.memoria ?? 0;

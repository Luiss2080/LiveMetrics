import crypto from 'node:crypto';

const ORIGENES_POR_DEFECTO = ['http://localhost:3000', 'http://127.0.0.1:3000'];

// Lee la configuracion sensible del entorno.
// - JWT_SECRET es obligatorio en produccion (>= 32 caracteres). Fuera de produccion,
//   si falta, se genera un secreto aleatorio por proceso (las sesiones no sobreviven
//   a un reinicio) y se avisa por consola.
// - CORS_ORIGINS: lista separada por comas; por defecto solo el front local (Vite, 3000).
export function cargarConfig(env = process.env) {
  const produccion = env.NODE_ENV === 'production';
  let jwtSecret = env.JWT_SECRET;

  if (!jwtSecret) {
    if (produccion) {
      throw new Error('JWT_SECRET es obligatorio en produccion: define la variable de entorno antes de arrancar el servidor');
    }
    jwtSecret = crypto.randomBytes(48).toString('hex');
    console.warn('JWT_SECRET no definido: se usa un secreto aleatorio temporal (las sesiones se pierden al reiniciar)');
  } else if (produccion && jwtSecret.length < 32) {
    throw new Error('JWT_SECRET debe tener al menos 32 caracteres en produccion');
  }

  const origenes = (env.CORS_ORIGINS ?? '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);

  return {
    jwtSecret,
    corsOrigins: origenes.length > 0 ? origenes : ORIGENES_POR_DEFECTO,
  };
}

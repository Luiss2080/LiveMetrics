const URL_API = 'http://localhost:3001';

export const CLAVE_TOKEN = 'livemetrics-auth';
export const CLAVE_USUARIO = 'livemetrics-user';

// Valida el token contra el backend (GET /api/sesion). Devuelve el usuario si la
// sesion es valida y null en cualquier otro caso (sin token, expirado, falsificado,
// usuario inexistente o backend inalcanzable).
export async function validarSesion(token, { fetchFn = globalThis.fetch, urlApi = URL_API } = {}) {
  if (!token) return null;

  try {
    const respuesta = await fetchFn(`${urlApi}/api/sesion`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!respuesta.ok) return null;
    const { usuario } = await respuesta.json();
    return usuario ?? null;
  } catch {
    return null;
  }
}

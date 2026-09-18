import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { validarSesion } from '../src/servicios/sesionServicio.js';

const respuesta = (ok, cuerpo = {}) => ({ ok, json: async () => cuerpo });

describe('validarSesion (ruta protegida)', () => {
  it('sin token no consulta al backend y devuelve null', async () => {
    let llamadas = 0;
    const fetchFn = async () => { llamadas++; return respuesta(true); };
    assert.equal(await validarSesion(null, { fetchFn }), null);
    assert.equal(llamadas, 0);
  });

  it('envia el token como Bearer a /api/sesion y devuelve el usuario', async () => {
    let pedido;
    const fetchFn = async (url, opciones) => {
      pedido = { url, opciones };
      return respuesta(true, { usuario: { nombre: 'Ana', email: 'ana@test.com' } });
    };
    const usuario = await validarSesion('tok', { fetchFn, urlApi: 'http://api' });
    assert.deepEqual(usuario, { nombre: 'Ana', email: 'ana@test.com' });
    assert.equal(pedido.url, 'http://api/api/sesion');
    assert.equal(pedido.opciones.headers.Authorization, 'Bearer tok');
  });

  it('un valor arbitrario en localStorage (401) no cuenta como sesion', async () => {
    const fetchFn = async () => respuesta(false, { error: 'Token inválido o expirado' });
    assert.equal(await validarSesion('cualquier-cosa', { fetchFn }), null);
  });

  it('si el backend no responde, no se concede acceso', async () => {
    const fetchFn = async () => { throw new TypeError('fetch failed'); };
    assert.equal(await validarSesion('tok', { fetchFn }), null);
  });
});

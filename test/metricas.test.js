import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { crearGeneradorMetricas } from '../server/metricas.js';
import { porcentajeMemoria } from '../src/utilidades/metricas.js';

describe('contrato de metricas servidor -> cliente', () => {
  it('el servidor emite `memoria` y no `ram`', () => {
    const metricas = crearGeneradorMetricas()();
    assert.equal(typeof metricas.memoria, 'number');
    assert.equal('ram' in metricas, false);
    for (const clave of ['tiempo', 'cpu', 'peticiones', 'usuarios', 'disco', 'red']) {
      assert.ok(clave in metricas, `falta ${clave}`);
    }
  });

  it('la tarjeta RAM lee el valor real emitido por el servidor', () => {
    const metricas = crearGeneradorMetricas()();
    assert.equal(porcentajeMemoria(metricas), metricas.memoria);
    assert.ok(porcentajeMemoria(metricas) >= 20);
  });

  it('sin datos devuelve 0', () => {
    assert.equal(porcentajeMemoria(null), 0);
    assert.equal(porcentajeMemoria({}), 0);
  });

  it('los valores se mantienen dentro de rango tras muchas lecturas', () => {
    const generar = crearGeneradorMetricas();
    for (let i = 0; i < 500; i++) {
      const m = generar();
      assert.ok(m.cpu >= 5 && m.cpu <= 100);
      assert.ok(m.memoria >= 20 && m.memoria <= 95);
    }
  });
});

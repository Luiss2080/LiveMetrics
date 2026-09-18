import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { crearApp } from '../server/app.js';
import { cargarConfig } from '../server/config.js';

const SECRETO = 'secreto-de-prueba-'.padEnd(40, 'x');
const ORIGEN_FRONT = 'http://localhost:3000';

const usuarios = [
  { id: 1, nombre: 'Ana', email: 'ana@test.com', password: bcrypt.hashSync('clave-larga-123', 4) },
];
const db = {
  Usuario: {
    findOne: async ({ where }) => usuarios.find((u) => u.email === where.email) ?? null,
    findByPk: async (id) => usuarios.find((u) => u.id === id) ?? null,
    create: async (datos) => {
      usuarios.push({ id: usuarios.length + 1, ...datos });
    },
  },
};

let servidor;
let base;

before(async () => {
  const app = crearApp({ db, config: { jwtSecret: SECRETO, corsOrigins: [ORIGEN_FRONT] } });
  await new Promise((resolve) => {
    servidor = app.listen(0, resolve);
  });
  base = `http://127.0.0.1:${servidor.address().port}`;
});

after(() => new Promise((resolve) => servidor.close(resolve)));

const post = (ruta, cuerpo) =>
  fetch(`${base}${ruta}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cuerpo),
  });

describe('configuracion sensible', () => {
  it('JWT_SECRET es obligatorio en produccion', () => {
    assert.throws(() => cargarConfig({ NODE_ENV: 'production' }), /JWT_SECRET es obligatorio/);
  });

  it('JWT_SECRET corto se rechaza en produccion', () => {
    assert.throws(() => cargarConfig({ NODE_ENV: 'production', JWT_SECRET: 'corto' }), /al menos 32/);
  });

  it('usa el secreto del entorno', () => {
    assert.equal(cargarConfig({ NODE_ENV: 'production', JWT_SECRET: SECRETO }).jwtSecret, SECRETO);
  });

  it('fuera de produccion genera un secreto aleatorio, distinto en cada carga', () => {
    const a = cargarConfig({}).jwtSecret;
    const b = cargarConfig({}).jwtSecret;
    assert.notEqual(a, b);
    assert.notEqual(a, 'secreto_livemetrics_123');
    assert.ok(a.length >= 32);
  });

  it('CORS por defecto solo permite el front local', () => {
    assert.deepEqual(cargarConfig({ JWT_SECRET: SECRETO }).corsOrigins, ['http://localhost:3000', 'http://127.0.0.1:3000']);
  });

  it('CORS_ORIGINS configura una lista de origenes', () => {
    const { corsOrigins } = cargarConfig({ JWT_SECRET: SECRETO, CORS_ORIGINS: 'https://a.com, https://b.com' });
    assert.deepEqual(corsOrigins, ['https://a.com', 'https://b.com']);
  });
});

describe('CORS de la API', () => {
  it('permite el origen configurado', async () => {
    const r = await fetch(`${base}/api/sesion`, { headers: { Origin: ORIGEN_FRONT } });
    assert.equal(r.headers.get('access-control-allow-origin'), ORIGEN_FRONT);
  });

  it('no concede acceso a otros origenes', async () => {
    const r = await fetch(`${base}/api/sesion`, { headers: { Origin: 'https://evil.example' } });
    assert.equal(r.headers.get('access-control-allow-origin'), null);
  });
});

describe('login y validacion de sesion', () => {
  it('login firma un JWT con el secreto configurado', async () => {
    const r = await post('/api/login', { email: 'ana@test.com', password: 'clave-larga-123' });
    assert.equal(r.status, 200);
    const { token } = await r.json();
    assert.equal(jwt.verify(token, SECRETO).id, 1);
  });

  it('login rechaza credenciales invalidas', async () => {
    const r = await post('/api/login', { email: 'ana@test.com', password: 'mala' });
    assert.equal(r.status, 401);
  });

  it('/api/sesion acepta un token valido', async () => {
    const { token } = await (await post('/api/login', { email: 'ana@test.com', password: 'clave-larga-123' })).json();
    const r = await fetch(`${base}/api/sesion`, { headers: { Authorization: `Bearer ${token}` } });
    assert.equal(r.status, 200);
    assert.deepEqual((await r.json()).usuario, { nombre: 'Ana', email: 'ana@test.com' });
  });

  it('/api/sesion rechaza sin token', async () => {
    assert.equal((await fetch(`${base}/api/sesion`)).status, 401);
  });

  it('/api/sesion rechaza un valor arbitrario (lo que antes bastaba en localStorage)', async () => {
    const r = await fetch(`${base}/api/sesion`, { headers: { Authorization: 'Bearer cualquier-cosa' } });
    assert.equal(r.status, 401);
  });

  it('/api/sesion rechaza un token firmado con el secreto antiguo del codigo', async () => {
    const falso = jwt.sign({ id: 1 }, 'secreto_livemetrics_123');
    const r = await fetch(`${base}/api/sesion`, { headers: { Authorization: `Bearer ${falso}` } });
    assert.equal(r.status, 401);
  });

  it('/api/sesion rechaza un token expirado', async () => {
    const vencido = jwt.sign({ id: 1 }, SECRETO, { expiresIn: -10 });
    const r = await fetch(`${base}/api/sesion`, { headers: { Authorization: `Bearer ${vencido}` } });
    assert.equal(r.status, 401);
  });

  it('/api/sesion rechaza un token de un usuario que ya no existe', async () => {
    const huerfano = jwt.sign({ id: 999 }, SECRETO);
    const r = await fetch(`${base}/api/sesion`, { headers: { Authorization: `Bearer ${huerfano}` } });
    assert.equal(r.status, 401);
  });
});

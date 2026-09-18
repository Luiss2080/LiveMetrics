import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Crea la app Express con la API de autenticacion. Recibe `db` (modelos Sequelize)
// y `config` (ver config.js) para poder probarla sin base de datos ni secretos reales.
export function crearApp({ db, config }) {
  const app = express();

  app.use(
    cors({
      origin(origen, callback) {
        // Sin cabecera Origin (curl, mismo origen, proxy de Vite) se permite;
        // con Origin solo los configurados.
        if (!origen || config.corsOrigins.includes(origen)) return callback(null, true);
        return callback(null, false);
      },
    }),
  );
  app.use(express.json()); // Necesario para leer req.body

  // Registro de usuario
  app.post('/api/register', async (req, res) => {
    try {
      const { nombre, email, password } = req.body;

      const usuarioExistente = await db.Usuario.findOne({ where: { email } });
      if (usuarioExistente) {
        return res.status(400).json({ error: 'El email ya está registrado' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      await db.Usuario.create({ nombre, email, password: hashedPassword });

      res.status(201).json({ mensaje: 'Usuario creado exitosamente' });
    } catch (error) {
      console.error('Error en registro:', error);
      res.status(500).json({ error: 'Error del servidor' });
    }
  });

  // Inicio de sesión
  app.post('/api/login', async (req, res) => {
    try {
      const { email, password } = req.body;

      const usuario = await db.Usuario.findOne({ where: { email } });
      if (!usuario) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      const passwordValido = await bcrypt.compare(password, usuario.password);
      if (!passwordValido) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      const token = jwt.sign({ id: usuario.id, nombre: usuario.nombre }, config.jwtSecret, {
        expiresIn: '1d',
      });

      res.json({ token, usuario: { nombre: usuario.nombre, email: usuario.email } });
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ error: 'Error del servidor' });
    }
  });

  // Valida el token del cliente (firma, expiración y que el usuario siga existiendo).
  app.get('/api/sesion', async (req, res) => {
    try {
      const [esquema, token] = (req.headers.authorization || '').split(' ');
      if (esquema !== 'Bearer' || !token) {
        return res.status(401).json({ error: 'Sesión requerida' });
      }

      let payload;
      try {
        payload = jwt.verify(token, config.jwtSecret);
      } catch {
        return res.status(401).json({ error: 'Token inválido o expirado' });
      }

      const usuario = await db.Usuario.findByPk(payload.id);
      if (!usuario) {
        return res.status(401).json({ error: 'Usuario no encontrado' });
      }

      res.json({ usuario: { nombre: usuario.nombre, email: usuario.email } });
    } catch (error) {
      console.error('Error validando sesión:', error);
      res.status(500).json({ error: 'Error del servidor' });
    }
  });

  return app;
}

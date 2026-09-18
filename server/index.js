import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createRequire } from 'module';
import { crearGeneradorMetricas } from './metricas.js';

const require = createRequire(import.meta.url);
const db = require('./models/index.cjs'); // Importar Sequelize models usando require

const app = express();
app.use(cors());
app.use(express.json()); // Necesario para leer req.body

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const generarMetricas = crearGeneradorMetricas();

io.on('connection', (socket) => {
  console.log('🟢 Cliente conectado:', socket.id);

  socket.on('disconnect', () => {
    console.log('🔴 Cliente desconectado:', socket.id);
  });
});

// --- API DE AUTENTICACIÓN ---

// Registro de usuario
app.post('/api/register', async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    
    // Verificar si existe
    const usuarioExistente = await db.Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const nuevoUsuario = await db.Usuario.create({
      nombre,
      email,
      password: hashedPassword
    });

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

    const token = jwt.sign({ id: usuario.id, nombre: usuario.nombre }, 'secreto_livemetrics_123', {
      expiresIn: '1d'
    });

    res.json({ token, usuario: { nombre: usuario.nombre, email: usuario.email } });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// --- FIN API DE AUTENTICACIÓN ---

// Emitir métricas cada segundo
setInterval(() => {
  io.emit('metricas:actualizacion', generarMetricas());
}, 1000);

const PUERTO = process.env.PORT || 3001;
httpServer.listen(PUERTO, () => {
  console.log(`🚀 Servidor Socket.io corriendo en el puerto ${PUERTO}`);
});

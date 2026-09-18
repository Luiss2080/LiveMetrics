import { createServer } from 'http';
import { Server } from 'socket.io';
import { createRequire } from 'module';
import { crearGeneradorMetricas } from './metricas.js';
import { crearApp } from './app.js';
import { cargarConfig } from './config.js';

const require = createRequire(import.meta.url);
const db = require('./models/index.cjs'); // Importar Sequelize models usando require

const config = cargarConfig();
const app = crearApp({ db, config });

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: config.corsOrigins,
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

// Emitir métricas cada segundo
setInterval(() => {
  io.emit('metricas:actualizacion', generarMetricas());
}, 1000);

const PUERTO = process.env.PORT || 3001;
httpServer.listen(PUERTO, () => {
  console.log(`🚀 Servidor Socket.io corriendo en el puerto ${PUERTO}`);
});

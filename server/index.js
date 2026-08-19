import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Valores iniciales simulados
let cpuUsage = 30;
let memoryUsage = 40;
let requestsPerSecond = 100;
let activeUsers = 50;
let diskUsage = 65; // Porcentaje de disco
let networkLatency = 20; // ms

// Función para generar una fluctuación aleatoria más natural
const generarFluctuacion = (valorActual, min, max, variacion) => {
  // Posibilidad de un pico repentino (10% de probabilidad)
  if (Math.random() < 0.1) {
    return Math.min(max, valorActual + variacion * 3);
  }
  const cambio = (Math.random() * variacion * 2) - variacion;
  let nuevoValor = valorActual + cambio;
  
  if (nuevoValor < min) nuevoValor = min;
  if (nuevoValor > max) nuevoValor = max;
  
  return Number(nuevoValor.toFixed(1));
};

io.on('connection', (socket) => {
  console.log('🟢 Cliente conectado:', socket.id);

  socket.on('disconnect', () => {
    console.log('🔴 Cliente desconectado:', socket.id);
  });
});

// Emitir métricas cada segundo
setInterval(() => {
  // Generar nuevas métricas
  cpuUsage = generarFluctuacion(cpuUsage, 5, 100, 15);
  memoryUsage = generarFluctuacion(memoryUsage, 20, 95, 5);
  requestsPerSecond = generarFluctuacion(requestsPerSecond, 50, 1000, 50);
  activeUsers = generarFluctuacion(activeUsers, 10, 500, 10);
  diskUsage = generarFluctuacion(diskUsage, 60, 95, 1); // El disco varía muy poco
  networkLatency = generarFluctuacion(networkLatency, 10, 500, 20); // Latencia puede tener picos

  const metricas = {
    tiempo: new Date().toISOString(),
    cpu: cpuUsage,
    memoria: memoryUsage,
    peticiones: requestsPerSecond,
    usuarios: Math.floor(activeUsers),
    disco: diskUsage,
    red: Math.floor(networkLatency)
  };

  io.emit('metricas:actualizacion', metricas);
}, 1000);

const PUERTO = process.env.PORT || 3001;
httpServer.listen(PUERTO, () => {
  console.log(`🚀 Servidor Socket.io corriendo en el puerto ${PUERTO}`);
});

import { io } from 'socket.io-client';

// Usamos el puerto 3001 como definimos en el backend
const URL_SERVIDOR = 'http://localhost:3001';

// Opciones de conexión
const opciones = {
  reconnectionDelayMax: 10000,
  transports: ['websocket', 'polling']
};

export const socket = io(URL_SERVIDOR, opciones);

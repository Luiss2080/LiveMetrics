import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

// Función para generar métricas aleatorias
function generateMetrics() {
  return {
    timestamp: new Date().toISOString(),
    cpu: Math.floor(Math.random() * 100),
    memory: Math.floor(Math.random() * 100),
    requests: Math.floor(Math.random() * 1000),
    activeUsers: Math.floor(Math.random() * 500)
  }
}

io.on('connection', (socket) => {
  console.log('✅ Cliente conectado:', socket.id)

  // Enviar métricas cada segundo
  const interval = setInterval(() => {
    const metrics = generateMetrics()
    socket.emit('metrics', metrics)
  }, 1000)

  socket.on('disconnect', () => {
    console.log('❌ Cliente desconectado:', socket.id)
    clearInterval(interval)
  })
})

const PORT = 3001
httpServer.listen(PORT, () => {
  console.log(`🚀 Servidor Socket.io corriendo en http://localhost:${PORT}`)
})

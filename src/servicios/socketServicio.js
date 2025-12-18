import { io } from 'socket.io-client'

/**
 * Servicio centralizado para manejar la conexión Socket.io
 */
class SocketServicio {
  constructor() {
    this.socket = null
    this.url = 'http://localhost:3001'
  }

  /**
   * Inicializar la conexión
   */
  inicializar() {
    if (!this.socket) {
      this.socket = io(this.url)
    }
    return this.socket
  }

  /**
   * Obtener la instancia del socket
   */
  obtenerSocket() {
    return this.socket || this.inicializar()
  }

  /**
   * Escuchar evento de conexión
   */
  alConectar(callback) {
    this.obtenerSocket().on('connect', callback)
  }

  /**
   * Escuchar evento de desconexión
   */
  alDesconectar(callback) {
    this.obtenerSocket().on('disconnect', callback)
  }

  /**
   * Escuchar métricas en tiempo real
   */
  escucharMetricas(callback) {
    this.obtenerSocket().on('metrics', callback)
  }

  /**
   * Detener escucha de un evento
   */
  dejarDeEscuchar(evento) {
    this.obtenerSocket().off(evento)
  }

  /**
   * Desconectar el socket
   */
  desconectar() {
    if (this.socket) {
      this.socket.disconnect()
    }
  }
}

export default new SocketServicio()

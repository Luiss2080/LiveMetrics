import { useState, useEffect } from 'react'
import socketServicio from '../servicios/socketServicio'

/**
 * Hook personalizado para manejar el estado de conexión
 */
export function useConexion() {
  const [conectado, setConectado] = useState(false)

  useEffect(() => {
    // Inicializar socket
    socketServicio.inicializar()

    // Escuchar conexión
    socketServicio.alConectar(() => {
      console.log('✅ Conectado al servidor')
      setConectado(true)
    })

    // Escuchar desconexión
    socketServicio.alDesconectar(() => {
      console.log('❌ Desconectado del servidor')
      setConectado(false)
    })

    // Limpiar al desmontar
    return () => {
      socketServicio.dejarDeEscuchar('connect')
      socketServicio.dejarDeEscuchar('disconnect')
    }
  }, [])

  return { conectado }
}

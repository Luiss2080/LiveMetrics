import { useState, useEffect } from 'react'
import socketServicio from '../servicios/socketServicio'

/**
 * Hook personalizado para manejar métricas en tiempo real
 */
export function useMetricas() {
  const [metricas, setMetricas] = useState([])
  const [estadisticasActuales, setEstadisticasActuales] = useState({
    cpu: 0,
    memoria: 0,
    peticiones: 0,
    usuariosActivos: 0
  })

  useEffect(() => {
    // Escuchar métricas del servidor
    socketServicio.escucharMetricas((datos) => {
      // Actualizar historial de métricas
      setMetricas(anterior => {
        const nuevasMetricas = [...anterior, datos]
        // Mantener solo los últimos 20 puntos
        return nuevasMetricas.slice(-20)
      })
      
      // Actualizar estadísticas actuales
      setEstadisticasActuales({
        cpu: datos.cpu,
        memoria: datos.memory,
        peticiones: datos.requests,
        usuariosActivos: datos.activeUsers
      })
    })

    // Limpiar al desmontar
    return () => {
      socketServicio.dejarDeEscuchar('metrics')
    }
  }, [])

  return { metricas, estadisticasActuales }
}

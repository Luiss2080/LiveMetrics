import React from 'react'
import TarjetaEstadistica from './TarjetaEstadistica'
import './GrupoTarjetas.css'

function GrupoTarjetas({ estadisticas }) {
  const obtenerTipoSegunValor = (valor) => {
    if (valor < 30) return 'normal'
    if (valor < 70) return 'advertencia'
    return 'alerta'
  }

  return (
    <div className="grupo-tarjetas">
      <TarjetaEstadistica
        icono="💻"
        etiqueta="CPU Usage"
        valor={estadisticas.cpu}
        unidad="%"
        tipo={obtenerTipoSegunValor(estadisticas.cpu)}
      />
      <TarjetaEstadistica
        icono="🧠"
        etiqueta="Memoria"
        valor={estadisticas.memoria}
        unidad="%"
        tipo={obtenerTipoSegunValor(estadisticas.memoria)}
      />
      <TarjetaEstadistica
        icono="📡"
        etiqueta="Requests/s"
        valor={estadisticas.peticiones}
        tipo="normal"
      />
      <TarjetaEstadistica
        icono="👥"
        etiqueta="Usuarios Activos"
        valor={estadisticas.usuariosActivos}
        tipo="normal"
      />
    </div>
  )
}

export default GrupoTarjetas

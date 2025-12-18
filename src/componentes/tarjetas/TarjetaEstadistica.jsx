import React from 'react'
import './TarjetaEstadistica.css'

function TarjetaEstadistica({ icono, etiqueta, valor, unidad = '', tipo = 'normal' }) {
  return (
    <div className={`tarjeta-estadistica tarjeta-estadistica--${tipo}`}>
      {icono && <div className="tarjeta-estadistica__icono">{icono}</div>}
      <div className="tarjeta-estadistica__etiqueta">{etiqueta}</div>
      <div className="tarjeta-estadistica__valor">
        {valor}{unidad}
      </div>
    </div>
  )
}

export default TarjetaEstadistica

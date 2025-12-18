import React from 'react'
import './IndicadorConexion.css'

function IndicadorConexion({ conectado }) {
  return (
    <div className="indicador-conexion">
      <span 
        className={`indicador-conexion__punto ${
          conectado ? '' : 'indicador-conexion__punto--desconectado'
        }`}
      ></span>
      <span className="indicador-conexion__texto">
        {conectado ? 'Conectado' : 'Desconectado'}
      </span>
    </div>
  )
}

export default IndicadorConexion

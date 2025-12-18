import React from 'react'
import './Encabezado.css'

function Encabezado() {
  return (
    <header className="encabezado">
      <h1 className="encabezado__titulo">
        <span>📊</span>
        <span>LiveMetrics</span>
      </h1>
      <p className="encabezado__subtitulo">
        Visualización dinámica de métricas en tiempo real
      </p>
    </header>
  )
}

export default Encabezado

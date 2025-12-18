import React from 'react'
import './ContenedorPrincipal.css'

function ContenedorPrincipal({ children }) {
  return (
    <div className="contenedor-principal">
      {children}
    </div>
  )
}

export default ContenedorPrincipal

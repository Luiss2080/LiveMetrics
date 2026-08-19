import React from 'react';
import './ContenedorPrincipal.css';

const ContenedorPrincipal = ({ children }) => {
  return (
    <div className="contenedor-principal">
      <div className="decoracion-fondo circulo-1"></div>
      <div className="decoracion-fondo circulo-2"></div>
      
      <div className="contenido-principal">
        {children}
      </div>
    </div>
  );
};

export default ContenedorPrincipal;

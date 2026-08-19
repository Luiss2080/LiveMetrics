import React from 'react';
import './PantallaCarga.css';

const PantallaCarga = () => {
  return (
    <div className="pantalla-carga">
      <div className="spinner-contenedor panel-cristal">
        <div className="spinner"></div>
        <h2 className="texto-gradiente">Iniciando LiveMetrics</h2>
        <p className="texto-secundario">Conectando a los sistemas de telemetría...</p>
      </div>
    </div>
  );
};

export default PantallaCarga;

import React from 'react';
import './Encabezado.css';
import IndicadorConexion from '../estado/IndicadorConexion';

const Encabezado = () => {
  return (
    <header className="encabezado panel-cristal flex-entre">
      <div className="logo-contenedor">
        <h1 className="titulo texto-gradiente">LiveMetrics</h1>
        <p className="subtitulo">Panel de Control en Tiempo Real</p>
      </div>
      
      <div className="acciones-encabezado">
        <IndicadorConexion />
      </div>
    </header>
  );
};

export default Encabezado;

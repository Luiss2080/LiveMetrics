import React from 'react';
import './TarjetaEstadistica.css';

const TarjetaEstadistica = ({ titulo, valor, icono, colorEstado }) => {
  return (
    <div className="tarjeta-estadistica panel-cristal">
      <div className="tarjeta-encabezado">
        <h3 className="tarjeta-titulo">{titulo}</h3>
        <span className="tarjeta-icono" style={{ color: colorEstado }}>
          {icono}
        </span>
      </div>
      
      <div className="tarjeta-cuerpo">
        <div className="tarjeta-valor" style={{ color: colorEstado }}>
          {valor}
        </div>
      </div>
    </div>
  );
};

export default TarjetaEstadistica;

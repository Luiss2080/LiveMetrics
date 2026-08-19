import React from 'react';
import { useConexion } from '../../hooks/useConexion';
import './IndicadorConexion.css';

const IndicadorConexion = () => {
  const estaConectado = useConexion();

  return (
    <div className={`indicador-conexion ${estaConectado ? 'conectado' : 'desconectado'}`}>
      <span className="pulso"></span>
      <span className="texto-estado">
        {estaConectado ? 'Conectado (En vivo)' : 'Desconectado'}
      </span>
    </div>
  );
};

export default IndicadorConexion;

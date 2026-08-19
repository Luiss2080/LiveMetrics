import React from 'react';
import TarjetaEstadistica from './TarjetaEstadistica';
import { 
  formatearPorcentaje, 
  formatearNumeroGrande, 
  obtenerColorEstado 
} from '../../utilidades/formateadores';
import './GrupoTarjetas.css';

const GrupoTarjetas = ({ metricas }) => {
  if (!metricas) return <div className="cargando">Esperando datos...</div>;

  return (
    <div className="grupo-tarjetas">
      <TarjetaEstadistica 
        titulo="Uso CPU" 
        valor={formatearPorcentaje(metricas.cpu)}
        icono="💻"
        colorEstado={obtenerColorEstado(metricas.cpu)}
      />
      <TarjetaEstadistica 
        titulo="Memoria RAM" 
        valor={formatearPorcentaje(metricas.memoria)}
        icono="🧠"
        colorEstado={obtenerColorEstado(metricas.memoria)}
      />
      <TarjetaEstadistica 
        titulo="Peticiones / Seg" 
        valor={formatearNumeroGrande(metricas.peticiones)}
        icono="📡"
        colorEstado="var(--acento-primario)"
      />
      <TarjetaEstadistica 
        titulo="Usuarios Activos" 
        valor={formatearNumeroGrande(metricas.usuarios)}
        icono="👥"
        colorEstado="var(--acento-secundario)"
      />
    </div>
  );
};

export default GrupoTarjetas;

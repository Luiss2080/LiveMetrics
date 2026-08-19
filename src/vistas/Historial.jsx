import React from 'react';
import ContenedorPrincipal from '../componentes/layout/ContenedorPrincipal';
import Encabezado from '../componentes/encabezado/Encabezado';
import { useMetricas } from '../hooks/useMetricas';
import { formatearHora, formatearPorcentaje, formatearNumeroGrande } from '../utilidades/formateadores';
import './Historial.css';

const Historial = () => {
  const { historialMetricas } = useMetricas(50); // Mostrar más historial aquí

  return (
    <ContenedorPrincipal>
      <Encabezado />
      <main className="panel-contenido">
        <div className="historial-panel panel-cristal">
          <h2 className="historial-titulo">Historial de Eventos</h2>
          
          <div className="tabla-contenedor">
            <table className="tabla-historial">
              <thead>
                <tr>
                  <th>Hora</th>
                  <th>CPU</th>
                  <th>RAM</th>
                  <th>Peticiones/s</th>
                  <th>Usuarios</th>
                </tr>
              </thead>
              <tbody>
                {historialMetricas.slice().reverse().map((metrica, idx) => (
                  <tr key={idx}>
                    <td>{formatearHora(metrica.tiempo)}</td>
                    <td>{formatearPorcentaje(metrica.cpu)}</td>
                    <td>{formatearPorcentaje(metrica.memoria)}</td>
                    <td>{formatearNumeroGrande(metrica.peticiones)}</td>
                    <td>{metrica.usuarios}</td>
                  </tr>
                ))}
                {historialMetricas.length === 0 && (
                  <tr>
                    <td colSpan="5" className="texto-centro">Esperando datos...</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </ContenedorPrincipal>
  );
};

export default Historial;

import React from 'react';
import ContenedorPrincipal from '../componentes/layout/ContenedorPrincipal';
import Encabezado from '../componentes/encabezado/Encabezado';
import { useMetricas } from '../hooks/useMetricas';
import { formatearHora, formatearPorcentaje, formatearNumeroGrande } from '../utilidades/formateadores';
import { Download } from 'lucide-react';
import './Historial.css';

const Historial = () => {
  const { historialMetricas } = useMetricas(50);
  const [filtroAlerta, setFiltroAlerta] = React.useState(false);

  const datosFiltrados = React.useMemo(() => {
    if (!filtroAlerta) return historialMetricas.slice().reverse();
    return historialMetricas.filter(m => m.cpu >= 80 || m.memoria >= 80).slice().reverse();
  }, [historialMetricas, filtroAlerta]);

  const descargarCSV = () => {
    if (datosFiltrados.length === 0) return;
    
    const cabeceras = "Tiempo,CPU,RAM,Peticiones,Usuarios,Disco,Red\n";
    const filas = datosFiltrados.map(m => 
      `${m.tiempo},${m.cpu},${m.memoria},${m.peticiones},${m.usuarios},${m.disco},${m.red}`
    ).join("\n");
    
    const blob = new Blob([cabeceras + filas], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `historial_metricas_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <ContenedorPrincipal>
      <Encabezado />
      <main className="panel-contenido">
        <div className="historial-panel panel-cristal">
          <div className="historial-encabezado-acciones flex-entre">
            <h2 className="historial-titulo">Historial de Eventos</h2>
            
            <div className="acciones-filtros">
              <label className="switch-contenedor" style={{ fontSize: '0.8rem' }}>
                <span className="etiqueta">Solo Alertas ({">"}80%)</span>
                <input 
                  type="checkbox" 
                  checked={filtroAlerta} 
                  onChange={(e) => setFiltroAlerta(e.target.checked)} 
                />
                <span className="switch-deslizador" style={{ width: '40px', height: '20px' }}></span>
              </label>
              
              <button onClick={descargarCSV} className="boton-primario boton-icono">
                <Download size={18} /> Exportar CSV
              </button>
            </div>
          </div>
          
          <div className="tabla-contenedor">
            <table className="tabla-historial">
              <thead>
                <tr>
                  <th>Hora</th>
                  <th>CPU</th>
                  <th>RAM</th>
                  <th>Peticiones/s</th>
                  <th>Usuarios</th>
                  <th>Disco</th>
                  <th>Red (ms)</th>
                </tr>
              </thead>
              <tbody>
                {datosFiltrados.map((metrica, idx) => (
                  <tr key={idx} className={(metrica.cpu >= 80 || metrica.memoria >= 80) ? 'fila-alerta' : ''}>
                    <td>{formatearHora(metrica.tiempo)}</td>
                    <td>{formatearPorcentaje(metrica.cpu)}</td>
                    <td>{formatearPorcentaje(metrica.memoria)}</td>
                    <td>{formatearNumeroGrande(metrica.peticiones)}</td>
                    <td>{metrica.usuarios}</td>
                    <td>{formatearPorcentaje(metrica.disco)}</td>
                    <td>{metrica.red} ms</td>
                  </tr>
                ))}
                {datosFiltrados.length === 0 && (
                  <tr>
                    <td colSpan="7" className="texto-centro">
                      {historialMetricas.length === 0 ? 'Esperando datos...' : 'No hay alertas críticas en el historial reciente.'}
                    </td>
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

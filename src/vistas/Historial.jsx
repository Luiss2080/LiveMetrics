import React from 'react';
import ContenedorPrincipal from '../componentes/layout/ContenedorPrincipal';
import Encabezado from '../componentes/encabezado/Encabezado';
import { useMetricas } from '../hooks/useMetricas';
import { formatearHora, formatearPorcentaje, formatearNumeroGrande } from '../utilidades/formateadores';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';

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
      <motion.main 
        className="flex flex-col flex-1"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.4 }}
      >
        <div className="bg-white rounded-2xl shadow-sm border border-black/5 flex flex-col p-6 h-full mb-8">
          <div className="flex flex-wrap justify-between items-center mb-6 pb-4 border-b border-black/5 gap-4">
            <h2 className="text-xl font-bold text-text-main m-0">Historial de Eventos</h2>
            
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer font-medium text-sm text-text-muted">
                <input 
                  type="checkbox" 
                  checked={soloCritico}
                  onChange={() => setSoloCritico(!soloCritico)}
                  className="w-4 h-4 rounded border-gray-300 text-accent-primary focus:ring-accent-primary"
                />
                Solo Eventos Críticos (&gt;80%)
              </label>
              
              <button 
                onClick={exportarCSV}
                className="flex items-center gap-2 px-4 py-2 bg-text-main text-white rounded-lg font-semibold text-sm transition-all duration-200 hover:bg-black"
              >
                <Download size={16} /> Exportar CSV
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto flex-1 rounded-xl border border-black/5">
            <table className="w-full border-collapse text-left text-sm text-text-main">
              <thead className="bg-slate-50 border-b border-black/5">
                <tr>
                  <th className="p-4 font-semibold text-text-muted">Hora</th>
                  <th className="p-4 font-semibold text-text-muted">CPU</th>
                  <th className="p-4 font-semibold text-text-muted">Memoria</th>
                  <th className="p-4 font-semibold text-text-muted">Disco</th>
                  <th className="p-4 font-semibold text-text-muted">Latencia</th>
                </tr>
              </thead>
              <tbody>
                {datosFiltrados.length > 0 ? (
                  datosFiltrados.map((fila) => (
                    <tr key={fila.id} className="border-b border-black/5 transition-colors hover:bg-slate-50/50">
                      <td className="p-4 font-medium">{formatearHora(fila.timestamp)}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-md font-semibold text-xs ${fila.cpu > 80 ? 'bg-red-100 text-red-700' : 'text-text-main'}`}>
                          {formatearPorcentaje(fila.cpu)}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-md font-semibold text-xs ${fila.ram > 80 ? 'bg-red-100 text-red-700' : 'text-text-main'}`}>
                          {formatearPorcentaje(fila.ram)}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-md font-semibold text-xs ${fila.disco > 80 ? 'bg-orange-100 text-orange-700' : 'text-text-main'}`}>
                          {formatearPorcentaje(fila.disco)}
                        </span>
                      </td>
                      <td className="p-4">
                        {fila.latencia} ms
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-text-muted italic">
                      No hay registros {soloCritico ? 'críticos' : ''} disponibles.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.main>
    </ContenedorPrincipal>
  );
};

export default Historial;

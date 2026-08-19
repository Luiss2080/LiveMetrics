import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { opcionesGraficoLineas } from '../../configuracion/graficosConfig';
import { formatearHora } from '../../utilidades/formateadores';

const GraficoLineas = ({ historial }) => {
  const datos = useMemo(() => {
    return {
      labels: historial.map(d => formatearHora(d.tiempo)),
      datasets: [
        {
          label: 'Uso de CPU (%)',
          data: historial.map(d => d.cpu),
          borderColor: '#3b82f6', // acento primario
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 4,
          fill: true,
          tension: 0.4
        },
        {
          label: 'Uso de Memoria (%)',
          data: historial.map(d => d.memoria),
          borderColor: '#8b5cf6', // acento secundario
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 4,
          fill: true,
          tension: 0.4
        }
      ]
    };
  }, [historial]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-black/5 p-6 flex flex-col h-full lg:col-span-2">
      <h3 className="text-lg font-bold text-text-main mb-4">Rendimiento del Sistema</h3>
      <div className="relative w-full h-[250px] flex-1">
        {historial.length > 0 ? (
          <Line options={opcionesGraficoLineas} data={datos} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-text-muted">Cargando gráfico...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GraficoLineas;

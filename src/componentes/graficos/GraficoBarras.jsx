import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { opcionesGraficoBarras } from '../../configuracion/graficosConfig';
import { formatearHora } from '../../utilidades/formateadores';

const GraficoBarras = ({ historial }) => {
  const datos = useMemo(() => {
    return {
      labels: historial.map(d => formatearHora(d.tiempo)),
      datasets: [
        {
          label: 'Peticiones/s',
          data: historial.map(d => d.peticiones),
          backgroundColor: '#10b981', // acento secundario (verde)
          borderRadius: 4,
          barPercentage: 0.7,
        }
      ]
    };
  }, [historial]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-black/5 p-6 flex flex-col h-full">
      <h3 className="text-lg font-bold text-text-main mb-4">Tráfico (Peticiones/s)</h3>
      <div className="relative w-full h-[250px] flex-1">
        {historial.length > 0 ? (
          <Bar options={opcionesGraficoBarras} data={datos} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-text-muted">Cargando gráfico...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GraficoBarras;

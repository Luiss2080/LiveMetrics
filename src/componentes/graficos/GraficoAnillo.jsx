import React, { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { opcionesGraficoAnillo } from '../../configuracion/graficosConfig';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const GraficoAnillo = ({ disco }) => {
  const datos = useMemo(() => {
    return {
      labels: ['Usado', 'Libre'],
      datasets: [
        {
          data: [disco, 100 - disco],
          backgroundColor: [
            'rgba(239, 68, 68, 0.8)', // Rojo para usado
            'rgba(16, 185, 129, 0.8)'  // Verde para libre
          ],
          borderColor: [
            'rgba(239, 68, 68, 1)',
            'rgba(16, 185, 129, 1)'
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [disco]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-black/5 p-6 flex flex-col items-center h-full">
      <h3 className="text-lg font-bold text-text-main mb-4 self-start">Almacenamiento (Disco)</h3>
      <div className="relative w-[200px] h-[200px] flex items-center justify-center my-auto">
        <Doughnut data={datos} options={opcionesGraficoAnillo} />
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-bold text-text-main">{disco}%</span>
          <span className="text-xs text-text-muted">Usado</span>
        </div>
      </div>
    </div>
  );
};

export default GraficoAnillo;

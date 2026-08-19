import React, { useMemo } from 'react';
import { Doughnut } from 'react-chartjs-2';
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

  const opciones = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#cbd5e1'
        }
      }
    }
  };

  return (
    <div className="grafico-barras panel-cristal" style={{ minWidth: '250px' }}>
      <h3 className="grafico-titulo">Almacenamiento</h3>
      <div className="d3-contenedor" style={{ height: '200px' }}>
        <Doughnut data={datos} options={opciones} />
      </div>
      <div style={{ textAlign: 'center', marginTop: '1rem', fontWeight: 'bold' }}>
        {disco}% Usado
      </div>
    </div>
  );
};

export default GraficoAnillo;

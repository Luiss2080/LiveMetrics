import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { opcionesGraficoLineas, coloresGraficos } from '../../configuracion/graficosConfig'
import './GraficoLineas.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

function GraficoLineas({ datos }) {
  const datosGrafico = {
    labels: datos.map((_, indice) => `${indice + 1}`),
    datasets: [
      {
        label: 'CPU %',
        data: datos.map(d => d.cpu),
        borderColor: coloresGraficos.cpu.borde,
        backgroundColor: coloresGraficos.cpu.fondo,
        fill: true,
        tension: 0.4
      },
      {
        label: 'Memoria %',
        data: datos.map(d => d.memory),
        borderColor: coloresGraficos.memoria.borde,
        backgroundColor: coloresGraficos.memoria.fondo,
        fill: true,
        tension: 0.4
      },
      {
        label: 'Requests',
        data: datos.map(d => d.requests),
        borderColor: coloresGraficos.peticiones.borde,
        backgroundColor: coloresGraficos.peticiones.fondo,
        fill: true,
        tension: 0.4
      }
    ]
  }

  return (
    <div className="contenedor-grafico">
      <h2 className="contenedor-grafico__titulo">
        📈 Métricas del Sistema
      </h2>
      <div className="contenedor-grafico__canvas">
        <Line data={datosGrafico} options={opcionesGraficoLineas} />
      </div>
    </div>
  )
}

export default GraficoLineas

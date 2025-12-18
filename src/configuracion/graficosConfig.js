/**
 * Configuración para gráficos de Chart.js
 */

export const opcionesGraficoLineas = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: '#ffffff',
        font: {
          size: 12,
          family: "'Segoe UI', sans-serif"
        }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      padding: 12,
      titleFont: {
        size: 14
      },
      bodyFont: {
        size: 13
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
      ticks: {
        color: '#ffffff',
        font: {
          size: 11
        }
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
        lineWidth: 1
      }
    },
    x: {
      ticks: {
        color: '#ffffff',
        font: {
          size: 11
        }
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)',
        lineWidth: 1
      }
    }
  },
  interaction: {
    intersect: false,
    mode: 'index'
  }
}

export const coloresGraficos = {
  cpu: {
    borde: 'rgb(255, 99, 132)',
    fondo: 'rgba(255, 99, 132, 0.2)'
  },
  memoria: {
    borde: 'rgb(53, 162, 235)',
    fondo: 'rgba(53, 162, 235, 0.2)'
  },
  peticiones: {
    borde: 'rgb(75, 192, 192)',
    fondo: 'rgba(75, 192, 192, 0.2)'
  }
}

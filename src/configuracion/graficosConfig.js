import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const textColor = '#64748b'; // Tailwind slate-500
const gridColor = 'rgba(0, 0, 0, 0.05)';
const tooltipBg = 'rgba(15, 23, 42, 0.9)';

export const opcionesGraficoLineas = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 300,
    easing: 'linear'
  },
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      mode: 'index',
      intersect: false,
      backgroundColor: tooltipBg,
      titleColor: '#f8fafc',
      bodyColor: '#cbd5e1',
      borderColor: 'rgba(255,255,255,0.1)',
      borderWidth: 1
    }
  },
  scales: {
    x: {
      grid: {
        color: gridColor,
        drawBorder: false
      },
      ticks: {
        color: textColor,
        maxRotation: 0,
        autoSkip: true,
        maxTicksLimit: 7
      }
    },
    y: {
      min: 0,
      max: 100,
      grid: {
        color: gridColor,
        drawBorder: false
      },
      ticks: {
        color: textColor
      }
    }
  },
  interaction: {
    mode: 'nearest',
    axis: 'x',
    intersect: false
  }
};

export const opcionesGraficoBarras = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 300,
    easing: 'linear'
  },
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      backgroundColor: tooltipBg,
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      },
      ticks: {
        color: textColor,
        maxRotation: 0,
        autoSkip: true,
        maxTicksLimit: 7
      }
    },
    y: {
      beginAtZero: true,
      grid: {
        color: gridColor,
        drawBorder: false
      },
      ticks: {
        color: textColor
      }
    }
  }
};

export const opcionesGraficoAnillo = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '75%',
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      backgroundColor: tooltipBg,
    }
  }
};

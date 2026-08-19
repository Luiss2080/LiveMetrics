import { useState, useEffect, useRef } from 'react';
import { socket } from '../servicios/socketServicio';
import toast from 'react-hot-toast';

export const useMetricas = (limiteHistorial = 20) => {
  const [historialMetricas, setHistorialMetricas] = useState([]);
  const [ultimaMetrica, setUltimaMetrica] = useState(null);
  const ultimoToast = useRef(0);

  useEffect(() => {
    const onActualizacionMetricas = (metrica) => {
      setUltimaMetrica(metrica);
      
      // Lógica de Alertas (Toasts) con un cooldown de 5 segundos
      if (metrica.cpu > 85 || metrica.memoria > 90) {
        const ahora = Date.now();
        if (ahora - ultimoToast.current > 5000) {
          toast.error(
            `¡Alerta Crítica!\nCPU: ${metrica.cpu}%\nRAM: ${metrica.memoria}%`, 
            { position: 'top-right' }
          );
          ultimoToast.current = ahora;
        }
      }

      setHistorialMetricas(previo => {
        const nuevoHistorial = [...previo, metrica];
        // Mantener solo los últimos N elementos para no desbordar memoria
        if (nuevoHistorial.length > limiteHistorial) {
          return nuevoHistorial.slice(nuevoHistorial.length - limiteHistorial);
        }
        return nuevoHistorial;
      });
    };

    socket.on('metricas:actualizacion', onActualizacionMetricas);

    return () => {
      socket.off('metricas:actualizacion', onActualizacionMetricas);
    };
  }, [limiteHistorial]);

  return { historialMetricas, ultimaMetrica };
};

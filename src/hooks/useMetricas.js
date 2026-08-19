import { useState, useEffect } from 'react';
import { socket } from '../servicios/socketServicio';

export const useMetricas = (limiteHistorial = 20) => {
  const [historialMetricas, setHistorialMetricas] = useState([]);
  const [ultimaMetrica, setUltimaMetrica] = useState(null);

  useEffect(() => {
    const onActualizacionMetricas = (metrica) => {
      setUltimaMetrica(metrica);
      
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

import React from 'react';
import ContenedorPrincipal from '../componentes/layout/ContenedorPrincipal';
import Encabezado from '../componentes/encabezado/Encabezado';
import GrupoTarjetas from '../componentes/tarjetas/GrupoTarjetas';
import GraficoLineas from '../componentes/graficos/GraficoLineas';
import GraficoBarras from '../componentes/graficos/GraficoBarras';
import GraficoAnillo from '../componentes/graficos/GraficoAnillo';
import { useMetricas } from '../hooks/useMetricas';
import { motion } from 'framer-motion';

const PanelPrincipal = () => {
  // Limitar a los últimos 15 datos para evitar sobrecarga en gráficos
  const { historialMetricas, ultimaMetrica } = useMetricas(15);

  return (
    <ContenedorPrincipal>
      <Encabezado />
      
      <motion.main 
        className="flex flex-col flex-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
      >
        <GrupoTarjetas metricas={ultimaMetrica} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">
          <GraficoLineas historial={historialMetricas} />
          <GraficoAnillo disco={ultimaMetrica?.disco || 0} />
          <GraficoBarras historial={historialMetricas} />
        </div>
      </motion.main>
    </ContenedorPrincipal>
  );
};

export default PanelPrincipal;

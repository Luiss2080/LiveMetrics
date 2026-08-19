import React from 'react';
import ContenedorPrincipal from '../componentes/layout/ContenedorPrincipal';
import Encabezado from '../componentes/encabezado/Encabezado';
import GrupoTarjetas from '../componentes/tarjetas/GrupoTarjetas';
import GraficoLineas from '../componentes/graficos/GraficoLineas';
import GraficoBarras from '../componentes/graficos/GraficoBarras';
import GraficoAnillo from '../componentes/graficos/GraficoAnillo';
import { useMetricas } from '../hooks/useMetricas';
import './PanelPrincipal.css';

const PanelPrincipal = () => {
  // Limitar a los últimos 15 datos para evitar sobrecarga en gráficos
  const { historialMetricas, ultimaMetrica } = useMetricas(15);

  return (
    <ContenedorPrincipal>
      <Encabezado />
      
      <main className="panel-contenido">
        <GrupoTarjetas metricas={ultimaMetrica} />
        
        <div className="graficos-contenedor">
          <GraficoLineas historial={historialMetricas} />
          <GraficoAnillo disco={ultimaMetrica?.disco || 0} />
          <GraficoBarras historial={historialMetricas} />
        </div>
      </main>
    </ContenedorPrincipal>
  );
};

export default PanelPrincipal;

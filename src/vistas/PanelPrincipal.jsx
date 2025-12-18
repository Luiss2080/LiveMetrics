import React from 'react'
import { useMetricas } from '../hooks/useMetricas'
import { useConexion } from '../hooks/useConexion'
import Encabezado from '../componentes/encabezado/Encabezado'
import IndicadorConexion from '../componentes/estado/IndicadorConexion'
import GrupoTarjetas from '../componentes/tarjetas/GrupoTarjetas'
import GraficoLineas from '../componentes/graficos/GraficoLineas'
import GraficoBarras from '../componentes/graficos/GraficoBarras'
import ContenedorPrincipal from '../componentes/layout/ContenedorPrincipal'

function PanelPrincipal() {
  const { metricas, estadisticasActuales } = useMetricas()
  const { conectado } = useConexion()

  return (
    <>
      <IndicadorConexion conectado={conectado} />
      
      <ContenedorPrincipal>
        <Encabezado />
        
        <GrupoTarjetas estadisticas={estadisticasActuales} />
        
        <GraficoLineas datos={metricas} />
        
        <GraficoBarras datos={metricas} />
      </ContenedorPrincipal>
    </>
  )
}

export default PanelPrincipal
